import { NavLink } from 'react-router-dom'

function Logo() {
  return (
    <NavLink
      className="flex items-center gap-2 text-xl font-semibold text-primary px-1 py-2"
      to="/"
    >
      <img src="/logo.svg" alt="MERN Products website logo" />
    </NavLink>
  )
}
export default Logo
