import { FaPowerOff, FaXmark } from 'react-icons/fa6'
import Navigation from '@/components/_common/Navigation'
import sidebarToggle from '@/lib/helpers/sidebarToggle'
import logout from '@/lib/helpers/logout'

function Sidebar() {
  return (
    <>
      <aside className="mobile-sidebar">
        {/* Sidebar close */}
        <span className="sidebar-close" onClick={sidebarToggle}>
          <FaXmark size={16} />
        </span>

        {/* Navigation items */}
        <div>
          <Navigation />
        </div>

        {/* Sidebar footer */}
        <footer className="w-full">
          <button
            onClick={logout}
            className="border border-primary !text-primary block w-full text-left px-4 py-3 rounded-lg text-sm"
          >
            <FaPowerOff size={13} className="inline-block -mt-px mr-2" />
            <span>Logout</span>
          </button>
        </footer>
      </aside>

      {/* Mobile sidebar backdrop */}
      <div className="sidebar-backdrop" onClick={sidebarToggle}></div>
    </>
  )
}

export default Sidebar
