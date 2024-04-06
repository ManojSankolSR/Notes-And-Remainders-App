import moment from 'moment'
import React, { useContext, useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { AuthContext, NotesContext, notesContext } from '../../Contexts/Contexts';
import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Notes } from '../../Functions/Notes';










const NoteComponent = ({ note, onclick }) => {
    const notesContext = useContext(NotesContext);
    const user = useContext(AuthContext);


    const handelDelete = () => {
        Notes.deleteNote(note.id, user.uid);
        const arr = notesContext.Notes.filter((ele) => ele.id !== note.id);
        notesContext.alterNotes([...arr]);

    }

    return (

        <Card className='card' sx={{ borderRadius: 2, backgroundColor: note.color }} >
            <CardActionArea onClick={onclick} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'start', wordBreak: 'break-word', overflowY: 'auto' }} >
                <CardContent >
                    <Typography gutterBottom variant="caption" component="div">
                        {moment(note.date).format('D-MMM-yy  hh:mm a')}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div">
                        {note.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {note.description}
                    </Typography>
                </CardContent>

            </CardActionArea  >
            <CardActions style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}>
                <IconButton onClick={handelDelete} aria-label="delete" >
                    <AiOutlineDelete />
                </IconButton>
            </CardActions>
        </Card>




        // <div className="note" style={{
        //     backgroundColor:note.color
        // }}  onClick={onclick} >
        //     <div className='NoteDate'>
        //             {moment(note.date).format('D-MMM-yy')}

        //         </div>
        //         <div style={{
        //             height:'3px'
        //         }}>
        //         </div>
        //         <div className='NoteTitle' >
        //             {note.title}
        //         </div>
        //         <hr style={{
        //             border:0,
        //             borderTop:'1px solid black',
        //             margin:'10px 0px',
        //         }} />
        //         <div className='NoteDescription'>
        //             {note.description}
        //         </div>
        //         <AiOutlineDelete className='Deleticon' onClick={()=>{
        //             const arr= notesContext.Notes.filter((ele)=>ele.id!==note.id);

        //             notesContext.alterNotes([...arr]);


        //         }} />


        // </div>
    )
}




export default NoteComponent