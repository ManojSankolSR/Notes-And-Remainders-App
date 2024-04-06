import React from 'react'
import { Dialog ,DialogActions, DialogContent, DialogTitle,Button,CardMedia} from '@mui/material'


const RemaindersdeleteDialog = ({isDialogOpen,openDialog,onDeleteClick}) => {
  return (
    <Dialog    PaperProps={{
        sx:{
            maxWidth:250,
            padding:1,
            border:'.5px solid black',
            borderRadius:2
        }
    }} onClose={() => {
        openDialog(false);
       
    }} open={isDialogOpen} fullWidth={true} >
        

         <DialogTitle color={'red'} >
            Delete ..?
        </DialogTitle>
        <DialogContent sx={{display:'flex',justifyContent:'center'}} >
        <img src="./pngs/Warning-png.png" alt="" width={150} height={150} />

        </DialogContent>
        
        {/* <CardMedia
        sx={{ height: 50 }}
        image="./pngs/Warning-png.png"
        title="green iguana"
      /> } */}
        <DialogContent>
            This Remainders is Still Not Yet Reaminded, So Do You Really Want to Delete This Remainder
        </DialogContent>
        <DialogActions>
            <Button size='small' variant='outlined' onClick={()=>openDialog(false)} >
                Cancel

            </Button>
            <Button size='small' variant='outlined' color='error' onClick={onDeleteClick} >
                Delete

            </Button>
        </DialogActions>


        
        
    </Dialog>

  )
}

export default RemaindersdeleteDialog