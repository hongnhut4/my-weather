import { AiOutlineMenu } from 'react-icons/ai'

import HeaderNavItem from '@/components/Header/HeaderNavItem'
import { useGlobalContext } from '@/context/globalContext'
import { navLinks } from '@/constants'
import '@/components/Header/index.scss'
import { WeatherNavLink } from '@/types'

const Header = () => {
  const { setShowSidebar } = useGlobalContext()
  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-slate-500 bg-gradient-to-b py-4 shadow-xl backdrop-blur-md">
      <nav className="mx-auto flex flex-row items-center justify-between px-8">
        <img
          src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
          width={50}
        />
        <div className="hidden flex-row items-center gap-8 md:flex">
          <ul className="flex flex-row gap-8 text-base font-medium capitalize">
            {navLinks?.map((link: WeatherNavLink) => {
              return <HeaderNavItem key={link.title} link={link} />
            })}
          </ul>
        </div>
        <button
          type="button"
          name="menu"
          className="inline-block text-xl text-orange-400 md:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  )
}

export default Header
