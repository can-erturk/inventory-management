import Preloader from '@/components/_common/Preloader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoAlert } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa6'

function VerifyEmail() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get the email from the query string
  const key = new URLSearchParams(window.location.search).get('key')

  // If the email is not provided, redirect to the homepage
  if (!key) {
    window.location.href = '/'
  }

  useEffect(() => {
    const apiURL = import.meta.env.VITE_APP_API_URL

    const verifyEmailAddress = async () => {
      const response = await axios.get(apiURL + '/verification/verify-email', {
        params: {
          key,
        },
      })

      if (response.data.status !== 200) {
        setInfo(response.data.message)
      }

      setLoading(false)
    }

    // Check if the email is valid,
    // If it is valid, send the verification mail in this function
    verifyEmailAddress()
  }, [key])

  // If the page is loading, show the preloader
  if (loading && !info) {
    return (
      <Preloader className="w-screen h-screen flex items-center justify-center" />
    )
  }

  // If there is an info, show the info message
  if (info && !loading) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="bg-white max-w-lg w-full mx-auto rounded-lg shadow-xl p-10 pb-12">
            <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full border-[3px] border-blue-400 bg-blue-50">
              <IoAlert size={32} className="text-blue-400" />
            </div>

            <h2 className="text-center text-3xl font-medium mt-6 leading-9 tracking-tight text-blue-500">
              {info}
            </h2>

            <div className="mt-6 sm:mx-auto sm:w-full">
              <p className="text-center">
                This is an information message. You can login to your account if
                you have already verified your email address.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/"
                className="max-w-max mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-2 md:text-base md:px-6"
              >
                Go to homepage
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  // If there is no info and loading is finished,
  // show the verification page
  if (!loading && !info) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="bg-white max-w-lg w-full mx-auto rounded-lg shadow-xl p-10 pb-12">
            <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full border-[3px] border-green-500 bg-green-50">
              <FaCheck size={32} className="text-green-500" />
            </div>

            <h2 className="text-center text-3xl font-medium mt-6 leading-9 tracking-tight text-green-600">
              Successfully verified
            </h2>

            <div className="mt-6 sm:mx-auto sm:w-full">
              <p className="text-center">
                Your email address has been successfully verified. You can now
                login to your account.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/"
                className="max-w-max mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-2 md:text-base md:px-6"
              >
                Login now
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default VerifyEmail
