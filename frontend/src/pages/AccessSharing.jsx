import Breadcrumbs from '@/components/_common/Breadcrumbs'
import { motion } from 'framer-motion'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import AccessURL from '@/components/sections/AccessURL'
import { useEffect, useState } from 'react'
import SharedAccess from '@/components/sections/SharedAccess'
import ReceivedAccess from '@/components/sections/ReceivedAccess'
import receiveAccess from '@/lib/helpers/receiveAccess'

function ShareAccess() {
  useDocumentTitle('Share access | Inventory Management System')

  const [receivedAccess, setReceivedAccess] = useState({})

  useEffect(() => {
    // Check if an id is present in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    if (id) {
      // Share access with the user
      receiveAccess(id, setReceivedAccess)

      // Clear the URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mb-8">
        <Breadcrumbs path={['Access Sharing']} />

        <div className="flex flex-col gap-4">
          <AccessURL />

          <div className="flex max-lg:flex-col gap-4">
            <SharedAccess />

            <ReceivedAccess
              receivedAccess={receivedAccess}
              setReceivedAccess={setReceivedAccess}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ShareAccess
