import { IoCartOutline } from 'react-icons/io5'
import { IoCalendarOutline } from 'react-icons/io5'
import { IoKeyOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <NavLink to="/" className="navlink">
        <IoCartOutline size={22} className="inline-block -mt-px" />
        <span>Inventory</span>
      </NavLink>

      <NavLink to="/postdated-products" className="navlink">
        <IoCalendarOutline size={18} className="inline-block -mt-px" />
        <span>Postdated Products</span>
      </NavLink>

      <NavLink to="/share-access" className="navlink">
        <IoKeyOutline size={20} className="inline-block -mt-px" />
        <span>Share Access</span>
      </NavLink>
    </>
  )
}

export default Navigation
