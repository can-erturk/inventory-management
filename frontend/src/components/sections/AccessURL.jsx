import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const { VITE_APP_API_URL } = import.meta.env

function AccessURL() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')

    // Fetch the URL from the backend
    if (jwt) {
      axios
        .post(VITE_APP_API_URL + '/share-access/generate-url', {
          jwt,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setUrl(res.data.url)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  const copyUrl = () => {
    // Check if the browser supports the Clipboard API
    if (!navigator.clipboard) {
      console.error('Clipboard API not supported')
      return
    }

    // Check clipboard write permission
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        // Write to the clipboard
        navigator.clipboard.writeText(url)
        toast.success('URL copied to clipboard.')
      }
    })
  }

  return (
    <div className="flex flex-col bg-default border border-zinc-200 rounded-xl">
      {/* Header */}
      <div className="border-b border-zinc-200 py-4 px-6 flex-shrink-0">
        <h2>Share Access</h2>
      </div>

      <div className="py-4 max-lg:py-16 px-6 flex max-lg:flex-col items-center lg:justify-start max-lg:justify-center flex-grow gap-6 max-lg:gap-4">
        {url && (
          <>
            {/* QR Code */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`}
              alt="QR Code for the access URL"
              className="w-32 h-32 p-4"
            />

            <div>
              {/* Description */}
              <span className="text-sm block max-w-sm max-lg:text-center max-lg:mx-auto">
                Share your access URL to share inventory & order access with
                other users or let them scan the QR code.
              </span>

              {/* URL */}
              <div
                className="cursor-copy py-2 text-lighten text-xs lg:whitespace-nowrap overflow-hidden max-lg:mx-auto max-lg:text-center max-lg:mt-2"
                onClick={copyUrl}
              >
                {url}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AccessURL
