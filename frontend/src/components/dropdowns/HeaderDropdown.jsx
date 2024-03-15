import { IoLogOutOutline } from 'react-icons/io5'
import { useState, useRef, useEffect } from 'react'
import logout from '@/lib/helpers/logout'
import { FaUser } from 'react-icons/fa6'

function HeaderDropdown() {
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !buttonRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(!showDropdown)
      }
    }

    if (showDropdown) {
      window.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [showDropdown])

  return (
    <div className="relative">
      <button
        className="w-9 h-9 rounded-full hover:bg-zinc-100 max-lg:hidden flex items-center justify-center text-lighten"
        onClick={() => setShowDropdown(!showDropdown)}
        ref={buttonRef}
      >
        <FaUser size={16} className="inline-block mt-px" />
      </button>

      {showDropdown && (
        <div
          className="absolute -bottom-2 translate-y-full right-0 w-40 py-1 bg-default border border-default rounded-lg shadow-lg text-sm"
          ref={dropdownRef}
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-zinc-100"
            onClick={logout}
          >
            <IoLogOutOutline size={18} className="inline-block -mt-px mr-2" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default HeaderDropdown
