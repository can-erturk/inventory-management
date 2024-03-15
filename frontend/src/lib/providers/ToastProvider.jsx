import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ToastProvider({ children }) {
  return (
    <>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default ToastProvider
