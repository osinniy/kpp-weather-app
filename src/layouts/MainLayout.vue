<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header with toolbar -->
    <q-header elevated>
      <q-toolbar>
        <!-- Menu button -->
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <!-- Application title -->
        <q-toolbar-title>
          {{ $t('appTitle') }}
        </q-toolbar-title>

        <!-- Language toggle button -->
        <q-btn flat dense round icon="language" aria-label="Language" @click="toggleLanguage" />
      </q-toolbar>
    </q-header>

    <!-- Drawer with menu items -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{ $t('menu') }}
        </q-item-label>

        <!-- Menu links -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          :active="link.link ? isActiveLink(link.link) : false"
          exact
        />
      </q-list>
    </q-drawer>

    <!-- Page container for routing views -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Item from 'components/Menu.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink: Item,
  },

  setup() {
    const { t, locale } = useI18n()
    const route = useRoute()

    // Check if the link is active
    const isActiveLink = (link: string) => {
      return route.path === link
    }

    // Toggle language between English and Ukrainian
    const toggleLanguage = () => {
      const newLocale = locale.value === 'en-US' ? 'uk' : 'en-US'
      locale.value = newLocale
      localStorage.setItem('user-locale', newLocale)
    }

    // Load saved locale from localStorage on mount
    onMounted(() => {
      const savedLocale = localStorage.getItem('user-locale')
      if (savedLocale) {
        locale.value = savedLocale
      }
    })

    // List of menu links
    const linksList = computed(() => [
      {
        title: t('mainWeatherPageTitle'),
        caption: t('mainWeatherPageCaption'),
        icon: 'home',
        link: '/',
      },
      {
        title: t('weatherForecastTitle'),
        caption: t('weatherForecastCaption'),
        icon: 'cloud',
        link: '/weather-forecast',
      },
    ])

    return { t, isActiveLink, toggleLanguage, linksList }
  },

  data() {
    return {
      leftDrawerOpen: false,
    }
  },

  methods: {
    // Toggle the left drawer
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },
})
</script>
