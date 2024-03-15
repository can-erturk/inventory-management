import Navigation from '@/components/_common/Navigation'
import HeaderDropdown from '@/components/dropdowns/HeaderDropdown'
import { IoMenu } from 'react-icons/io5'
import sidebarToggle from '@/lib/helpers/sidebarToggle'
import GithubBtn from '@/components/ui/GithubBtn'
import Logo from '@/components/_common/Logo'

function Header() {
  return (
    <>
      {/* Header */}
      <div className="w-full bg-default h-20 max-lg:h-16 max-lg:fixed max-lg:border-b max-lg:border-zinc-200">
        <div className="container h-full flex items-center justify-between">
          <Logo />

          <div className="flex items-center ml-auto gap-2 relative z-[122]">
            {/* Header desktop buttons */}
            <GithubBtn />
            <HeaderDropdown />

            {/* Mobile sidebar toggle button */}
            <button
              className="w-9 h-9 rounded-full hover:bg-zinc-100 lg:hidden"
              onClick={sidebarToggle}
            >
              <IoMenu size={20} className="inline-block -mt-px" />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky navbar */}
      <div className="h-16 border-b border-zinc-200 w-full bg-white z-[120] max-lg:hidden sticky top-0 transition-all duration-300 ease-in-out">
        <div className="container h-full flex items-center gap-6 max-lg:hidden">
          <Navigation />
        </div>
      </div>
    </>
  )
}

export default Header
