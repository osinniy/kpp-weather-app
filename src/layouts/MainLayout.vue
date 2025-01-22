<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ $t('appTitle') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{ $t('menu') }}
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link"
          :active="link.link ? isActiveLink(link.link) : false" exact />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import Item, { type ItemProps } from 'components/Menu.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink: Item
  },

  setup() {
    const { t } = useI18n();
    const route = useRoute();

    const isActiveLink = (link: string) => {
      return route.path === link;
    };

    return { t, isActiveLink };
  },

  data() {
    const { t } = useI18n();
    const itemsList: ItemProps[] = [
      {
        title: t('mainWeatherPageTitle'),
        caption: t('mainWeatherPageCaption'),
        icon: 'home',
        link: '/'
      },
      {
        title: t('weatherForecastTitle'),
        caption: t('weatherForecastCaption'),
        icon: 'cloud',
        link: '/weather-forecast'
      }
    ];

    return {
      linksList: itemsList,
      leftDrawerOpen: false
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
});
</script>
