import axios from 'axios'

export const readAll = async () => {
  const API_URL = import.meta.env.VITE_APP_API_URL
  const jwt = localStorage.getItem('jwt')

  try {
    const { data } = await axios.post(API_URL + '/orders/get', { jwt })
    return {
      status: data?.status,
      message: data?.message,
      data: data?.data,
    }
  } catch (error) {
    return { status: 500, message: error.message }
  }
}
