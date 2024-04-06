import React, { useEffect, useState } from 'react'
import { Card,TextField,CardHeader, Typography, CardContent, CardActionArea, Button, CardActions, Paper, LinearProgress, CircularProgress, useMediaQuery } from '@mui/material'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from '@emotion/react';

const SignUp = () => {
    const [username,updateUserName]=useState('');
    const [email,updateEmail]=useState('');
    const [password,updatePassword]=useState(null);
    const [CNFpassword,updateCNFPassword]=useState(null);
    const [loading,setLoading]=useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate=useNavigate();

    const handleGoogleSignIn= async()=>{
        try{
            const provider= new GoogleAuthProvider();
            await signInWithPopup(auth,provider);
            navigate('/');
        }catch(e){
            console.log(e);
        }
    }
  
  
  
    // const addListner=()=>{
    //   onAuthStateChanged(auth,user=>{
    //     if(user){
    //       setUser(user);
    //       navigate('./home');
          
          
    //     }
    //     else{
    //       setUser(null);
    //       navigate('/');
    //     }
  
    //   })
    // }
  
    // useEffect(() => {
      
    
    //   addListner();
    // }, [])

    const handelUserNameChange=(event)=>{
       
        updateUserName(event.target.value);
        
        

    }


    const handelEmailChange=(event)=>{
       
        updateEmail(event.target.value);
        
        

    }
    
    const handelCNFPasswordChange=(event)=>{
        updateCNFPassword(event.target.value);

    }
    const handelPasswordChange=(event)=>{
        updatePassword(event.target.value);

    }


   
    const handelSignUp= async ()=>{
        setLoading(true);
        try{
            if(password===CNFpassword){
                const user= await createUserWithEmailAndPassword(auth,email,password);
                if(user.providerData[0].providerId==='password'){
                    updateProfile(user,{
                        displayName:username

                    });

                }
                navigate('/');

            }
            throw new Error('Password and Conform Password Should be Same')
            
        }catch(e){
        
            toast(e.message);

        }finally{
            setLoading(false);
        }   
        
    }


  return (
    <div style={{
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }} >
        
        
        <Paper elevation={5}  className='signupandsigninDiv'  >
          
               
            
            <CardContent >
                <div className='title'>
                    Sign Up

                </div>
               
                <br />
                <TextField  size= {matches ? 'small':'medium'} fullWidth={true} onChange={handelUserNameChange} label={'UserName'} inputMode='text' value={username}/>
                <br />
                <br />
                <TextField size= {matches ? 'small':'medium'} fullWidth={true} onChange={handelEmailChange} label={'Email'} inputMode='email' value={email}/>
                <br />
                <br />
                <TextField size= {matches ? 'small':'medium'} fullWidth={true} onChange={handelPasswordChange} label={'Password'} type='password' value={password}  />
                <br />
                <br />
                <TextField size= {matches ? 'small':'medium'} fullWidth={true} onChange={handelCNFPasswordChange} label={'Conform Password'} type='password' value={CNFpassword} />

            </CardContent>
            <CardActions  >
                <Button size= {matches ? 'small':'medium'} variant='outlined' disabled={loading} >
                    Cancel
                </Button>
                <Button size= {matches ? 'small':'medium'} variant='contained' onClick={handelSignUp} disabled={loading} >
                {
                loading ?  <CircularProgress size={23} value={true} variant="indeterminate" sx={{
                    color:'black',
                    
                }}/> : 'Sign Up'
               }
                </Button>
            </CardActions>
            <CardActions  >
                <Button size= {matches ? 'small':'medium'}  onClick={handleGoogleSignIn} fullWidth={true} startIcon={<FcGoogle />} variant='outlined' disabled={loading} >
                    Google
                </Button>
                
            </CardActions>
            <CardActions>
            <Button size= {matches ? 'small':'medium'} variant='contained'  disabled={loading}  fullWidth={true} onClick={()=>navigate('/')} >
               Log In
            </Button>
            </CardActions>
         
            

        </Paper>
    </div>
  )
}

export default SignUp