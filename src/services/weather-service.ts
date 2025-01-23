import type { WeatherForecast } from 'components/models'
import { api } from 'src/boot/axios'

const API_PATH = 'forecast'

interface WeatherResponse {
  list: {
    dt_txt: string
    main: {
      temp: number
    }
    weather: {
      description: string
      icon: string
    }[]
  }[]
}

export async function fetchWeatherForecast(city: string): Promise<WeatherForecast[]> {
  try {
    const response = await api.get<WeatherResponse>(API_PATH, {
      params: {
        q: city,
        units: 'metric',
        appid: process.env.OWM_API_KEY as string,
      },
    })

    return response.data.list.map((item) => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0]?.description ?? '',
      icon: item.weather[0]?.icon ?? '',
    }))
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
