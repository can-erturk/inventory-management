import axios from 'axios'
import { toast } from 'react-toastify'

export const updateProduct = async (product_id, updated_product) => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const jwt = localStorage.getItem('jwt')

  try {
    // Connect to the server
    const { data } = await axios.post(API_URL + '/products/update', {
      jwt,
      product_id,
      updated_product,
    })

    // Show status messages and return a boolean
    if (data.status !== 200) {
      toast.error(data.message)
      return false
    } else {
      toast.info(data.message)
      return true
    }
  } catch (error) {
    toast.error(error.message)
    return false
  }
}
