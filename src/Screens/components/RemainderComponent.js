import moment from 'moment'
import React, { useState } from 'react'
import { LuAlarmClock } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext, NotesContext, RemaindersContext } from '../../Contexts/Contexts';
import { useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Remainders } from '../../Functions/Remainders';
import RemaindersdeleteDialog from './Dialogs/RemaindersdeleteDialog';


const RemainderComponent = ({ remainder, onclick }) => {
    const remaindersContext = useContext(RemaindersContext);
    const user=useContext(AuthContext);
    const isRemainded=new Date(remainder.remainderDate) < new Date(Date.now());
    const [isDialogOpen, openDialog] = useState(false);


    const handelDelete=()=>{
        const arr = remaindersContext.Remainders.filter((ele) => ele.id !== remainder.id);
        Remainders.deleteRemainder(remainder.id,user,isRemainded);
        remaindersContext.alterRemainders([...arr]); 
    }



    return (
        <Card className='card' sx={{borderRadius:2,}} >
            <RemaindersdeleteDialog isDialogOpen={isDialogOpen} openDialog={openDialog} onDeleteClick={handelDelete}    />
            <CardActionArea disabled={isRemainded}  onClick={onclick} style={{  backgroundColor: remainder.color,opacity:isRemainded? .6 : 1, width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'start', wordBreak: 'break-word', overflowY: 'auto' }} >
                <CardContent >
                    {
                        isRemainded &&  <Typography gutterBottom variant="body1" component="div">
                        Remainded
                    </Typography>
                    }
                    <Typography gutterBottom variant="caption" component="div">
                        {moment(remainder.remainderDate).format('D-MMM-yy  hh:mm a')}
                    </Typography>
                    
                    <Typography gutterBottom variant="h6" component="div">
                        {remainder.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {remainder.description}
                    </Typography>
                </CardContent>

            </CardActionArea  >
            <CardActions style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}>
                <IconButton  onClick={() => {
                    if(isRemainded){
                        handelDelete();
                        return;
                    }
                    openDialog(true);
                    

                    }} aria-label="delete" >
                    <AiOutlineDelete />
                </IconButton>
            </CardActions>
        </Card>




    )
}

export default RemainderComponent