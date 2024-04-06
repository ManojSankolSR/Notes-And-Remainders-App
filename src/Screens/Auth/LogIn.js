import React, { useEffect, useState } from 'react'
import { Card,TextField,CardHeader, Typography, CardContent, CardActionArea, Button, CardActions, Paper, LinearProgress, CircularProgress, useMediaQuery } from '@mui/material'
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from '@emotion/react';



const CustomButton=({onclick,varient,icon,label,loading,fullWidth,disabled})=>{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Button fullWidth={fullWidth} variant={varient} onClick={onclick} disabled={disabled} startIcon={icon} size= {matches ? 'small':'medium'} >
                {
                loading ?  <CircularProgress size={23} value={true} variant="indeterminate" sx={{
                    color:'black',
                    
                }}/> : label
               }
        </Button>
    )

}




const LogIn = () => {

    const [email,updateEmail]=useState('');
    const [password,updatePassword]=useState(null);
    const [loading,setLoading]=useState(false);
  
    const navigate=useNavigate();

    const handleGoogleSignIn= async()=>{
        try{
            const provider= new GoogleAuthProvider();
            await signInWithPopup(auth,provider);
        }catch(e){
            console.log(e);
            toast(e);
        }
    }
  
  
  
    


    const handelEmailChange=(event)=>{
       
        updateEmail(event.target.value);
        
        

    }
    const handelPasswordChange=(event)=>{
        updatePassword(event.target.value);

    }
    const handelSignIn= async ()=>{
        setLoading(true);
        try{
            await signInWithEmailAndPassword(auth,email,password);
        }catch(e){
            toast(e);

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
        
        <Paper elevation={5}  className='signupandsigninDiv' >
          
               
            
            <CardContent >
                <div className='title'>
                    Sign In

                </div>
                    
                
               
                <br />
                <TextField  fullWidth={true}  onChange={handelEmailChange} label={'Email'} inputMode='email'  />
                <br />
                <br />
                <TextField  fullWidth={true} type='password' onChange={handelPasswordChange} label={'Password'}  />

            </CardContent>
            <CardActions  >
                <CustomButton disabled={loading} varient={'outlined'} label={'Cancel'} />
                <CustomButton disabled={loading} varient={'contained'} label={'Log In'} onclick={handelSignIn} loading={loading}  />
                
            </CardActions>
            <CardActions  >
                <CustomButton disabled={loading} varient={'outlined'} label={'Google'} onclick={handleGoogleSignIn} fullWidth={true} icon={<FcGoogle />} />
             
            </CardActions>
            <CardActions>
            <CustomButton disabled={loading} varient={'contained'} label={'Sign Up'} onclick={()=>navigate('/SignUp')} fullWidth={true} />
            
            </CardActions>
         
            

        </Paper>
    </div>
  )
}

export default LogIn





