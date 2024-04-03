import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ReceivedAccessItem from '@/components/ui/ReceivedAccessItem'

const { VITE_APP_API_URL } = import.meta.env

function ReceivedAccess({ receivedAccess, setReceivedAccess }) {
  const jwt = localStorage.getItem('jwt')

  // Get received access from the API
  useEffect(() => {
    const getReceivedAccess = async () => {
      try {
        const { data } = await axios.post(
          VITE_APP_API_URL + '/access/view-received',
          {
            jwt,
          },
        )

        setReceivedAccess(data)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred. Please try again later.')
      }
    }

    getReceivedAccess()
  }, [])

  return (
    <div className="flex-1 flex flex-col bg-default border border-zinc-200 rounded-xl">
      {/* Section title */}
      <div className="border-b border-zinc-200 py-4 px-6 flex-shrink-0">
        <h2>Received Access</h2>
      </div>

      {/* Received access list */}
      <div className="py-1.5 px-6 flex-grow overflow-auto h-max max-h-72">
        {!receivedAccess?.received?.length > 0 ? (
          // If no received access is found
          <div className="text-lighten/70 text-sm italic py-3">
            You have not received access from any user yet.
          </div>
        ) : (
          // If received access is found
          receivedAccess?.received?.map((received) => (
            <ReceivedAccessItem
              key={received.id}
              received={received}
              setReceivedAccess={setReceivedAccess}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ReceivedAccess
