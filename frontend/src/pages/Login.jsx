import axios from 'axios'
import { useState } from 'react'
import DOMPurify from 'dompurify'
import { useDispatch } from 'react-redux'
import { setJWT } from '@redux/auth'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [formError, setFormError] = useState(null)
  const [rememberCheckbox, setRememberCheckbox] = useState(true)

  const dispatch = useDispatch()
  const apiURL = import.meta.env.VITE_APP_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = e.target.user.value
    const password = e.target.password.value

    const response = await axios.post(apiURL + '/auth/login', {
      user,
      password,
    })

    // If the user is not verified
    if (response.data.status !== 200 && response.data.type === 'not-verified') {
      const { email } = response.data.data
      const emailAddress = DOMPurify.sanitize(email)

      const verificationLink = document.createElement('a')
      verificationLink.href = '/send-email?email=' + emailAddress
      verificationLink.style.textDecoration = 'underline'
      verificationLink.innerText = 'Verify your email'

      // Generate the error message
      let message = response.data.message
      message += '<br/>' + verificationLink.outerHTML

      return setFormError(message)
    }

    if (response.data.status === 200) {
      dispatch(setJWT(response.data.jwt))

      // Show a toast message
      toast.success('You have been logged in.')

      // If the user wants to remember the login, save the JWT to localStorage.
      // Otherwise, save the JWT to sessionStorage
      if (rememberCheckbox) {
        localStorage.setItem('jwt', response.data.jwt)
      } else {
        sessionStorage.setItem('jwt', response.data.jwt)
      }

      return setFormError(null)
    } else {
      return setFormError(response.data.message)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div className="bg-white max-w-md w-full mx-auto rounded-lg shadow-xl p-14 pb-16">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>

          {formError && (
            <div className="mt-6 text-center text-sm text-gray-500">
              <div
                className="p-3 font-medium border border-red-200 rounded-md bg-red-50 text-red-400"
                dangerouslySetInnerHTML={{ __html: formError }}
              ></div>
            </div>
          )}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="user" className="block text-sm text-lighten">
                  Email or Username
                </label>
                <div className="mt-2">
                  <input
                    id="user"
                    name="user"
                    type="text"
                    required
                    className="block w-full rounded-md border p-3 outline-none text-gray-900 shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-lighten"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-checkbox"
                  type="checkbox"
                  className="absolute rounded"
                  checked={rememberCheckbox}
                  onChange={() => setRememberCheckbox(!rememberCheckbox)}
                />
                <label
                  htmlFor="remember-checkbox"
                  className="p-1 pl-4 text-xs text-lighten "
                >
                  Remember me
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?&nbsp;
              <Link
                to="/register"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
              >
                Signup now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Login
