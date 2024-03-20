export const tableItemValidation = (item, setItem) => {
  // Check if all the fields are filled
  if (!item.name || !item.category || !item.inStock) {
    setItem({
      ...item,
      nameError: !item.name,
      categoryError: !item.category,
      inStockError: !item.inStock,
    })
    return false
  }

  return true
}
