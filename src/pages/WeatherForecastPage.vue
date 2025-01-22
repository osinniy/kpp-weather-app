<template>
    <q-page class="weather-page">
        <q-input v-model="city" label="Search for a city" @keyup.enter="fetchForecast" outlined clearable />
        <q-btn label="Get Forecast" @click="fetchForecast" color="primary" />

        <q-spinner v-if="weatherStore.loading" />

        <div v-if="weatherStore.error" class="error-message">
            {{ weatherStore.error }}
        </div>

        <div class="forecast-container" v-if="weatherStore.forecast.length">
            <WeatherCard v-for="item in weatherStore.forecast" :key="item.date" :forecast="item" />
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useWeatherStore } from 'stores/weather-store';
import WeatherCard from 'components/WeatherCard.vue';

export default defineComponent({
    name: 'WeatherForecastPage',

    components: {
        WeatherCard,
    },

    setup() {
        const weatherStore = useWeatherStore();
        const city = ref('');

        const fetchForecast = async () => {
            if (city.value.trim()) {
                try {
                    await weatherStore.getForecast(city.value.trim());
                } catch (error) {
                    console.error('Error fetching forecast:', error);
                }
            }
        };

        const setBackgroundColor = (color: string) => {
            document.body.style.backgroundColor = color;
        };

        onMounted(() => {
            setBackgroundColor('white');
        });

        onBeforeUnmount(() => {
            setBackgroundColor('');
        });

        return {
            weatherStore,
            city,
            fetchForecast,
        };
    },
});
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