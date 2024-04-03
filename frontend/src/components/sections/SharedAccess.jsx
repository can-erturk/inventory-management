import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SharedAccessItem from '../ui/SharedAccessItem'

const { VITE_APP_API_URL } = import.meta.env

function SharedAccess() {
  const [sharedAccess, setSharedAccess] = useState({})

  const jwt = localStorage.getItem('jwt')

  // Get shared access from the API
  useEffect(() => {
    const getSharedAccess = async () => {
      try {
        const { data } = await axios.post(
          VITE_APP_API_URL + '/access/view-shared',
          {
            jwt,
          },
        )

        setSharedAccess(data)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred. Please try again later.')
      }
    }

    getSharedAccess()
  }, [])

  return (
    <div className="flex-1 flex flex-col bg-default border border-zinc-200 rounded-xl">
      {/* Section title */}
      <div className="border-b border-zinc-200 py-4 px-6 flex-shrink-0">
        <h2>Shared Access</h2>
      </div>

      {/* Shared access list */}
      <div className="py-1.5 px-6 flex-grow overflow-auto h-max max-h-72">
        {!sharedAccess?.shared?.length > 0 ? (
          // If no shared access is found
          <div className="text-lighten/70 text-sm italic py-3">
            You have not shared access with any user yet.
          </div>
        ) : (
          // If shared access is found
          sharedAccess?.shared?.map((shared) => (
            <SharedAccessItem
              key={shared.id}
              shared={shared}
              setSharedAccess={setSharedAccess}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SharedAccess
