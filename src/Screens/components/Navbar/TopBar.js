import React, { useContext, useState } from 'react'
import './components.css'
import { RiSearch2Line } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { Avatar, Card, Divider, IconButton, ListItem, ListItemIcon, ListItemText, useMediaQuery, Menu, MenuItem, Typography,SpeedDial,SpeedDialAction } from '@mui/material';
import { IoMenu } from "react-icons/io5";
import NavBarForSmallScreens from './NavBarForSmallScreens';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase';
import { AuthContext } from '../../../Contexts/Contexts';
import { deepOrange } from '@mui/material/colors';
import { IoAdd } from "react-icons/io5";
import { FaRegNoteSticky } from 'react-icons/fa6';
import { LuAlarmClock } from 'react-icons/lu';
import { useTheme } from '@emotion/react';
import NotesAddDialogComponent from '../Dialogs/NotesAddDialogComponent';






const TopBar = ({ pageTitle }) => {
  const user = useContext(AuthContext);
  const navigate=useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));
  console.log(user);
  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');


  }

  const [isDialogOpen, openDialog] = useState(false);
  const [isRemainder,setIsRemainder]=useState(false);
  const [isAddNotesOpen, openAddNotesDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='TopBar'>
      <NotesAddDialogComponent isRemainder={isRemainder} isDialogOpen={isAddNotesOpen} openDialog={openAddNotesDialog} />
      <NavBarForSmallScreens isDialogOpen={isDialogOpen} openDialog={openDialog} />
      <SpeedDial   hidden={matches} 

        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<IoAdd />}
      >
   
          <SpeedDialAction
           onClick={()=>{
            setIsRemainder(false);
            openAddNotesDialog(true);
            

          }}
            tooltipOpen={true}
            key={"notes"}
            icon={<FaRegNoteSticky />}
            tooltipTitle={'Notes'}
          />
          <SpeedDialAction
            tooltipOpen={true}
            onClick={()=>{
              setIsRemainder(true);
              openAddNotesDialog(true);

            }}
            key={"remainders"}
            icon={<LuAlarmClock />}
            tooltipTitle={'Remainders'}
          />
       
      </SpeedDial>
      <h1 className='title' >{pageTitle}</h1>
      <IconButton id='menu' onClick={() => openDialog(true)} aria-label="delete" >

        <IoMenu />
      </IconButton>
      <div className='SearchBar'>
        <RiSearch2Line />
        &nbsp;
        Search
      </div>
      <div className="userinfo">
        <div className='username' >
        {user.displayName}
        </div>
        &nbsp;

        {/* <HiOutlineMenu /> */}
        <IconButton onClick={handleClick}  >
          <Avatar className='avatar' sx={{height:32,width:32}}  src={user.photoURL} />
        </IconButton>

      </div>
      <Menu
      
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <br />
        <div className='menuDiv'  >
          <Avatar className='avatar' src={user.photoURL}    />
          &nbsp;
          &nbsp;
          <div  >
            <div id='username' >
              {user.displayName}
            </div>
            <div id='useremail'>
            {user.email}
            </div>
          </div>

        </div>
        <br />
        <Divider  />

        <MenuItem onClick={ async ()=>await handleSignOut()}>

          <ListItemIcon>
            <FiLogOut />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>

        </MenuItem>
        
      </Menu>
    </div>
  )
}

export default TopBar