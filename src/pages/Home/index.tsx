import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchCurrentWeather,
  fetchForecast,
} from '@/features/weather/weatherSlice'
import CurrentWeather from '@/components/WeatherCard'
import Forecast from '@/components/Forecast'

const Home = () => {
  const dispatch = useAppDispatch()
  const currentWeather = useAppSelector(
    state => state.weatherSlice.currentWeather
  )
  const weatherForecast = useAppSelector(state => state.weatherSlice.forecast)
  const DEFAULT_COUNTRY = 'VietNam'

  useEffect(() => {
    if (!currentWeather) {
      dispatch(fetchCurrentWeather(DEFAULT_COUNTRY))
      dispatch(fetchForecast(DEFAULT_COUNTRY))
    }
  }, [dispatch])

  return (
    <div className="home mt-10 bg-slate-200 p-4 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="py-3 text-xl">Country: {currentWeather?.name}</h1>
        </div>
        <div></div>
      </div>
      <CurrentWeather data={currentWeather} />
      <Forecast data={weatherForecast} />
    </div>
  )
}

export default Home
