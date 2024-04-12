import logo from './logo.svg';
import './App.css';
import Navbar from "./Screens/components/Navbar/Navbar.js";
import HomeScreen from "./Screens/HomeScreen.js";
import NotesScreen from "./Screens/NotesScreen.js";
import RemaindersScreen from './Screens/RemaindersScreen.js';
import './Screens/Screens.css'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { NotesContext, RemaindersContext, AuthContext,LoadingContext } from './Contexts/Contexts.js'
import { useContext, useMemo, useState, } from "react";
import useLocalStorage from "use-local-storage";
import { Toaster } from 'react-hot-toast';
import LogIn from './Screens/Auth/LogIn.js';
import { Backdrop, CircularProgress, createTheme, ThemeProvider, LinearProgress } from '@mui/material';
import { blue, grey, purple, } from '@mui/material/colors';
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react';
import { auth } from './Firebase/firebase.js';
import SignUp from './Screens/Auth/SignUp.js';
import { Notes as AlterNotes } from './Functions/Notes.js';
import { Remainders as AlterRemainders } from './Functions/Remainders.js';
import SearchScreen from './Screens/SearchScreen.js';





const theme = createTheme({
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },


  palette: {


    primary: {
      main:grey[900]
    },
    secondary: blue,

  },
});



function App() {


  const [password, updatePassword] = useState(null);
  const [Notes, alterNotes] = useState([])// useLocalStorage('Notes', []);
  const [Remainders, alterRemainders] = useState([]) //useLocalStorage('Remainders', []);
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(true);





  const router = createBrowserRouter([

    {
      path: '/',
      element: <div className='MainDiv'><LogIn /></div>
    },
    {
      path: '/SignUp',
      element: <div className='MainDiv'><SignUp /></div>
    },])



  useEffect(() => {
      onAuthStateChanged(auth,(user)=>{
        if(user){
          AlterRemainders.getRemainders(user.uid,alterRemainders,setLoading);
          return AlterNotes.getNotes(user.uid, alterNotes, setLoading);

        }
        setLoading(false);
      })
    
  }, [])







  const Authenticatedrouter = createBrowserRouter([


    {
      path: '/',
      element: <div className='MainDiv'><Navbar isRemainder={true} /> <HomeScreen /> </div>
    },
    {
      path: '/Search',
      element: <div className='MainDiv'><Navbar isRemainder={false} /> <SearchScreen /> </div>

    },
    {
      path: '/Notes',
      element: <div className='MainDiv'><Navbar isRemainder={false} /> <NotesScreen /> </div>
    },
    {
      path: '/Remainders',
      element: <div className='MainDiv'><Navbar isRemainder={true} /> <RemaindersScreen /> </div>
    },

  ])
  return (

    <ThemeProvider theme={theme}>
      <RemaindersContext.Provider value={{ Remainders, alterRemainders }}>
        <NotesContext.Provider value={{ Notes, alterNotes }}>
        <LoadingContext.Provider value={loading} >
          <Toaster />
          
          <RouterProvider router={user != null ? Authenticatedrouter : router} />
          

        </LoadingContext.Provider>
          


        </NotesContext.Provider>
      </RemaindersContext.Provider>

    </ThemeProvider>






  );
}

export default App;
