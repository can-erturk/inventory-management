import { useEffect, useMemo } from 'react'
import SortingHeader from './SortingHeader'
import PaginationFooter from './PaginationFooter'
import TableContent from './TableContent'
import SectionHeader from './SectionHeader'
import { useOrdersStore } from '@zustand/ordersStore'
import { sortDataByColumn } from './helpers/sortDataByColumn'

function OrdersTable({ data }) {
  const table = useOrdersStore()

  useEffect(() => {
    useOrdersStore.setState({ data })
  }, [data])

  // Filter data by search term
  const filteredData = useMemo(() => {
    return table.data.filter(
      (item) =>
        item.name.toLowerCase().includes(table.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(table.searchTerm.toLowerCase()),
    )
  }, [table.data, table.searchTerm])

  // Sort filtered data by column and direction
  const sortedData = useMemo(() => {
    return sortDataByColumn(filteredData)
  }, [filteredData, table.sortColumn, table.sortDirection])

  // Get current items index
  const indexOfLastItem = table.currentPage * table.itemsPerPage
  const indexOfFirstItem = indexOfLastItem - table.itemsPerPage

  // Get current page items and total pages
  const activeItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / table.itemsPerPage)

  return (
    <div className="relative my-6 bg-white p-6 max-md:p-4 border border-zinc-200 rounded-xl overflow-visible ">
      <SectionHeader />

      <div className="md:rounded-xl md:border md:border-zinc-200">
        <table className="w-full text-left">
          <SortingHeader />
          <TableContent activeItems={activeItems} />
        </table>
      </div>

      <PaginationFooter totalPages={totalPages} />
    </div>
  )
}

export default OrdersTable
