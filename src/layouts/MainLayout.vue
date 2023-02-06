<template>
  <q-layout view="hHr lpR fFr">

    <Navbar />

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'

</script>
