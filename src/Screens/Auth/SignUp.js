import React, { useEffect, useState } from 'react'
import { Card, TextField, CardHeader, Typography, CardContent, CardActionArea, Button, CardActions, Paper, LinearProgress, CircularProgress, useMediaQuery } from '@mui/material'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTheme } from '@emotion/react';
import axios from 'axios';



const SignUp = () => {
    const [username, updateUserName] = useState('');
    const [email, updateEmail] = useState('');
    const [enteredOTP, updateenteredOTP] = useState('');
    const [recivedOTP, updateRecivedOTP] = useState('');
    const [password, updatePassword] = useState(null);
    const [isverifying, updatevarifyingStatus] = useState('');
    const [CNFpassword, updateCNFPassword] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    const handleEmailVerification = async () => {


        try {
            if (username === '') {
                throw new Error('Please Enter UserName');

            }
            if (email === '') {
                throw new Error('Please Enter Email');

            }
            if (!email.includes('.com') || !email.includes('@')) {
                throw new Error('Please Enter Valid Email');

            }
            updatevarifyingStatus('loading');
            const OTP = await sendOTP();
            if (OTP === false) {
                
                updatevarifyingStatus(false);
                throw new Error('Invalid Email');
            }

            updateRecivedOTP(OTP.toString());
            updatevarifyingStatus(true);
            toast.success(`OTP Sent to ${email}`);

        } catch (error) {
            toast.error(error.message);

        }






    }



    const handelUserNameChange = (event) => {

        updateUserName(event.target.value);

    }
    const handelOTPChange = (event) => {

        updateenteredOTP(event.target.value);

    }


    const handelEmailChange = (event) => {

        updateEmail(event.target.value);



    }

    const handelCNFPasswordChange = (event) => {
        updateCNFPassword(event.target.value);

    }
    const handelPasswordChange = (event) => {
        updatePassword(event.target.value);

    }
    const sendOTP = async () => {


        const res = await axios.post('https://notes-and-remainders-app-backend.onrender.com/sendOTP', new URLSearchParams({
            email: email,
        }));
        if (res) {
            if (res.data.isValid === true) {
                return res.data.OTP;
            }
            if (res.data.isValid === false) {
                return false;

            }
        }


    }



    const handelSignUp = async () => {
        setLoading(true);

        try {
            if (username === '') {
                throw new Error('Please Enter UserName');

            }
            if (email === '') {
                throw new Error('Please Enter Email');

            }
            if (!email.includes('.com') || !email.includes('@')) {
                throw new Error('Please Enter Valid Email');

            }


            if (password !== CNFpassword) {
                throw new Error('Password and Conform Password Should be Same');

            }

            if (enteredOTP === '' || enteredOTP.length !== 6 || enteredOTP !== recivedOTP) {
                throw new Error('Please Enter Valid OTP');

            }

            await createUserWithEmailAndPassword(auth, email, password);
            if (auth.currentUser.providerData[0].providerId === 'password') {
                await updateProfile(auth.currentUser, {
                    displayName: username

                });
                navigate('/');

            }



        } catch (e) {

            toast.error(e.message);

        } finally {
            setLoading(false);
        }

    }


    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'


        }} >





            <Paper elevation={5} className='signupandsigninDiv'  >



                <CardContent >
                    <div className='title'>
                        Sign Up

                    </div>

                    <br />
                    <TextField disabled={isverifying === 'loading'} fullWidth={true} onChange={handelUserNameChange} label={'UserName'} inputMode='text' value={username} />
                    <br />
                    <br />
                    <TextField disabled={isverifying === 'loading'} fullWidth={true} onChange={handelEmailChange} label={'Email'} inputMode='email' value={email} />
                    <br />
                    <br />
                    <Button variant='contained' disabled={loading || isverifying === 'loading' || isverifying} fullWidth={true} onClick={handleEmailVerification} >
                        {
                            isverifying === 'loading' ? <CircularProgress size={23} value={true} variant="indeterminate" sx={{
                                color: 'black',

                            }} /> : 'Verify'
                        }
                    </Button>

                    {
                        isverifying === true &&
                        <>
                            <br />
                            <br />
                            <TextField fullWidth={true} onChange={handelOTPChange} label={'OTP'} inputMode='text' value={enteredOTP} />
                            <br />
                            <br />
                            <TextField fullWidth={true} onChange={handelPasswordChange} label={'Password'} type='password' value={password} />
                            <br />
                            <br />
                            <TextField fullWidth={true} onChange={handelCNFPasswordChange} label={'Conform Password'} type='password' value={CNFpassword} />

                        </>
                    }
                </CardContent>
                {
                    isverifying === true &&
                    <CardActions  >
                        <Button variant='outlined' disabled={loading} >
                            Cancel
                        </Button>
                        <Button variant='contained' onClick={handelSignUp} disabled={loading} >
                            {
                                loading ? <CircularProgress size={23} value={true} variant="indeterminate" sx={{
                                    color: 'black',

                                }} /> : 'Sign Up'
                            }
                        </Button>
                    </CardActions>

                }

                <CardActions  >
                    <Button onClick={handleGoogleSignIn} fullWidth={true} startIcon={<FcGoogle />} variant='outlined' disabled={loading} >
                        Google
                    </Button>

                </CardActions>
                <CardActions>
                    <Button variant='contained' disabled={loading} fullWidth={true} onClick={() => navigate('/')} >
                        Log In
                    </Button>
                </CardActions>



            </Paper>

        </div>
    )
}

export default SignUp