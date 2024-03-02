import { create } from 'zustand'

export const useInventoryStore = create(() => ({
  data: [],
  currentPage: 1,
  itemsPerPage: 5,
  searchTerm: '',
  sortColumn: 'lastUpdate',
  sortDirection: 'asc',
  addNewItem: false,
  editMode: false,
}))
