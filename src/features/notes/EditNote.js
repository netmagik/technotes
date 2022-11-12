import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const EditNote = () => {
  const { id } = useParams();

  // const note = useSelector(state => selectNoteById(state, id))
  // const users = useSelector(selectAllUsers)

  //Define notes
  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  // Define Users array
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={'#FFF'} />

    // Prevent employee from entering Note Id in the URL and editing it, even though 
  // it's NOT their note and they are not allowed
  // Only allowed to see their own notes as Employee
  if (!isManager && !isAdmin) {
    if (note.username !== username) {
        return <p className="errmsg">No access</p>
    }
  }

  const content = <EditNoteForm note={note} users={users} />

  return content;
};
export default EditNote;
