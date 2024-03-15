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

      <NavLink to="/postdated-orders" className="navlink">
        <BsCalendarFill size={16} className="inline-block -mt-[2px]" />
        <span>Postdated Orders</span>
      </NavLink>

      <NavLink to="/share-access" className="navlink">
        <FaKey size={16} className="inline-block -mt-px" />
        <span>Share Access</span>
      </NavLink>
    </>
  )
}

export default Navigation
