import axios from 'axios'
import { toast } from 'react-toastify'

const { VITE_APP_API_URL } = import.meta.env

export default async function receiveAccess(id, setReceivedAccess) {
  const jwt = localStorage.getItem('jwt')

  try {
    // Try to receive access from the user with the given ID
    const { data } = await axios.post(VITE_APP_API_URL + '/access/receive', {
      jwt,
      id,
    })

    // Show a toast message based on the response status
    if (data.status === 200) {
      toast.success(data.message)

      // Update the received access list
      setReceivedAccess((prev) => {
        return {
          received: [
            {
              id,
              username: data.username,
              email: data.email,
            },
            ...prev.received,
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
