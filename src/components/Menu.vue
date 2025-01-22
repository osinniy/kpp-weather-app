<template>
  <q-item :active="active" clickable tag="router-link" :to="link" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QItem, QItemSection, QItemLabel, QIcon } from 'quasar';

export interface ItemProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  active?: boolean;
};

export default defineComponent({
  name: 'EssentialLink',
  components: {
    QItem,
    QItemSection,
    QItemLabel,
    QIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    active: {
      type: Boolean,
      default: false
    }
  }
});
</script>
