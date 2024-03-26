export const newItemValidation = (formData, setFormData) => {
  // Check if all the fields are filled
  if (
    !formData.name ||
    !formData.category ||
    !formData.inStock ||
    !formData.orderDate
  ) {
    setFormData({
      ...formData,
      nameError: !formData.name,
      categoryError: !formData.category,
      inStockError: !formData.inStock,
      orderDateError:
        new Date(formData.orderDate) < new Date(Date.now() + 600000),
    })
    return false
  }

  return true
}
