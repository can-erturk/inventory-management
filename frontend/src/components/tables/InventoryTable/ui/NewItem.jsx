import formatCurrentDate from '@/lib/helpers/formatCurrentDate'
import formatDate from '@/lib/helpers/formatDate'
import { useState } from 'react'
import { useInventoryStore } from '@zustand/inventoryStore'
import ActionDropdown from './ActionDropdown'
import { newItemValidation } from '../helpers/newItemValidation'
import { createProduct } from '@/lib/helpers/inventory/create'

function NewItem() {
  const { data } = useInventoryStore.getState()
  const [formData, setFormData] = useState({
    name: '',
    nameError: false,
    category: '',
    categoryError: false,
    inStock: '',
    inStockError: false,
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
      lastUpdate: formatCurrentDate(new Date()),
    }

    // Send the new item to the server
    const create = await createProduct(newItem)

    // If the creation was successful, update the global state
    if (create === true) {
      useInventoryStore.setState({
        addNewItem: false,
        data: [...data, newItem],
      })
    }
  }

  // Helper function to cancel the new item creation
  const handleCancel = () => {
    useInventoryStore.setState({ addNewItem: false })
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

        {/* Stock */}
        <td className="table-cell text-right" data-label="Stock">
          <input
            type="number"
            placeholder="Quantity"
            className="table-input md:max-w-[100px]"
            data-error={!formData.inStock && formData.inStockError}
            value={formData.inStock}
            onChange={(e) =>
              setFormData({ ...formData, inStock: e.target.value })
            }
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </td>

        {/* Last update */}
        <td
          className="table-cell text-right text-lighten"
          data-label="Last update"
        >
          {formatDate(new Date())}
        </td>

        {/* Actions */}
        <td className="table-cell pr-6">
          <div className="max-md:justify-start max-md:gap-2 max-md:absolute max-md:right-8 max-md:top-1">
            <ActionDropdown
              edit={true}
              toggleEditMode={handleSave}
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
