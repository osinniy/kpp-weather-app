<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">{{ forecast.date }}</div>
            <q-img :src="iconUrl" alt="Weather Icon" />
            <div>{{ forecast.temperature }}°C</div>
            <div>{{ forecast.description }}</div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { WeatherForecast } from './models';

export default defineComponent({
    name: 'WeatherCard',

    props: {
        forecast: {
            type: Object as PropType<WeatherForecast>,
            required: true,
        },
    },

    computed: {
        iconUrl(): string {
            return `https://openweathermap.org/img/wn/${this.forecast.icon}@2x.png`;
        },
    },
});
</script>

<style scoped lang="scss">
.q-card {
    max-width: 200px;
    text-align: center;
}
</style>