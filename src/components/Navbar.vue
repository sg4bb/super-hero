<script setup>
import { ref } from '@vue/reactivity';
import NavbarDrawer from './NavbarDrawer.vue';

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Quasar Super-Hero
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>



  <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
    <NavbarDrawer />
  </q-drawer>

</template>
