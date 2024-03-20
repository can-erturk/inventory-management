import { useInventoryStore } from '@zustand/inventoryStore'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import ConfigsDropdown from './ui/ConfigsDropdown'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa6'

function SectionHeader() {
  const table = useInventoryStore()
  const [searchTerm, setSearchTerm] = useState('')

  // Helper function to adding a new item
  const addNewItem = () => {
    if (!table.addNewItem) {
      useInventoryStore.setState({ currentPage: 1, addNewItem: true })
    }
  }

  // Debounce search term
  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      useInventoryStore.setState({ searchTerm })
    }, 500)

    return () => clearTimeout(searchDebounce)
  }, [searchTerm])

  // Conditional styles for add new button
  const addBtnStyles = classNames({
    'py-2 px-3 border max-lg:border-zinc-200 lg:border-primary/50 rounded-lg text-sm lg:font-medium flex items-center lg:text-primary max-lg:text-lighten': true,
    'pointer-events-none opacity-50 select-none': table.addNewItem,
  })

  return (
    <div className="pb-6 flex items-center justify-between">
      {/* Searchbox */}
      <div className="flex flex-col gap-2 max-md:hidden relative">
        {!searchTerm && (
          <div className="absolute top-1/2 -translate-y-1/2 left-3 flex gap-[3px] text-lighten items-center select-none text-sm">
            <AiOutlineSearch className="mt-px opacity-80" />
            <span className="opacity-70">Search...</span>
          </div>
        )}

        <input
          type="text"
          className="border border-zinc-200 outline-none text-lighten py-2 px-3 rounded-lg text-sm w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add new button */}
      <button className={addBtnStyles} onClick={addNewItem}>
        <FaPlus className="mr-1.5" size={10} />
        <span>Add new</span>
      </button>

      {/* Configs dropdown for mobile */}
      <ConfigsDropdown />
    </div>
  )
}

export default SectionHeader
