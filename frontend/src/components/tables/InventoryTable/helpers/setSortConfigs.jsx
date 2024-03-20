import { useInventoryStore } from '@zustand/inventoryStore'

export const setSortConfigs = (columnName) => {
  useInventoryStore.setState((state) => {
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
