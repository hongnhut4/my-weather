import { HiOutlineHome } from 'react-icons/hi2'
import { SiOpensearch } from 'react-icons/si'
import { WeatherNavLink } from '@/types'

export const navLinks: WeatherNavLink[] = [
  {
    title: 'Home',
    path: '/home',
    icon: HiOutlineHome,
  },
  {
    title: 'Search Country',
    path: '/search-country-weather',
    icon: SiOpensearch,
  },
]
