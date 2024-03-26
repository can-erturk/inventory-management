export const tableItemValidation = (item, setItem) => {
  // Check if all the fields are filled
  if (!item.name || !item.category || !item.inStock || !item.orderDate) {
    setItem({
      ...item,
      nameError: !item.name,
      categoryError: !item.category,
      inStockError: !item.inStock,
      orderDateError: new Date(item.orderDate) < new Date(Date.now() + 600000),
    })
    return false
  }

  return true
}
