import { NavLink } from 'react-router-dom'
import { WeatherNavLink } from '../../types'

interface SidebarNavItemProps {
  link: WeatherNavLink
  closeSideBar: () => void
}

const SidebarNavItem = ({ link, closeSideBar }: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return isActive
            ? 'flex w-full flex-row items-center gap-3 p-2 font-semibold text-orange-400'
            : 'flex w-full flex-row items-center gap-3 p-2 text-orange-200 hover:text-orange-400'
        }}
        onClick={closeSideBar}
      >
        {<link.icon className="text-lg" />}
        <span>{link.title}</span>
      </NavLink>
    </li>
  )
}

export default SidebarNavItem
