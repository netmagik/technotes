import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// need this component to keep the state active for users and notes that will not expire in 5s or 60s which is the default
const Prefetch = () => {
    
    useEffect(() => {
        //manual subscription. call the slice, import endpoints, call query we want and initialize

        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {force: true}))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))

    }, [])

    return <Outlet />
}
export default Prefetch