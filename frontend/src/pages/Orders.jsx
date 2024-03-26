import Breadcrumbs from '@/components/_common/Breadcrumbs'
import OrdersTable from '@/components/tables/OrdersTable/index'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import { readAll } from '@/lib/helpers/orders/readAll'
import { toast } from 'react-toastify'

function Orders() {
  useDocumentTitle('Scheduled Orders | Inventory Management System')

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    // Fetch all products from the server
    ;(async () => {
      const orders = await readAll()

      // Show status messages and return if there's an error
      if (orders.status !== 404 && orders.status !== 200) {
        toast.error(orders.message)
        return
      }

      // Set the table data
      if (orders?.data) {
        setTableData(orders.data)
      }
    })()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <Breadcrumbs path={['Postdated Orders']} />
        <OrdersTable data={tableData} />
      </div>
    </motion.div>
  )
}

export default Orders
