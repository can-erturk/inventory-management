import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { motion } from 'framer-motion'

function LayoutProvider({ children }) {
  return (
    <>
      <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
        <Header />

        <main id="content">{children}</main>

        <Footer />
        <Sidebar />
      </motion.div>
    </>
  )
}

export default LayoutProvider
