import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuTrash } from 'react-icons/lu'
import { CiSearch } from 'react-icons/ci'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchCurrentWeather } from '@/features/weather/weatherSlice'
import { fetchForecast } from '@/features/weather/weatherSlice'
import {
  getHistoryFromLocalStorage,
  saveHistoryDataToLocalStorage,
} from '@/utils/helper'

const SearchCountry: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const weatherError = useAppSelector(state => state.weatherSlice.error)
  const [searchInput, setSearchInput] = useState('')
  const [history, setHistory] = useState<string[]>(getHistoryFromLocalStorage())
  const [error, setError] = useState('')
  useEffect(() => {
    if (weatherError) {
      setError(weatherError)
    }
  }, [weatherError])

  const handleSearch = async () => {
    setError('')
    if (searchInput.trim() === '') return

    // check the data input already in search history or not
    if (!history.includes(searchInput)) {
      fetchWeatherInfo(searchInput, false)
    } else {
      setError('Country is already in the search history')
    }
  }

  const fetchWeatherInfo = async (country: string, isFromHistory: boolean) => {
    const currentWeatherAction = await dispatch(fetchCurrentWeather(country))
    const weatherForecastAction = await dispatch(fetchForecast(country))
    if (
      fetchCurrentWeather.fulfilled.match(currentWeatherAction) &&
      fetchForecast.fulfilled.match(weatherForecastAction)
    ) {
      if (!isFromHistory) {
        const updatedHistory = [...history, country]
        setHistory(updatedHistory)
        saveHistoryDataToLocalStorage(updatedHistory)
      }
      navigate('/home')
    }
  }

  const handleDeleteHistory = (country: string) => {
    const updatedHistory = history.filter(item => item !== country)
    setHistory(updatedHistory)
    saveHistoryDataToLocalStorage(updatedHistory)
  }

  const handleEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="mx-auto mt-24 max-w-md">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onKeyUp={handleEnterSearch}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 rounded-l-md border border-gray-300 p-2"
          placeholder="Enter country name"
        />
        <button
          onClick={handleSearch}
          className="rounded-r-md bg-blue-500 p-2 text-white"
        >
          Search
        </button>
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <h2 className="mb-2 text-xl font-bold">Search History</h2>
      {!!history.length && (
        <div className="rounded-lg bg-white p-4 shadow-md">
          <ul className="list-disc pl-5">
            {history.map((country, index) => (
              <li
                key={index}
                className="mb-4 flex cursor-pointer items-center justify-between"
              >
                <div className="flex w-[95%] items-center justify-between rounded-md p-2 hover:bg-gray-50">
                  <a onClick={() => fetchWeatherInfo(country, true)}>
                    {country}
                  </a>
                  <CiSearch
                    onClick={() => fetchWeatherInfo(country, true)}
                    className="text-xl sm:text-2xl md:text-2xl"
                  />
                </div>
                <div className="m-2">
                  <LuTrash
                    onClick={() => handleDeleteHistory(country)}
                    className="text-xl hover:text-red-600 sm:text-2xl md:text-2xl"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchCountry
