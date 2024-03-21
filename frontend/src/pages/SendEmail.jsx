import Preloader from '@/components/_common/Preloader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoAlert } from 'react-icons/io5'
import { FaRegEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function SendEmail() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get the email from the query string
  const email = new URLSearchParams(window.location.search).get('email')

  // If the email is not provided, redirect to the homepage
  if (!email) {
    window.location.href = '/'
  }

  useEffect(() => {
    const apiURL = import.meta.env.VITE_APP_API_URL

    // Send verification mail
    const sendVerificationMail = async () => {
      const response = await axios.get(apiURL + '/verification/send-email', {
        params: {
          email,
        },
      })

      if (response.data.status !== 200) {
        setError(response.data.message)
      }
    }

    // Check if the user exists and email is valid
    const checkEmail = async () => {
      const response = await axios.get(apiURL + '/auth/is-exist', {
        params: {
          email,
        },
      })

      if (response.data.status !== 200) {
        setError(response.data.message)
      } else {
        sendVerificationMail()
      }

      setLoading(false)
    }

    // Check if the email is valid,
    // If it is valid, send the verification mail in this function
    checkEmail()
  }, [email])

  // If the page is loading, show the preloader
  if (loading && !error) {
    return (
      <Preloader className="w-screen h-screen flex items-center justify-center" />
    )
  }

  // If there is an error, show the error message
  if (error && !loading) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-md:max-w-full max-md:!p-0 max-md:bg-default"
        >
          <div className="bg-white max-w-lg w-full mx-auto md:rounded-xl md:shadow-xl p-12 max-md:py-10 max-md:px-6 md:border md:border-zinc-200">
            <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full border-[3px] border-red-400">
              <IoAlert size={32} className="text-red-400" />
            </div>

            <h2 className="text-center text-3xl font-medium mt-6 leading-9 tracking-tight text-red-500">
              {error}
            </h2>

            <div className="mt-6 sm:mx-auto sm:w-full">
              <p className="text-center">
                If you think this is a mistake, please contact with the admin or
                try again later.
              </p>
            </div>

            <div className="flex justify-center mt-5">
              <Link
                to="/register"
                className="inline-block text-primary underline text-sm rounded-xl p-2"
              >
                Go back to register
              </Link>
            </div>
          </div>
        </motion.div>
      </>
    )
  }

  // If there is no error and loading is finished,
  // show the verification page
  if (!loading && !error) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-md:max-w-full max-md:!p-0 max-md:bg-default"
        >
          <div className="bg-white max-w-lg w-full mx-auto md:rounded-xl md:shadow-xl p-12 max-md:py-10 max-md:px-6 md:border md:border-zinc-200">
            <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full border-[3px] border-blue-400 bg-blue-50">
              <FaRegEnvelope size={32} className="text-blue-400" />
            </div>

            <h2 className="text-center text-3xl font-medium mt-6 leading-9 tracking-tight text-blue-500">
              Verification mail sent
            </h2>

            <div className="mt-6 sm:mx-auto sm:w-full">
              <p className="text-center">
                We have sent an email to&nbsp;
                <span className="font-medium underline">{email}</span>
              </p>

              <p className="text-center text-sm mt-6 max-w-xs mx-auto">
                Please check your inbox and click on the link provided to verify
                your email.
              </p>
            </div>
          </div>
        </motion.div>
      </>
    )
  }
}

export default SendEmail
