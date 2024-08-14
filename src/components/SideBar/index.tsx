import React, { useCallback } from 'react'

import SidebarNavItem from '@/components/SideBar/SidebarNavItem'
import { useGlobalContext } from '@/context/globalContext'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { navLinks } from '@/constants'
import { WeatherNavLink } from '@/types'

const SideBar: React.FC = () => {
  const { showSidebar, setShowSidebar } = useGlobalContext()

  const closeSideBar = useCallback(() => {
    setShowSidebar(false)
  }, [setShowSidebar])

  const { ref } = useOnClickOutside(closeSideBar)

  return (
    <div>
      {showSidebar && (
        <nav
          ref={ref}
          className="fixed right-0 top-0 z-[25] flex h-full w-[200px] flex-col overflow-y-auto bg-gray-500 p-4 pb-0 shadow-md md:hidden"
        >
          <div className="flex items-center justify-center"></div>

          <div className="flex h-full flex-col p-4 pt-6">
            <ul className="flex flex-col gap-2 text-xs font-medium capitalize">
              {navLinks?.map((link: WeatherNavLink) => {
                return (
                  <SidebarNavItem
                    link={link}
                    closeSideBar={closeSideBar}
                    key={link.path}
                  />
                )
              })}
            </ul>

            <p className="mt-auto text-center text-xs text-orange-400">
              &copy; 2024 by Nhut Le. All right reserved.
            </p>
          </div>
        </nav>
      )}{' '}
    </div>
  )
}

export default SideBar
