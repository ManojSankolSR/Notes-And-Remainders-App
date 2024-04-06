import React, { useState } from 'react'
import TopBar from './components/Navbar/TopBar'
import { useContext, useRef } from "react";
import { LoadingContext, NotesContext, RemaindersContext } from '../Contexts/Contexts';
import NoteComponent from './components/NoteComponent';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { de } from 'date-fns/locale/de';
import DateTimePicker from 'react-datetime-picker';
import { Card, Paper } from '@mui/material';
import NotesAndRemaindersUpdateDialog from './components/Dialogs/NotesAndRemaindersUpdateDialog';
import randomColor from 'randomcolor';
import { Masonry } from '@mui/lab';
import { mirage } from 'ldrs'


mirage.register()









const NotesScreen = () => {
  const notesContext = useContext(NotesContext);
  const loading = useContext(LoadingContext);
  const [isDialogOpen, openDialog] = useState(false);
  const [matchingId, changmatchingId] = useState('');







  return (
    <div className='BodyDiv'>
      <TopBar pageTitle={'Notes'} />
      {/* <div className="componentsDiv" > */}
      
      <Paper  elevation={2} className='componentsDiv'  sx={{backgroundColor:'#F6F8FA',borderRadius:5,padding:2,marginX:1,marginY:2}} >
        { 
        loading 
          ? <div className='center' >
            <l-mirage
              size="90"
              speed="2.5"
              color="black"
            ></l-mirage>
          </div>
          : notesContext.Notes.length > 0 ?
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2} >
              {notesContext.Notes.map((note) => (
                <>
                  <NoteComponent note={note} onclick={() => {
                    openDialog(true);
                    changmatchingId(note.id);

                  }} />
                  {

                    note.id === matchingId && <NotesAndRemaindersUpdateDialog isDialogOpen={isDialogOpen} isRemainder={false} note={note} openDialog={openDialog} key={note.id} />

                  }
                </>
              ))}
            </Masonry> : <div className='center' >No Notes Found ! Try Adding Some</div>

        }
      {/* </div> */}
      </Paper>
    </div>

  )
}



// const NotesAddDialog = ({isRemainder,isDialogOpen,openDialog,note}) => {
//   const [title,changeTitle]=useState(note.title);
//   const [desc,changedesc]=useState(note.description);
//   const DialogRef=useRef();
//   const notesContext=useContext(NotesContext);
//   const remaindersContext=useContext(RemaindersContext);
//   const [RemainderDate,updateRemainderDate]=useState(new Date());


//   const handleTitleChange=(e)=>{
//     changeTitle(e.target.value);

//   }
//   const handledescriptionChange=(e)=>{
//     changedesc(e.target.value);

//   }
//   const handleUpdate=()=>{
//     const newNotes=notesContext.Notes;
//     const index=newNotes.indexOf(note);
//     newNotes[index]={id:note.id,title:title,description:desc,date:Date(),color:note.color}
//     notesContext.alterNotes([...newNotes]);
//     openDialog(false);

//   }








// return (



//   <Dialog ref={DialogRef}  maxWidth='xs' onClose={()=>{
//       openDialog(false);
//       console.log(isDialogOpen);
//   }} open={isDialogOpen} fullWidth={true} >
//   <DialogTitle>Edit Note</DialogTitle>
//   <DialogContent>
//   <TextField  value={title} onChange={handleTitleChange} label="Title" variant="outlined"  multiline='true' maxRows={4} fullWidth={true} margin='normal' />



//   <TextField  value={desc} onChange={handledescriptionChange} label="Note" variant="outlined"  multiline='true' maxRows={4} fullWidth={true} margin='normal' />
//   <br />
//   <br />
//           {
//               isRemainder &&

//               <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale= {de}> <DateTimePicker   label="Controlled picker" value={RemainderDate} onChange={(value)=>updateRemainderDate(value)} /> </LocalizationProvider>

//           }



//   </DialogContent>
//       <DialogActions>
//         <Button variant='contained' onClick={()=>{
//         openDialog(false);
//         }} style={{
//           backgroundColor:'black'
//         }} >Cancel</Button>
//         <Button style={{color:'black'}} onClick={handleUpdate} type="submit">Submit</Button>
//     </DialogActions>



// </Dialog>

// )
// }

export default NotesScreen 