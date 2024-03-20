import { FaSort } from 'react-icons/fa6'

function SortingIcon({ active, direction }) {
  // Conditional rendering based on the sorting key
  if (active) {
    return (
      <span className={direction === 'asc' ? 'asc-icon' : 'desc-icon'}>
        <FaSort className="opacity-50" size={16} />
      </span>
    )
  }

  // Render the sorting icon as default
  return <FaSort className="opacity-30" size={16} />
}

export default SortingIcon
