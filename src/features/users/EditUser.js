import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

// With this Component, we confirm we have a user to prepopulate EditUserForm to edit user
const EditUser = () => {
  // Pull data not from Query but from State, by using id
  const { id } = useParams()
  
  // const user = useSelector(state => selectUserById(state, id))
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    }),
  })

  if (!user) return <PulseLoader color={'#FFF'} />
  
  const content = <EditUserForm user={user} />

  return content
}
export default EditUser