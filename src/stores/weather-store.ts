import { defineStore } from 'pinia';
import { fetchWeatherForecast } from '../services/weather-service';
import type { WeatherForecast } from 'components/models';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    forecast: [] as WeatherForecast[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getForecast(city: string) {
      this.loading = true;
      try {
        this.forecast = await fetchWeatherForecast(city);
        this.error = null;
      } catch {
        this.error = 'Failed to fetch weather data';
      } finally {
        this.loading = false;
      }
    },
  },
});