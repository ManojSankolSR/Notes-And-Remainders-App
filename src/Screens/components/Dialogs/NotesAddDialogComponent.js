import React, { useContext, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import {DateTimePicker,LocalizationProvider,MobileDateTimePicker} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { NotesContext,RemaindersContext,AuthContext} from '../../../Contexts/Contexts';
import {v4 as uuidv4} from 'uuid'
import { toast } from 'sonner';
import randomColor from 'randomcolor';
import { BsSave2 } from 'react-icons/bs';
import { enIN } from 'date-fns/locale';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,  TextField } from '@mui/material';
import { Notes } from '../../../Functions/Notes';
import { Remainders } from '../../../Functions/Remainders';
import axios from 'axios';


const NotesAddDialogComponent = ({isRemainder,isDialogOpen,openDialog}) => {
    const inputTitleRef=useRef();
    const inputDescriptionRef=useRef();
    const noteContext=useContext(NotesContext);
    const remaindersContext=useContext(RemaindersContext);
    const user=useContext(AuthContext)
    const [RemainderDate,updateRemainderDate]=useState(new Date());



  return (

    

    <Dialog  maxWidth='xs' onClose={()=>openDialog(false)} open={isDialogOpen} fullWidth={true} >
    <DialogTitle>Add {isRemainder?'Remainder':'Note'}</DialogTitle>
    <DialogContent>
    <TextField inputRef={inputTitleRef}  label="Title" variant="outlined"  multiline='true' maxRows={4} fullWidth={true} margin='normal' />
    
    

    <TextField inputRef={inputDescriptionRef}  label="Note" variant="outlined"  multiline='true' maxRows={4} fullWidth={true} margin='normal' />
    <br />
    <br />
    {
                isRemainder &&
                
                <LocalizationProvider dateAdapter={AdapterDateFns}  adapterLocale={enIN}> <MobileDateTimePicker  ampm={true} minutesStep={1}    label="DateTime picker" value={RemainderDate} onChange={(value)=>updateRemainderDate(value)} /> </LocalizationProvider>
         
            }
    
    

    </DialogContent>
    <DialogActions>
  <Button variant='contained' onClick={()=>{
    openDialog(false);
   

  }}  >Cancel</Button>
  <Button  onClick={ async ()=>{
    if(inputTitleRef.current.value===''){
        return toast('Enter Some Value In Title');
    }
    if(inputDescriptionRef.current.value===''){
        return toast('Enter Some Value In Note');
    }
    if(isRemainder){
        const id=uuidv4();
        const newRemainder={
          id:id,
          title:inputTitleRef.current.value,
          description:inputDescriptionRef.current.value,
          color:randomColor().toString(),
          date:Date(),
          remainderDate:RemainderDate.toString(),
      }
      
        Remainders.addRemainder(user,newRemainder);
        remaindersContext.alterRemainders([...remaindersContext.Remainders,newRemainder]);
        inputTitleRef.current.value='';
        inputDescriptionRef.current.value='';
        openDialog(false);
        return;

    }
    Notes.addNotes(user.uid,{
      id:uuidv4(),
      title:inputTitleRef.current.value,
      description:inputDescriptionRef.current.value,
      color:randomColor().toString(),
      date:Date(),
  });
  console.log(noteContext.Notes);
  
    noteContext.alterNotes([...noteContext.Notes,{
        id:uuidv4(),
        title:inputTitleRef.current.value,
        description:inputDescriptionRef.current.value,
        color:randomColor().toString(),
        date:Date(),
    }]);
    inputTitleRef.current.value='';
    inputDescriptionRef.current.value='';
    openDialog(false);
    
  }} type="submit">Submit</Button>
</DialogActions>
    

    
</Dialog>


    // <dialog id='AddNoteDialog'>
    //         <div id='header-for-Dialog'>
    //             Add Notes
    //             <IoClose onClick={
    //                 ()=>{
    //                     document.getElementById('AddNoteDialog').close();

    //                 }
    //             } />
    //         </div>
    //         <br />
    //         <div>
    //             <textarea type="text" name='title' ref={inputTitleRef} className='custom-TextField' placeholder='Title'  cols="25" rows="4"></textarea>
         
    //          {/* <input /> */}
    //         </div>
          
    //         <div>
    //             <textarea type="text" name='description' ref={inputDescriptionRef} className='custom-TextField' placeholder='Note' cols="25" rows="4"></textarea>
      
    //         </div>
            // {
            //     isRemainder &&
            //     <div style={{
            //         zIndex:1000
            //     }}>
            //     <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale= {de}> <DateTimePicker   label="Controlled picker" value={RemainderDate} onChange={(value)=>updateRemainderDate(value)} /> </LocalizationProvider>
            //     </div>
            // }
            
    //         <br />
          
    //             <div className="custombutton1" onClick={async ()=> {
                    // if(inputTitleRef.current.value===''){
                    //     return toast('Enter Some Value In Title');
                    // }
                    // if(inputDescriptionRef.current.value===''){
                    //     return toast('Enter Some Value In Note');
                    // }
                    // if(isRemainder){
                    //     const id=uuidv4();
                    //     await Notification.requestPermission();
                    //     //  Checkservice();
                    //     // await  ScheduleNotification(inputTitleRef.current.value,id,RemainderDate);

                    //     remaindersContext.alterRemainders([...remaindersContext.Remainders,{
                    //         id:id,
                    //         title:inputTitleRef.current.value,
                    //         description:inputDescriptionRef.current.value,
                    //         color:randomColor().toString(),
                    //         date:Date(),
                    //         remainderDate:RemainderDate,
                            

                    //     }]);
                    //     inputTitleRef.current.value='';
                    //     inputDescriptionRef.current.value='';
                    //     document.getElementById('AddNoteDialog').close(); 
                    //     return;

                    // }
                    // noteContext.alterNotes([...noteContext.Notes,{
                    //     id:uuidv4(),
                    //     title:inputTitleRef.current.value,
                    //     description:inputDescriptionRef.current.value,
                    //     color:randomColor().toString(),
                    //     date:Date(),
                    // }]);
                
                    // inputTitleRef.current.value='';
                    // inputDescriptionRef.current.value='';
    //                 document.getElementById('AddNoteDialog').close();    

    //             }}>
    //                 <BsSave2 />
    //                 &nbsp;
    //                 Save
    //             </div>
         

    //     </dialog>
  )
}

export default NotesAddDialogComponent