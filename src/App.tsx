import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Header from '@/components/Header/index'
import SideBar from '@/components/SideBar'
import '@/App.css'

const Home = lazy(() => import('@/pages/Home'))
const SearchCountryWeather = lazy(() => import('@/pages/SearchCountryWeather'))

function App() {
  return (
    <>
      <SideBar />
      <Header />
      <main className="pb-10">
        <Suspense fallback={<div />}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/search-country-weather"
              element={<SearchCountryWeather />}
            />
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App
