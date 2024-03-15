import store from '@redux'
import { setJWT } from '@redux/auth'
import { toast } from 'react-toastify'

export default async function logout() {
  // Show a toast message
  toast.info('You have been logged out.')

  // Remove the JWT from the redux store
  store.dispatch(setJWT(null))

  // Remove the JWT from the localStorage and sessionStorage
  localStorage.removeItem('jwt')
  sessionStorage.removeItem('jwt')

  // Redirect the user to the home page
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    window.location.href = '/'
  }
}
