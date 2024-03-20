import formatDate from '@/lib/helpers/formatDate'
import { useEffect, useState } from 'react'
import { useInventoryStore } from '@zustand/inventoryStore'
import ActionDropdown from './ActionDropdown'
import { tableItemValidation } from '../helpers/tableItemValidation'
import { updateProduct } from '@/lib/helpers/inventory/update'
import { deleteProduct } from '@/lib/helpers/inventory/delete'

function TableItem({ item }) {
  const table = useInventoryStore()
  const [edit, setEdit] = useState(false)

  // Local state for the item being manipulated
  const [manipulatedItem, setManipulatedItem] = useState({
    ...item,
    nameError: false,
    categoryError: false,
    inStockError: false,
  })

  // Edit mode handler
  const handleEdit = async () => {
    if (edit) {
      if (!tableItemValidation(manipulatedItem, setManipulatedItem)) return

      // Send the updated item to the server
      const update = await updateProduct(item.id, manipulatedItem)

      // If the update was successful, update the global state
      if (update === true) {
        useInventoryStore.setState({
          data: table.data.map((i) => (i.id === item.id ? manipulatedItem : i)),
        })
      }
    }

    setEdit(!edit)
  }

  const handleDelete = async () => {
    // Send the delete request to the server
    await deleteProduct(item.id)

    // Delete the item from the global state
    useInventoryStore.setState({
      data: table.data.filter((i) => i.id !== item.id),
    })
  }

  // Reset the item to its original state
  const handleCancel = () => {
    setEdit(false)
    setManipulatedItem(item)
  }

  // Close the edit mode when the local state changes
  useEffect(() => {
    useInventoryStore.setState({
      addNewItem: false,
      editMode: edit,
    })
  }, [edit])

  return (
    <tr className="table-row group">
      {/* Product name */}
      <td className="table-cell w-full lg:pl-6" data-label="Name">
        {edit ? (
          <input
            type="text"
            placeholder="Product name"
            className="table-input w-full"
            data-error={!manipulatedItem.name && manipulatedItem.nameError}
            value={manipulatedItem.name}
            onChange={(e) =>
              setManipulatedItem({ ...manipulatedItem, name: e.target.value })
            }
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          />
        ) : (
          item.name
        )}
      </td>

      {/* Category */}
      <td className="table-cell text-right" data-label="Category">
        {edit ? (
          <input
            type="text"
            placeholder="Category"
            className="table-input md:max-w-[130px]"
            data-error={
              !manipulatedItem.category && manipulatedItem.categoryError
            }
            value={manipulatedItem.category}
            onChange={(e) =>
              setManipulatedItem({
                ...manipulatedItem,
                category: e.target.value,
              })
            }
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          />
        ) : (
          item.category
        )}
      </td>

      {/* Quantity */}
      <td className="table-cell text-right" data-label="Quantity">
        {edit ? (
          <input
            type="number"
            placeholder="Quantity"
            className="table-input md:max-w-[100px]"
            data-error={
              !manipulatedItem.inStock && manipulatedItem.inStockError
            }
            value={manipulatedItem.inStock}
            onChange={(e) =>
              setManipulatedItem({
                ...manipulatedItem,
                inStock: e.target.value,
              })
            }
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          />
        ) : (
          item.inStock
        )}
      </td>

      {/* Last Update */}
      <td className="table-cell text-right" data-label="Last Update">
        {formatDate(item.lastUpdate)}
      </td>

      {/* Actions */}
      <td className="table-cell lg:pr-6 max-md:pt-6 max-md:absolute">
        <div className="max-md:justify-start max-md:gap-2 max-md:absolute max-md:right-8 max-md:top-1">
          <ActionDropdown
            edit={edit}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          />
        </div>
      </td>
    </tr>
  )
}

export default TableItem
