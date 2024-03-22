import { create } from 'zustand'

export const useOrdersStore = create(() => ({
  data: [],
  currentPage: 1,
  itemsPerPage: 10,
  searchTerm: '',
  sortColumn: 'orderDate',
  sortDirection: 'asc',
  addNewItem: false,
  editMode: false,
}))
