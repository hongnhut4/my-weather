import React from 'react'

import { convertKelvinToCelsius } from '@/utils/helper'
import Loading from '@/components/Loading'
import { GroupedWeather, Weather } from '@/types'

interface ForecastProps {
  data: GroupedWeather | null
}
const Forecast: React.FC<ForecastProps> = ({ data }) => {
  if (!data)
    return (
      <div className="mt-5 flex items-center justify-center">
        <Loading />
      </div>
    )
  return (
    <div className="mx-auto mt-5 max-w-lg">
      <div className="mb-4 text-sm font-semibold text-gray-600 lg:text-lg xl:text-xl">
        5-Day Forecast(3 Hours)
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        {Object.keys(data).map((key: string, index: number) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <div className="text-sm text-gray-600">{key}</div>
            {data[key].map((forecast: Weather) => {
              return (
                <div
                  key={forecast.dt_txt}
                  className="mt-2 flex items-center justify-between gap-2"
                >
                  <div className="w-[15%] text-sm font-bold">
                    {new Date(forecast.dt_txt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <img
                    src={`${import.meta.env.VITE_WEATHER_ICON_URL}/${forecast.weather[0].icon}.png`}
                    alt="weather icon"
                    className="w-[15%] sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                  />
                  <div className="w-[25%] text-center text-lg font-bold text-gray-800">
                    {convertKelvinToCelsius(forecast.main.temp)}
                    °C
                  </div>
                  <div className="w-[40%] whitespace-normal break-words text-center text-sm font-bold text-gray-600 lg:text-lg">
                    {forecast.weather[0].description}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
