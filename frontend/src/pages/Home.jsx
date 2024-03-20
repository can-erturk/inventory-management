import Breadcrumbs from '@/components/_common/Breadcrumbs'
import InventoryTable from '@/components/tables/InventoryTable/index'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import { readAll } from '@/lib/helpers/inventory/readAll'
import { toast } from 'react-toastify'

function Home() {
  useDocumentTitle('Your Products | Inventory Management System')

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    // Fetch all products from the server
    ;(async () => {
      const products = await readAll()

      // Show status messages and return if there's an error
      if (products.status !== 404 && products.status !== 200) {
        toast.error(products.message)
        return
      }

      // Set the table data
      setTableData(products?.data)
    })()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <Breadcrumbs path={['Your Inventory']} />
        <InventoryTable data={tableData} />
      </div>
    </motion.div>
  )
}

export default Home
