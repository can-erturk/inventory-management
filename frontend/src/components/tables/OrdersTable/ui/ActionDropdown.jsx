import {
  FaCircleXmark,
  FaEllipsis,
  FaFloppyDisk,
  FaPenToSquare,
  FaTrash,
} from 'react-icons/fa6'
import { FiEdit3 } from 'react-icons/fi'

function ActionDropdown({ edit, handleEdit, handleDelete, handleCancel }) {
  return (
    <div className="flex justify-end relative">
      {/* Dropdown trigger */}
      <button className="dropdown-button max-md:h-8 max-md:w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full text-lighten md:hover:bg-zinc-200/50 focus:bg-zinc-200/50">
        <FiEdit3 size={14} className="md:hidden" />
        <FaEllipsis size={16} className="max-md:hidden" />
      </button>

      {/* Dropdown Menu */}
      <div className="dropdown-menu right-0 py-1 flex flex-col w-32 bg-default border border-zinc-200 rounded-xl shadow-xl text-sm z-50">
        {!edit ? (
          // If not in edit mode
          <>
            <button className="table-primary-btn" onClick={handleEdit}>
              <FaPenToSquare />
              <span className="mt-px">Edit</span>
            </button>
            <button className="table-danger-btn" onClick={handleDelete}>
              <FaTrash />
              <span className="mt-px">Delete</span>
            </button>
          </>
        ) : (
          // If in edit mode
          <>
            <button className="table-primary-btn" onClick={handleEdit}>
              <FaFloppyDisk />
              <span>Save</span>
            </button>
            <button className="table-danger-btn" onClick={handleCancel}>
              <FaCircleXmark />
              <span>Cancel</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ActionDropdown
