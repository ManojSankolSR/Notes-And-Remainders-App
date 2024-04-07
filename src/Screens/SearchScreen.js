import React, { useContext, useState } from 'react'
import { TextField, Paper, InputBase,InputAdornment } from '@mui/material';
import TopBar from './components/Navbar/TopBar';
import { LoadingContext, NotesContext, RemaindersContext } from '../Contexts/Contexts';
import NoteComponent from './components/NoteComponent';
import NotesAndRemaindersUpdateDialog from './components/Dialogs/NotesAndRemaindersUpdateDialog';
import { Masonry } from '@mui/lab';
import RemainderComponent from './components/RemainderComponent';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';




const SearchScreen = () => {
    const notesContext = useContext(NotesContext);
    const remaindersContext = useContext(RemaindersContext);
    const [Search, setSearch] = useState('');
    const Concatinated = useMemo(() => notesContext.Notes.concat(remaindersContext.Remainders), [notesContext, remaindersContext]);
    const [SearchList, setSearchList] = useState(Concatinated);
    const [isDialogOpen, openDialog] = useState(false);
    const [matchingId, changmatchingId] = useState('');
    const loading = useContext(LoadingContext);


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const Searchedlist = Concatinated.filter((e) => {
            return e.title.toLowerCase().includes(value.toLowerCase()) || e.description.toLowerCase().includes(value.toLowerCase());
        })
        setSearchList(Searchedlist);


    }

   
    return (

        <div className='BodyDiv'>
            <TopBar pageTitle={'Search'} SearchComponent={
                <NavLink className='SearchBar' to={'/Search'}>
                    
                    &nbsp;
                    <InputBase value={Search} onChange={handleSearch}
                        startAdornment={<InputAdornment position="start"><RiSearch2Line /></InputAdornment>}

                        sx={{ margin: 0, padding: 0 }}
                        placeholder="Search"
                        onChangeCapture={handleSearch}


                    />
                </NavLink>
            } />



            <Paper elevation={2} className='componentsDiv' sx={{ backgroundColor: '#F6F8FA', borderRadius: 5, padding: 2, marginX: 1, marginY: 2 }} >

                {
                    loading
                        ? <div className='center' >
                            <l-mirage
                                size="90"
                                speed="2.5"
                                color="black"
                            ></l-mirage>
                        </div>
                        : SearchList.length > 0 ?
                            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2} >
                                {SearchList.map((note) => (
                                    note.remainderDate ?
                                        <>
                                            <RemainderComponent remainder={note} onclick={() => {
                                                openDialog(true);
                                                changmatchingId(note.id);

                                            }} />
                                            {


                                                note.id === matchingId && <NotesAndRemaindersUpdateDialog isDialogOpen={isDialogOpen} isRemainder={true} note={note} openDialog={openDialog} key={note.id} />

                                            }
                                        </> :
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
                            </Masonry> : <div className='center' >No Notes Found ! Try Searching</div>

                }

            </Paper>
        </div>


    )
}

export default SearchScreen