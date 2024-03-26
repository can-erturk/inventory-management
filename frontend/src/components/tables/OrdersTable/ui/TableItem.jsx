import formatDate from '@/lib/helpers/formatDate'
import { useEffect, useState } from 'react'
import { useOrdersStore } from '@zustand/ordersStore'
import ActionDropdown from './ActionDropdown'
import { tableItemValidation } from '../helpers/tableItemValidation'
import { updateProduct } from '@/lib/helpers/orders/update'
import { deleteProduct } from '@/lib/helpers/orders/delete'
import { CiCalendarDate } from 'react-icons/ci'
import DatepickerModal from '@/components/modals/DatepickerModal'
import QuantityInput from './QuantityInput'

function TableItem({ item }) {
  const table = useOrdersStore()
  const [edit, setEdit] = useState(false)
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)

  // Local state for the item being manipulated
  const [manipulatedItem, setManipulatedItem] = useState({
    ...item,
    nameError: false,
    categoryError: false,
    inStockError: false,
    orderDateError: false,
  })

  // Edit mode handler
  const handleEdit = async () => {
    if (edit) {
      if (!tableItemValidation(manipulatedItem, setManipulatedItem)) return

      // Send the updated item to the server
      const update = await updateProduct(item.id, manipulatedItem)

      // If the update was successful, update the global state
      if (update === true) {
        useOrdersStore.setState({
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
    useOrdersStore.setState({
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
    useOrdersStore.setState({
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
          <QuantityInput
            data={manipulatedItem}
            setData={setManipulatedItem}
            saveForm={handleEdit}
            data-error={
              !manipulatedItem.inStock && manipulatedItem.inStockError
            }
          />
        ) : (
          item.inStock
        )}
      </td>

      {/* Order date */}
      <td
        className="table-cell text-right w-max whitespace-nowrap"
        data-label="Order date"
      >
        {edit ? (
          <>
            <div
              className="table-input cursor-pointer flex gap-3 items-center select-none"
              onClick={() => setIsDatepickerOpen(true)}
              data-error={
                new Date(manipulatedItem.orderDate) <
                new Date(Date.now() + 600000)
              }
            >
              <span className="text-lighten">
                {formatDate(manipulatedItem.orderDate, true)}
              </span>
              <span>
                <CiCalendarDate />
              </span>
            </div>

            <DatepickerModal
              isOpen={isDatepickerOpen}
              setIsOpen={setIsDatepickerOpen}
              defaultValue={new Date(manipulatedItem.orderDate)}
              onChange={(date) =>
                setManipulatedItem({
                  ...manipulatedItem,
                  orderDate: date,
                })
              }
            />
          </>
        ) : (
          formatDate(item.orderDate, true)
        )}
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
