import { GroupedWeather, Weather } from '@/types'
import { formatDateWithDDMM } from '@/utils/helper'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const weatherAPIKey = import.meta.env.VITE_WEATHER_KEY
const baseURL = import.meta.env.VITE_BASE_URL

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (location: string) => {
    const response = await axios.get(`${baseURL}/forecast`, {
      params: { q: location, appId: weatherAPIKey },
    })

    const handledDateInData = response.data?.list?.map((data: Weather) => {
      return {
        ...data,
        formated_dt_txt: formatDateWithDDMM(new Date(data.dt_txt)),
      }
    })
    // group the weather item by date
    const groupedWeatherDate = handledDateInData?.reduce(
      (acc: GroupedWeather, item: Weather) => {
        const { formated_dt_txt } = item

        if (!acc[formated_dt_txt]) {
          acc[formated_dt_txt] = []
        }

        acc[formated_dt_txt].push({
          dt_txt: item.dt_txt,
          dt: item.dt,
          main: item.main,
          weather: item.weather,
          wind: item.wind,
          visibility: item.visibility,
          formated_dt_txt,
        })

        return acc
      },
      {} as Record<string, GroupedWeather>
    )
    return groupedWeatherDate
  }
)

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (location: string) => {
    const response = await axios.get(`${baseURL}/weather`, {
      params: { q: location, appId: weatherAPIKey },
    })
    return response.data
  }
)

const forecastSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null as Weather | null,
    forecast: null as GroupedWeather | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchForecast.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false
        state.forecast = action.payload
      })
      .addCase(fetchForecast.rejected, state => {
        state.loading = false
        state.error = 'Invalid country or city'
      })
      .addCase(fetchCurrentWeather.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false
        state.currentWeather = action.payload
      })
      .addCase(fetchCurrentWeather.rejected, state => {
        state.loading = false
        state.error = 'Invalid country or city'
      })
  },
})

export default forecastSlice.reducer
