export interface WeatherNavLink {
  path: string
  title: string
  icon?: IconType
}

interface Wind {
  speed: number
  deg: number
}

interface WeatherMainItem {
  temp: number
  humidity: number
}
interface WeatherInfo {
  description: string
  icon: string
}

interface Weather {
  name?: string
  dt_txt: string
  dt: number
  main: WeatherMainItem
  weather: WeatherInfo[]
  wind: Wind
  visibility: number
  formated_dt_txt: string
}

export interface GroupedWeather {
  [key: string]: Weather[]
}
