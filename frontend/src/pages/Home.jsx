import Breadcrumbs from '@/components/_common/Breadcrumbs'
import { motion } from 'framer-motion'

function Home() {
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
