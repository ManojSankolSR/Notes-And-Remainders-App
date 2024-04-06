import React, { useState } from 'react'
import './Screens.css'
import { useContext } from 'react';
import TopBar from './components/Navbar/TopBar'
import { LoadingContext, NotesContext, RemaindersContext } from '../Contexts/Contexts';
import NoteComponent from './components/NoteComponent';
import RemainderComponent from './components/RemainderComponent';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Masonry, TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab,Paper } from '@mui/material';






const HomeScreen = () => {
  const notesContext = useContext(NotesContext);
  const remaindersContext = useContext(RemaindersContext);
  const [tabNo, changeTab] = useState("1");
  const loading = useContext(LoadingContext);


  const handleChange = (event, newValue) => {
    changeTab(newValue);
  };

  return (

    <div className='BodyDiv'>
      <TopBar pageTitle={'Recent'} />
      {/* <div className="HomeDiv"  > */}
      <Paper  elevation={2} className='componentsDiv'  sx={{backgroundColor:'#F6F8FA',borderRadius:5,padding:2,marginX:1,marginY:2}} >
     
        <h1 className='title' >Recent Notes</h1>
        {
          loading 
          ? <div className='center'  style={{position:'absolute',top:0,bottom:0,right:0,left:0}} >
            <l-mirage
              size="90"
              speed="2.5"
              color="black"
            ></l-mirage>
          </div>
          :
          <TabContext value={tabNo}  >
          <TabList onChange={handleChange}  > 
            <Tab label="Notes" value="1" />
            <Tab label="Remainders" value="2" />

          </TabList>
          <TabPanel value="1"  >
      
          {
            notesContext.Notes.length > 0 ?
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2} >
            { notesContext.Notes.map((note) => (
              <>
                <NoteComponent note={note} />
              </>
            )) }
          </Masonry>
          : <div className='center' >No Notes Found ! Try Adding Some</div>

            }
            
          </TabPanel>
          <TabPanel value="2">
            {
              remaindersContext.Remainders.length > 0 ?
              <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2} >
              {
                 remaindersContext.Remainders.map((remainder) => {

                  return <>
                    <RemainderComponent remainder={remainder} />

                  </>

                }) 
              }


            </Masonry>
            : <div className='center' >No Notes Found ! Try Adding Some</div>
            }
          </TabPanel>



        </TabContext>
        }
        
        {/* <div className="recentNotesDiv">
            { 
                notesContext.Notes.length>0 ?
               
                  notesContext.Notes.slice(0,3).map((note)=>{
               
                    console.log(note);
                  return <NoteComponent note={note}/>
                    
                }): <div className='center' >No Notes Found ! Try Adding Some</div>
            }
            </div>

            <h1>Recent Remainders</h1>
            <div className="recentNotesDiv">
            { 
                remaindersContext.Remainders.length>0 ?  remaindersContext.Remainders.map((note)=>{
               
                    console.log(note);
                  return <RemainderComponent remainder={note} />
                    
                }): <div className='center' >No Notes Found ! Try Adding Some</div>
            }
            </div> */}

      {/* </div> */}
      </Paper>


    </div>
  )
}

export default HomeScreen