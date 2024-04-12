import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../Firebase/firebase';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';

export class Remainders {
    static addRemainder = async (user, Remainder) => {
        axios.post('https://notes-and-remainders-app-backend.onrender.com/Schedule', new URLSearchParams({

            email: user.email,
            rem: JSON.stringify(Remainder),
        }));
        toast.success(`Remainder Scheduled At ${moment(Remainder.remainderDate).format('D-MMM-yy  hh:mm a')}`);



        await setDoc(doc(db, 'Users', user.uid, 'Remainders', Remainder.id), Remainder);


    }
    static updateRemainder = async (uid, Remainder) => {
        await updateDoc(doc(db, 'Users', uid, 'Remainders', Remainder.id), Remainder);
    }
    static deleteRemainder = async (id, user, isremainded) => {
        if (!isremainded) {
            const res = await axios.post('https://notes-and-remainders-app-backend.onrender.com/cancel', new URLSearchParams({
                id: id,
            }));
            if(res.data.canceled===true){
                toast('Scheduled Remainder Has Been Canceled',{
                    icon:'⚠️'
                });

            }
        
            console.log(res);
        }

        await deleteDoc(doc(db, 'Users', user.uid, 'Remainders', id));

    }
    static getRemainders = async (uid, setRemainder) => {
        const data = await getDocs(collection(db, 'Users', uid, 'Remainders'));
        console.log(data);
        const Remainders = [];
        console.log(data.size);
        for (const Remainder of data.docs) {

            Remainders.push(Remainder.data());

        }
        console.log(Remainders);
        setRemainder(Remainders);




    }
}