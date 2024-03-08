import { FaCartShopping } from 'react-icons/fa6'
import { IoKeyOutline } from 'react-icons/io5'
import { RxCalendar } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <NavLink to="/" className="navlink">
        <FaCartShopping size={18} className="inline-block -mt-px" />
        <span>Inventory</span>
      </NavLink>

      <NavLink to="/postdated-orders" className="navlink">
        <RxCalendar size={18} className="inline-block -mt-px" />
        <span>Postdated Orders</span>
      </NavLink>

      <NavLink to="/share-access" className="navlink">
        <IoKeyOutline size={18} className="inline-block -mt-px" />
        <span>Share Access</span>
      </NavLink>
    </>
  )
}

export default Navigation
