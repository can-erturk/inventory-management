import { useOrdersStore } from '@zustand/ordersStore'

export const sortDataByColumn = (data) => {
  // Get the current sort column and direction
  const column = useOrdersStore.getState().sortColumn
  const direction = useOrdersStore.getState().sortDirection

  // Compare function
  const compareFunction = (a, b) => {
    // Get the values of the current column
    const valueA = a[column]
    const valueB = b[column]

    // Compare the values
    switch (column) {
      case 'inStock':
        return direction === 'desc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)

      default:
        return direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
    }
  }

  // Return the sorted data
  return data.slice().sort(compareFunction)
}
