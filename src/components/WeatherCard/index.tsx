import React from 'react'
import { convertKelvinToCelsius, formatDateWithDDMMYYYY } from '@/utils/helper'
import Loading from '@/components/Loading'
import { Weather } from '@/types'

interface CurrentWeatherProps {
  data: Weather | null
}

const WeatherCard: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center">
        {' '}
        <Loading />
      </div>
    )

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-md">
      <div className="mb-2 text-sm font-bold text-gray-500 lg:text-lg xl:text-xl">
        {formatDateWithDDMMYYYY(new Date())}
      </div>

      <div className="mb-4 flex items-center justify-around">
        <img
          src={`${import.meta.env.VITE_WEATHER_ICON_URL}/${data.weather[0].icon}.png`}
          alt="weather icon"
          className="sm:h-16 sm:w-16 lg:h-20 lg:w-20"
        />
        <div className="text-right">
          <div className="text-sm font-bold text-gray-800 md:text-lg lg:text-3xl">
            {convertKelvinToCelsius(data.main.temp)}°C
          </div>
          <div className="text-sm font-semibold text-gray-600 md:text-lg">
            {data.weather[0].description}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
        <div>
          <div>Humidity</div>
          <div className="font-bold">{data.main.humidity}%</div>
        </div>
        <div>
          <div>Wind</div>
          <div className="flex items-center justify-center font-bold">
            <span
              className="ml-2 transform"
              style={{ transform: `rotate(${data.wind.deg}deg)` }}
            >
              &#8593;
            </span>
            <span className="ml-1">{data.wind.speed} m/s</span>
          </div>
        </div>
        <div>
          <div>Visibility</div>
          <div className="font-bold">{data.visibility / 1000} km</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
