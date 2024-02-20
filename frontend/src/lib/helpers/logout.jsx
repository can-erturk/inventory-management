import store from '@/lib/stores/redux'
import { setJWT } from '@/lib/stores/redux/auth'

export default async function logout() {
  // Remove the JWT from the redux store
  store.dispatch(setJWT(null))

  // Remove the JWT from the localStorage and sessionStorage
  localStorage.removeItem('jwt')
  sessionStorage.removeItem('jwt')

  // Redirect the user to the home page
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}
