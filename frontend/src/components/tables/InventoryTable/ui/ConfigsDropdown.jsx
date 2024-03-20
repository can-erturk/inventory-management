import { useInventoryStore } from '@/lib/stores/zustand/inventoryStore'
import { useEffect, useState } from 'react'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

function ConfigsDropdown() {
  const table = useInventoryStore()
  const [searchTerm, setSearchTerm] = useState('')

  // Set the search term with a debounce
  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      useInventoryStore.setState({ searchTerm })
    }, 500)

    return () => clearTimeout(searchDebounce)
  }, [searchTerm])

  // Helper function to set the rows per page
  const setRowsPerPage = (rowsPerPage) => {
    useInventoryStore.setState({ itemsPerPage: rowsPerPage })
  }

  return (
    <div className="md:hidden flex justify-end relative">
      {/* Dropdown trigger */}
      <button className="dropdown-button py-2 px-3 border max-lg:border-zinc-200 lg:border-primary/50 rounded-lg text-sm lg:font-medium flex items-center lg:text-primary max-lg:text-lighten">
        <span>Filters</span>
        <HiOutlineCog6Tooth className="ml-1.5" size={14} />
      </button>

      {/* Dropdown menu */}
      <div className="dropdown-menu -right-px flex overflow-hidden flex-col w-44 bg-default border border-zinc-200 rounded-xl shadow-md text-sm z-50">
        {/* Search input */}
        <input
          type="text"
          className="border-b border-zinc-200 w-full max-w-full py-3 px-4"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Rows per page */}
        <div className="w-full text-left px-4 py-3">
          <span className="material-icons inline-block -mt-px mr-2 text-lighten/80 text-xs mb-1.5">
            Rows Per Page:
          </span>

          {/* Radio button with a loop (5,10,20,50) */}
          {[5, 10, 20, 50].map((rowsPerPage) => (
            <label key={rowsPerPage} className="table-config-radio">
              <input
                type="radio"
                name="rowsPerPage"
                checked={table.itemsPerPage === rowsPerPage}
                onChange={() => setRowsPerPage(rowsPerPage)}
              />
              <span>{rowsPerPage}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConfigsDropdown
