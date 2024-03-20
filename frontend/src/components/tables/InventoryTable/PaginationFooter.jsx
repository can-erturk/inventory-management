import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { useInventoryStore } from '@zustand/inventoryStore'
import classNames from 'classnames'

function PaginationFooter({ totalPages }) {
  const table = useInventoryStore()

  // Helper function to set the page
  const setCurrentPage = (pageNumber) => {
    useInventoryStore.setState({ currentPage: pageNumber })
  }

  // Create disabled attributes for buttons
  const disabledButtons = {
    prev: table.currentPage != 1 ? false : true,
    next: totalPages != table.currentPage ? false : true,
  }

  // Default variables for pagination buttons
  const paginationButtons = []
  const maxButtonsToShow = 5
  let startPage = 1
  let endPage = totalPages

  // Set the buttons to be displayed
  if (totalPages > maxButtonsToShow) {
    const halfButtons = Math.floor(maxButtonsToShow / 2)

    // Set the start and end page
    if (table.currentPage <= halfButtons + 1) {
      endPage = maxButtonsToShow
    } else if (table.currentPage >= totalPages - halfButtons) {
      startPage = totalPages - maxButtonsToShow + 1
    } else {
      startPage = table.currentPage - halfButtons
      endPage = table.currentPage + halfButtons
    }
  }

  // Generate the buttons to be displayed
  for (let page = startPage; page <= endPage; page++) {
    paginationButtons.push({
      page,
      isActive: table.currentPage === page ? 'active' : '',
    })
  }

  // Conditional styles for pagination footer
  const footerStyles = classNames({
    'flex items-center justify-between max-md:justify-end pb-2 md:pt-8': true,
    'pt-8': totalPages > 1,
    'max-md:hidden': totalPages === 1,
  })

  return (
    <nav className={footerStyles} aria-label="Table navigation">
      {/* Rows per page select */}
      <div className="flex gap-2 items-center justify-center max-md:hidden">
        <span className="text-sm text-lighten">Rows per page:</span>
        <select
          className="border border-zinc-200 outline-none text-lighten py-2 pl-2 pr-1 rounded-lg text-sm"
          value={table.itemsPerPage}
          onChange={(e) =>
            useInventoryStore.setState({ itemsPerPage: e.target.value })
          }
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {/* Pagination buttons */}
      <ul className="inline-flex text-sm gap-1">
        {paginationButtons.length > 1 && (
          <>
            {/* Prev button */}
            <li>
              <button
                className="table-pagination-prev"
                onClick={() => setCurrentPage(table.currentPage - 1)}
                disabled={disabledButtons.prev}
              >
                <FaAngleLeft />
              </button>
            </li>

            {/* Page buttons */}
            {paginationButtons.map((button, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(button.page)}
                  className={button.isActive + ' table-pagination-btn'}
                >
                  {button.page}
                </button>
              </li>
            ))}

            {/* Next button */}
            <li>
              <button
                className="table-pagination-next"
                onClick={() => setCurrentPage(table.currentPage + 1)}
                disabled={disabledButtons.next}
              >
                <FaAngleRight />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default PaginationFooter
