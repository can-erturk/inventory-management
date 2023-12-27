import axios from 'axios'
import logout from './logout'

export default async function checkJwt(jwt) {
  if (!jwt) {
    return false
  }

  const apiURL = import.meta.env.VITE_APP_API_URL

  // Connect to the API and check if the JWT is valid
  const response = await axios.post(apiURL + '/auth/get-credentials', {
    jwt,
  })

  // If the JWT is not valid, remove it from the store
  if (response.data.status !== 200) {
    return logout()
  }

  return true
}
