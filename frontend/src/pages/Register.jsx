import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const apiURL = import.meta.env.VITE_APP_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post(apiURL + '/auth/register', {
      username,
      email,
      password,
    })

    if (response.data.status !== 200) {
      toast.error(response.data.message)
      return
    }

    return (window.location.href = '/send-email?email=' + email)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-md:max-w-full max-md:!p-0 max-md:bg-default"
      >
        <div className="bg-white max-w-md w-full mx-auto md:rounded-xl md:border md:border-zinc-200 md:shadow-xl p-14 pb-12 max-md:p-10 max-md:pb-12">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-lighten"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-lighten">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl bg-blue-500 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?&nbsp;
              <Link
                to="/"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Register
