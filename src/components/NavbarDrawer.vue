<script setup>
</script>

<template>
  <q-scroll-area
    style="
      height: calc(100% - 150px);
      margin-top: 150px;
      border-right: 1px solid #ddd;
    "
  >
    <q-list padding>
      <q-item clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section> Home </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/consult">
        <q-item-section avatar>
          <q-icon name="mdi-text-search" />
        </q-item-section>

        <q-item-section> Consultar </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>

  <q-img
    class="absolute-top"
    src="https://cdn.quasar.dev/img/material.png"
    style="height: 150px"
  >
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <div class="text-weight-bold">Usuario ingresado</div>
      <div class="text-weight-medium">@user</div>
    </div>
  </q-img>
</template>
