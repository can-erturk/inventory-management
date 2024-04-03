import { BsCalendarFill } from 'react-icons/bs'
import { FaCartShopping, FaKey } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <NavLink to="/" className="navlink">
        <FaCartShopping size={18} className="inline-block -mt-px" />
        <span>Inventory</span>
      </NavLink>

      <NavLink to="/scheduled-orders" className="navlink">
        <BsCalendarFill size={16} className="inline-block -mt-[2px]" />
        <span>Scheduled Orders</span>
      </NavLink>

      <NavLink to="/access-sharing" className="navlink">
        <FaKey size={16} className="inline-block -mt-px" />
        <span>Access Sharing</span>
      </NavLink>
    </>
  )
}

export default Navigation
