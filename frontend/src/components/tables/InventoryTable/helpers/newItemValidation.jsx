export const newItemValidation = (formData, setFormData) => {
  // Check if all the fields are filled
  if (!formData.name || !formData.category || !formData.inStock) {
    setFormData({
      ...formData,
      nameError: !formData.name,
      categoryError: !formData.category,
      inStockError: !formData.inStock,
    })
    return false
  }

  return true
}
