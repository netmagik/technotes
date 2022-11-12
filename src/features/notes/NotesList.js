import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const NotesList = () => {
useTitle('Notes List')

  const { username, isManager, isAdmin } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(
    ('notesList',
    {
      // every 15seconds we reQuery data (get fresh data)
      // useful in case another person updates something while we have this open
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })
  );

  let content;

  if (!isLoading) content = <PulseLoader color={'#FFF'} />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    // we get this from RTK Query - useGetNotesQuery
    const { ids, entities } = notes;

    let filteredIds
        if (isManager || isAdmin) {
          // if Manager or Admin show ALL notes
            filteredIds = [...ids]
        } else {
          // Show only notes for the specific Employee, unless Manager or Admin
          // Employee cannot see everyone's notes
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

    const tableContent = ids?.length && filteredIds.map(noteId => 
    <Note key={noteId} noteId={noteId} />)

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default NotesList;
