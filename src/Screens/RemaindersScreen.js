import React, { useState } from 'react'
import TopBar from './components/Navbar/TopBar'
import { useContext } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Paper } from "@mui/material";
import RemainderComponent from './components/RemainderComponent';
import { LoadingContext, RemaindersContext } from '../Contexts/Contexts';
import NotesAndRemaindersUpdateDialog from './components/Dialogs/NotesAndRemaindersUpdateDialog';
import { Masonry } from '@mui/lab';
import { mirage } from 'ldrs'
import { RiSearch2Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

mirage.register()




const RemaindersScreen = () => {
  const remaindersContext = useContext(RemaindersContext);
  const [isDialogOpen, openDialog] = useState(false);
  const [matchingId, changmatchingId] = useState('');
  const loading=useContext(LoadingContext)

  return (



    <div className='BodyDiv'>
      <TopBar pageTitle={'Remainders'} SearchComponent={
        <NavLink className='SearchBar' to={'/Search'}>
        <RiSearch2Line />
          &nbsp;
          Search
        </NavLink>
      } /> 
      {/* <div className="componentsDiv"> */}
      <Paper  elevation={2} className='componentsDiv'   sx={{backgroundColor:'#F6F8FA',borderRadius:5,padding:2,marginX:1,marginY:2}} >
        {
            loading 
            ? <div className='center' >
              <l-mirage
                size="90"
                speed="2.5"
                color="black"
              ></l-mirage>
            </div>
            :
          remaindersContext.Remainders.length > 0 ?

            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2} >
              {
                remaindersContext.Remainders.map((remainder) => {

                  return <>
                    <RemainderComponent remainder={remainder} onclick={() => {
                      openDialog(true);
                      changmatchingId(remainder.id);

                    }} />
                    {


                      remainder.id === matchingId && <NotesAndRemaindersUpdateDialog isDialogOpen={isDialogOpen} isRemainder={true} note={remainder} openDialog={openDialog} key={remainder.id} />

                    }
                  </>

                })
              }


            </Masonry>
            : <div className='center' >No Remainders Found ! Try Adding Some</div>

        }

</Paper>
      {/* </div> */}
    </div>
  )
}

export default RemaindersScreen