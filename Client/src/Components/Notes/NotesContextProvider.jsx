import React,{useReducer} from 'react'
import Notes from './Notes'
import {NotesReducerVar} from '../ReducersVar/ReducersVar'
import NotesReducer from './NotesContext/NotesReducer'
import NotesContext from './NotesContext/NotesContext'


function NotesContextProvider() {
    const [notesState,notesDispatch]=useReducer(NotesReducer,NotesReducerVar)

    return (
            <NotesContext.Provider value={{notesState,notesDispatch}} >

            <Notes/>

            </NotesContext.Provider>

    )
}

export default NotesContextProvider
