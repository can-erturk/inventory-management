import Breadcrumbs from '@/components/_common/Breadcrumbs'
import { motion } from 'framer-motion'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'

function Home() {
  useDocumentTitle('Your Products | Inventory Management System')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <Breadcrumbs path={['Your Inventory']} />
      </div>
    </motion.div>
  )
}

export default Home
