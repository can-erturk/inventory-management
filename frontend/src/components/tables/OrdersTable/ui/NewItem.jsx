import formatDate from '@/lib/helpers/formatDate'
import { useState } from 'react'
import { useOrdersStore } from '@zustand/ordersStore'
import ActionDropdown from './ActionDropdown'
import { newItemValidation } from '../helpers/newItemValidation'
import { createProduct } from '@/lib/helpers/orders/create'
import DatepickerModal from '@/components/modals/DatepickerModal'
import { CiCalendarDate } from 'react-icons/ci'
import QuantityInput from './QuantityInput'
import dayjs from 'dayjs'

function NewItem() {
  const { data } = useOrdersStore.getState()
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [formData, setFormData] = useState({
    name: '',
    nameError: false,
    category: '',
    categoryError: false,
    inStock: '',
    inStockError: false,
    orderDate: tomorrow.toISOString(),
    orderDateError: false,
  })

  // Helper function to create a new product
  const handleSave = async () => {
    if (!newItemValidation(formData, setFormData)) return

    // Create an object with the current values
    const newItem = {
      id: Math.floor(Math.random() * 100000000),
      name: formData.name,
      category: formData.category,
      inStock: formData.inStock,
      orderDate: formData.orderDate,
    }

    // Send the new item to the server
    const create = await createProduct(newItem)

    // If the creation was successful, update the global state
    if (create === true) {
      useOrdersStore.setState({
        addNewItem: false,
        data: [...data, newItem],
      })
    }
  }

  // Helper function to cancel the new item creation
  const handleCancel = () => {
    useOrdersStore.setState({ addNewItem: false })
  }

  return (
    <>
      <tr className="table-row group pr-5">
        {/* Product name */}
        <td
          className="table-cell font-medium lg:pl-6 w-full"
          data-label="Product name"
        >
          <input
            type="text"
            placeholder="Product name"
            className="table-input w-full"
            data-error={!formData.name && formData.nameError}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </td>

        {/* Category */}
        <td className="table-cell text-right" data-label="Category">
          <input
            type="text"
            placeholder="Category"
            className="table-input md:max-w-[130px]"
            data-error={!formData.category && formData.categoryError}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </td>

        {/* Quantity */}
        <td className="table-cell text-right" data-label="Quantity">
          <QuantityInput
            data={formData}
            setData={setFormData}
            saveForm={handleSave}
            data-error={
              (!formData.inStock && formData.inStockError) ||
              formData.inStock === '+' ||
              formData.inStock === '-'
            }
          />
        </td>

        {/* Order date */}
        <td
          className="table-cell text-right w-max whitespace-nowrap"
          data-label="Order date"
        >
          <div
            className="table-input cursor-pointer flex gap-3 items-center select-none"
            onClick={() => setIsDatepickerOpen(true)}
            // Check if the order date is in the future (min 10 minutes from now)
            data-error={
              new Date(formData.orderDate) < new Date(Date.now() + 600000)
            }
          >
            <span className="text-lighten">
              {formatDate(formData.orderDate, true)}
            </span>
            <span>
              <CiCalendarDate />
            </span>
          </div>

          <DatepickerModal
            isOpen={isDatepickerOpen}
            setIsOpen={setIsDatepickerOpen}
            defaultValue={new Date(formData.orderDate)}
            onChange={(date) => {
              const dayjsDate = dayjs(date)
              const jsDate = dayjsDate.toDate()
              const isoDate = jsDate.toISOString()

              setFormData({ ...formData, orderDate: isoDate })
            }}
          />
        </td>

        {/* Actions */}
        <td className="table-cell pr-6">
          <div className="max-md:justify-start max-md:gap-2 max-md:absolute max-md:right-8 max-md:top-1">
            <ActionDropdown
              edit={true}
              handleEdit={handleSave}
              handleDelete={handleCancel}
              handleCancel={handleCancel}
            />
          </div>
        </td>
      </tr>
    </>
  )
}

export default NewItem
