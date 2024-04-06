import React, { useContext, useRef, useState } from 'react'
import { NotesContext, RemaindersContext,AuthContext } from '../../../Contexts/Contexts';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker,MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enIN } from 'date-fns/locale';
import { toast } from 'sonner';
import { Notes } from '../../../Functions/Notes';
import { Remainders } from '../../../Functions/Remainders';

const NotesAndRemaindersUpdateDialog = ({ isRemainder, isDialogOpen, openDialog, note }) => {
    const [title, changeTitle] = useState(note.title);
    const [desc, changedesc] = useState(note.description);
    const notesContext = useContext(NotesContext);
    const remaindersContext = useContext(RemaindersContext);
    const user=useContext(AuthContext);
    const [RemainderDate, updateRemainderDate] = useState(new Date(note.remainderDate));
    


    const handleTitleChange = (e) => {
        changeTitle(e.target.value);

    }
    const handledescriptionChange = (e) => {
        changedesc(e.target.value);

    }
    const handleNotesUpdate = async () => {
        if(title===''){
            return toast('Enter Some Value In Title');
        }
        if(desc===''){
            return toast('Enter Some Value In Note');
        }
        const newNotes = notesContext.Notes;
        const index = newNotes.indexOf(note);
        newNotes[index] = { id: note.id, title: title, description: desc, date: Date(), color: note.color }
        
        Notes.updateNote(user.uid,newNotes[index]);
        notesContext.alterNotes([...newNotes]);
        openDialog(false);

    }
    const handleRemaindersUpdate = () => {
        if(title===''){
            return toast('Enter Some Value In Title');
        }
        if(desc===''){
            return toast('Enter Some Value In Note');
        }
        const newRemainders = remaindersContext.Remainders;
        const index = newRemainders.indexOf(note);
        newRemainders[index] = {
            id: note.id,
            title: title,
            description: desc,
            color: note.color,
            date: Date(),
            remainderDate: RemainderDate.toString(),
        }
        Remainders.updateRemainder(user.uid,newRemainders);

        remaindersContext.alterRemainders([...newRemainders]);
        openDialog(false);

    }


    return (
        <Dialog maxWidth='xs' onClose={() => {
            openDialog(false);
            console.log(isDialogOpen);
        }} open={isDialogOpen} fullWidth={true} >
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
                <TextField value={title} onChange={handleTitleChange} label="Title" variant="outlined" multiline='true' maxRows={4} fullWidth={true} margin='normal' />
                <TextField value={desc} onChange={handledescriptionChange} label="Note" variant="outlined" multiline='true' maxRows={4} fullWidth={true} margin='normal' />
                <br />
                <br />
                {
                    isRemainder &&
                
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enIN}> <MobileDateTimePicker minutesStep={1} ampm={true} label="DateTime Picker" value={RemainderDate} onChange={(value) => updateRemainderDate(value)} /> </LocalizationProvider>
                }
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => {
                    openDialog(false);
                }}  >Cancel</Button>
                <Button style={{ color: 'black' }} onClick={isRemainder ? handleRemaindersUpdate : handleNotesUpdate} type="submit">Submit</Button>
            </DialogActions>



        </Dialog>

    )
}

export default NotesAndRemaindersUpdateDialog