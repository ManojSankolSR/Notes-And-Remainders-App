import { React, useContext, useRef, useState, } from 'react'

import './components.css'
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

import NotesAddDialogComponent from '../Dialogs/NotesAddDialogComponent';
import { signOut } from 'firebase/auth';
import { RiSearch2Line } from 'react-icons/ri';





const Navbaritem = ({ icon, title, href, onclick }) => {
    return (
        <div className='NavBarItem'>
            <NavLink className={(e) => { return e.isActive ? "active" : "" }} to={href} onClick={onclick} > <div className='NavIcon'>{icon}</div> &nbsp;<div className='NavTitle' >{title}</div></NavLink>

        </div>
    )
}

const Navbar = ({ isRemainder }) => {

    const [isDialogOpen, openDialog] = useState(false);





    return (
        <div className='Navbar-for-large-screens'>
            
            <NotesAddDialogComponent isRemainder={isRemainder} isDialogOpen={isDialogOpen} openDialog={openDialog} />
            <h2 id='Navtitle-large-screen' >Notes</h2>
            <Navbaritem icon={<GrHomeRounded />} title={'Home'} href={'/'} />
            <Navbaritem icon={<FaRegNoteSticky />} title={'Notes'} href={'/Notes'} />
            <Navbaritem icon={<LuAlarmClock />} title={'Remainder'} href={'/Remainders'} />
            <Navbaritem icon={<RiSearch2Line />} title={'Search'} href={'/Search'} />
            <Navbaritem icon={<LuLogOut />} title={'Logout'} href={'/logout'} onclick={ async ()=> await signOut()} />


            <div style={{
                marginTop: 'auto'
            }}>
                <Navbaritem icon={<BiMessageSquareAdd />} title={'Add Notes'} onclick={() => {
                    openDialog(true);

                }} />
            </div>

        </div>

    )
}

export default Navbar;
