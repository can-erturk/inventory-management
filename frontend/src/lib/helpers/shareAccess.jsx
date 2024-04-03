import axios from 'axios'
import { toast } from 'react-toastify'

const { VITE_APP_API_URL } = import.meta.env

export default async function shareAccess(id, setGrantedAccess) {
  const jwt = localStorage.getItem('jwt')

  try {
    // Try to share access with the user
    const { data } = await axios.post(
      VITE_APP_API_URL + '/share-access/share',
      {
        jwt,
        id,
      },
    )

    // Show a toast message based on the response status
    if (data.status === 200) {
      toast.success(data.message)

      // Update the granted access list
      setGrantedAccess((prev) => {
        return {
          granted: [
            {
              id,
              username: data.username,
              email: data.email,
            },
            ...prev.granted,
          ],
        }
      })
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.error(error)
    toast.error('An error occurred. Please try again later.')
  }
}
