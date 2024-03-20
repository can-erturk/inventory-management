import TableItem from './ui/TableItem'
import NewItem from './ui/NewItem'
import classNames from 'classnames'
import { useInventoryStore } from '@zustand/inventoryStore'

function TableContent({ activeItems }) {
  const table = useInventoryStore()

  // Conditional styles for table content
  const tableStyles = classNames({
    'text-sm': true,
    'last-child-hidden':
      table.addNewItem && activeItems?.length >= table.itemsPerPage,
  })

  return (
    <tbody className={tableStyles}>
      {/* Display new item input fields */}
      {table.addNewItem && <NewItem />}

      {/* Display inventory items */}
      {activeItems?.map((item) => (
        <TableItem item={item} key={item.id} />
      ))}

      {/* Display an information, if there is no items */}
      {!activeItems?.length > 0 && !table.addNewItem && (
        <tr>
          <td
            colSpan="6"
            className="text-center py-6 italic opacity-60 font-medium"
          >
            You have no items in your inventory
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default TableContent
