import { Firestore,collection,deleteDoc,doc,getDoc,getDocs,setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";


export class Notes{
    static addNotes= async (uid,Note)=>{
        
       await setDoc(doc(db,'Users',uid,'Notes',Note.id),Note);
  
    }
    static updateNote= async (uid,Note)=>{
        await updateDoc(doc(db,'Users',uid,'Notes',Note.id),Note);
    }
    static deleteNote= async (id,uid)=>{
        await deleteDoc(doc(db,'Users',uid,'Notes',id));

    }
    static getNotes= async (uid,setNotes,setLoading)=>{
        const data=await getDocs(collection(db,'Users',uid,'Notes'));
        console.log(data);
        const Notes=[];
        console.log(data.size);
        for (const Note of data.docs) {
            
            Notes.push(Note.data());
            
        }
        console.log(Notes);
        setNotes(Notes);
        setLoading(false);
       
        

    }
}