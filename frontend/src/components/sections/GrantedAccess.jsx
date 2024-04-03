import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import GrantedAccessItem from '@/components/ui/GrantedAccessItem'

const { VITE_APP_API_URL } = import.meta.env

function GrantedAccess({ grantedAccess, setGrantedAccess }) {
  const jwt = localStorage.getItem('jwt')

  // Get granted access from the API
  useEffect(() => {
    const getGrantedAccess = async () => {
      try {
        const { data } = await axios.post(
          VITE_APP_API_URL + '/share-access/view-granted',
          {
            jwt,
          },
        )

        setGrantedAccess(data)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred. Please try again later.')
      }
    }

    getGrantedAccess()
  }, [])

  return (
    <div className="flex-1 flex flex-col bg-default border border-zinc-200 rounded-xl">
      {/* Section title */}
      <div className="border-b border-zinc-200 py-4 px-6 flex-shrink-0">
        <h2>Granted Access</h2>
      </div>

      {/* Granted access list */}
      <div className="py-1.5 px-6 flex-grow overflow-auto h-max max-h-72">
        {!grantedAccess?.granted?.length > 0 ? (
          // If no granted access is found
          <div className="text-lighten/70 text-sm italic py-3">
            You have not granted access from any user yet.
          </div>
        ) : (
          // If granted access is found
          grantedAccess?.granted?.map((granted) => (
            <GrantedAccessItem
              key={granted.id}
              granted={granted}
              setGrantedAccess={setGrantedAccess}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default GrantedAccess
