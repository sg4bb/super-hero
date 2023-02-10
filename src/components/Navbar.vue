<script setup>
import { ref } from "@vue/reactivity";
import NavbarDrawer from "./NavbarDrawer.vue";

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <img
        src="https://www.bigstwincities.org/wp-content/uploads/2017/01/superhero-comic-book-pow.png"
        style="height: 37px; width: 50px"
      />
      <q-toolbar-title class="text-weight-bold">
        Quasar Super-Hero
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>

  <q-drawer show-if-above v-model="rightDrawerOpen" side="right">
    <NavbarDrawer />
  </q-drawer>
</template>
