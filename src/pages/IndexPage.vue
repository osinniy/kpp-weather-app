<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
      <q-input v-model="search" @keyup.enter="getWeatherBySearch" :placeholder="$t('searchPlaceholder')" dark
        borderless>
        <template v-slot:before>
          <q-icon @click="getLocation" name="my_location" />
        </template>
        <template v-slot:append>
          <q-btn @click="getWeatherBySearch" round dense flat icon="search" />
        </template>
      </q-input>
    </div>

    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">{{ weatherData.name }}</div>
        <div class="text-h6 text-weight-light">
          {{ weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : '' }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ Math.round(weatherData.main.temp) }}</span>
          <span class="text-h4 relative-position degree">&deg;</span>
        </div>
      </div>

      <div class="col text-center">
        <img v-if="weatherData.weather && weatherData.weather[0]"
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`" />
      </div>
    </template>

    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">{{ $t('weatherWidget') }}<br /></div>
        <q-btn @click="getLocation" class="col" flat>
          <q-icon left size="3em" name="my_location" />
          <div>{{ $t('findMyLocation') }}</div>
        </q-btn>
      </div>
    </template>

    <div class="col skyline" />
  </q-page>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number };
}

export default {
  name: "IndexPage",
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const search = ref<string>("");
    const weatherData = ref<WeatherData | null>(null);
    const lat = ref<number | null>(null);
    const lon = ref<number | null>(null);
    const owmApiKey = process.env.OWM_API_KEY as string;

    const getLocation = () => {
      if ($q.platform.is.electron) {
        api
          .get("http://ip-api.com/json/")
          .then((response) => {
            if (response.status == 200) {
              lat.value = response.data.lat;
              lon.value = response.data.lon;
              getWeatherByCoords();
              // console.log(lat.value); 
            } else {
              throw new Error("Bad response status -> " + response.status);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          //console.log("position: ", position); 
          lat.value = position.coords.latitude;
          lon.value = position.coords.longitude;
          getWeatherByCoords();
        });
      }
    };

    const getWeatherByCoords = () => {
      api
        .get(
          `weather?units=metric&appid=${owmApiKey}&lat=${lat.value}&lon=${lon.value}`
        )
        .then((response) => {
          if (response.status == 200) {
            weatherData.value = response.data;
            console.log(weatherData.value);
          } else {
            throw new Error("Bad response status -> " + response.status);
          }
        })
        .catch((error) => {
          console.log("error->" + error);
        });
    };

    const getWeatherBySearch = () => {
      api
        .get(
          `weather?units=metric&appid=${owmApiKey}&q=${search.value}`
        )
        .then((response) => {
          if (response.status == 200) {
            weatherData.value = response.data;
          } else {
            throw new Error("Bad response status -> " + response.status);
          }
        })
        .catch((error) => {
          console.log("error - " + error);
          $q.notify({
            color: 'negative',
            position: 'top',
            message: t('responseError'),
            icon: 'report_problem'
          });
        });
    };

    const bgClass = computed(() => {
      console.log("test");
      if (
        weatherData.value &&
        weatherData.value && weatherData.value.weather[0] && weatherData.value.weather[0].icon.endsWith("n")
      ) {
        return "bg-night";
      } else {
        {
          return "bg-day";
        }
      }
    });

    return { search, weatherData, getLocation, getWeatherBySearch, bgClass, t };
  },
};
</script>

<style lang="sass">
.q-page
  background: linear-gradient(to bottom, #136a8a, #267871) 
  &.bg-night 
    background: linear-gradient(to bottom, #232526, #414345) 
  &.bg-day 
    background: linear-gradient(to bottom, #00b4db, #0083b0) 

.my_image 
  width: 30% 

.degree 
  top: -44px 

.skyline 
  flex: 0 0 100px 
  background: url(../skyline.png) 
  background-size: contain 
  background-position: center bottom 
</style>
