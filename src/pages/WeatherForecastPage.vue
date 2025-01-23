<template>
  <q-page class="weather-page">
    <!-- Search input for city -->
    <q-input
      v-model="city"
      :label="$t('searchForCity')"
      @keyup.enter="fetchForecast"
      outlined
      clearable
    />
    <!-- Button to fetch forecast -->
    <q-btn :label="$t('getForecast')" @click="fetchForecast" color="primary" class="q-mt-md" />

    <!-- Loading spinner -->
    <q-spinner v-if="weatherStore.loading" />

    <!-- Error message -->
    <div v-if="weatherStore.error" class="error-message">
      {{ $t('errorMessage') }}
    </div>

    <!-- Forecast cards -->
    <div class="forecast-container" v-if="weatherStore.forecast.length">
      <WeatherCard v-for="item in weatherStore.forecast" :key="item.date" :forecast="item" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useWeatherStore } from 'stores/weather-store'
import WeatherCard from 'components/WeatherCard.vue'

export default defineComponent({
  name: 'WeatherForecastPage',

  components: {
    WeatherCard,
  },

  setup() {
    const weatherStore = useWeatherStore()
    const city = ref('')

    // Fetch weather forecast for the entered city
    const fetchForecast = async () => {
      if (city.value.trim()) {
        try {
          await weatherStore.getForecast(city.value.trim())
        } catch (error) {
          console.error('Error fetching forecast:', error)
        }
      }
    }

    // Set background color
    const setBackgroundColor = (color: string) => {
      document.body.style.backgroundColor = color
    }

    // Set background color to white on mount
    onMounted(() => {
      setBackgroundColor('white')
    })

    // Reset background color on unmount
    onBeforeUnmount(() => {
      setBackgroundColor('')
    })

    return {
      weatherStore,
      city,
      fetchForecast,
    }
  },
})
</script>

<style scoped lang="scss">
.weather-page {
  padding: 20px;
  background-color: white !important;
}

.forecast-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
