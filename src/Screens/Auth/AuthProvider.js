
import React, { useEffect, useState,Provider, useContext } from 'react'
import { AuthContext,NotesContext } from '../../Contexts/Contexts'
// import { Provider } from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const addListner = () => {
        onAuthStateChanged(auth, async user => {
            if (user) {
                setUser(user);
                
           
               

            }
            else {
                setUser(null);

            }
            setLoading(false);

        });
        
        
    }

    useEffect(  () => {


        addListner();
        
    }, [])



    return (

        <AuthContext.Provider value={user}>
            {
                loading ? '': children

            }
            


        </AuthContext.Provider>

    )
}

export default AuthProvider





