import Navigation from '@/components/_common/Navigation'
import HeaderDropdown from '@/components/dropdowns/HeaderDropdown'
import { IoMenu } from 'react-icons/io5'
import sidebarToggle from '@/lib/helpers/sidebarToggle'

function Header() {
  return (
    <div
      id="header"
      className="h-16 max-lg:h-14 border-b border-zinc-200 w-full text-lighten bg-white z-[120]"
    >
      <div className="container h-full flex justify-between">
        <div className="h-full flex items-center gap-4 max-lg:hidden">
          <Navigation />
        </div>

        <div className="flex items-center ml-auto gap-4">
          <HeaderDropdown />

          <button
            className="w-9 h-9 rounded-full hover:bg-zinc-100 lg:hidden"
            onClick={sidebarToggle}
          >
            <IoMenu size={20} className="inline-block -mt-px" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
