import { WeatherNavLink } from '@/types'
import { NavLink } from 'react-router-dom'

interface Props {
  link: WeatherNavLink
}

const HeaderNavItem = ({ link }: Props) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return isActive
            ? 'nav-link active text-orange-400'
            : 'nav-link text-gray-300 hover:text-orange-400'
        }}
        end
      >
        {link.title}
      </NavLink>
    </li>
  )
}

export default HeaderNavItem
