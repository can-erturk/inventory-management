import { useOrdersStore } from '@zustand/ordersStore'

export const setSortConfigs = (columnName) => {
  useOrdersStore.setState((state) => {
    let sortDirection = 'asc'

    if (columnName === state.sortColumn) {
      sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc'
    }

    return {
      sortDirection,
      sortColumn: columnName,
    }
  })
}
