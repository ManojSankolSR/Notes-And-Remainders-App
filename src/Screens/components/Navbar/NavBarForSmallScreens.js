import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react'
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import { LuAlarmClock, LuLogOut } from 'react-icons/lu';
import { RiSearch2Line } from 'react-icons/ri';


const Navbaritem = ({ icon, title, href, onclick }) => {
    return (
        <div className='NavBarItem'>
            <NavLink className={(e) => { return e.isActive ? "active" : "" }} to={href} onClick={onclick} > <div className='NavIcon'>{icon}</div> &nbsp;<div className='NavTitle' >{title}</div></NavLink>
  
        </div>
    )
  }



const NavBarForSmallScreens = ({openDialog,isDialogOpen}) => {
  return (
    <Dialog  maxWidth='xs' onClose={()=>openDialog(false)} open={isDialogOpen} fullWidth={true} >
    <DialogTitle sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        {'Menu'}
        <IconButton  onClick={()=>openDialog(false)} aria-label="delete" >
        {<IoClose />}       
        </IconButton>
         
    </DialogTitle>
    <DialogContent sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly',height:260}}> 
            <Navbaritem icon={<GrHomeRounded />} title={'Home'} href={'/'} />
            <Navbaritem icon={<FaRegNoteSticky />} title={'Notes'} href={'/Notes'} />
            <Navbaritem icon={<LuAlarmClock />} title={'Remainder'} href={'/Remainders'} />
            <Navbaritem icon={<RiSearch2Line />} title={'Search'} href={'/Search'} />
            <Navbaritem icon={<LuLogOut />} title={'Logout'} href={'/logout'} />
            
    </DialogContent>
    <DialogActions>
 
</DialogActions>
    

    
</Dialog>
  )
}

export default NavBarForSmallScreens