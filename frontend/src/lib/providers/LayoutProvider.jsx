import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { motion } from 'framer-motion'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function LayoutProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
        <Header />

        <main id="content">{children}</main>

        <Footer />
        <Sidebar />
      </motion.div>
    </LocalizationProvider>
  )
}

export default LayoutProvider
