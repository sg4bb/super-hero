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

      <q-item clickable v-ripple to="/consult/id">
        <q-item-section avatar>
          <q-icon name="mdi-identifier" />
        </q-item-section>

        <q-item-section> Consultar por ID </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/consult/param">
        <q-item-section avatar>
          <q-icon name="mdi-format-letter-case" />
        </q-item-section>

        <q-item-section> Consultar por Parámetro </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/edit">
        <q-item-section avatar>
          <q-icon name="mdi-shield-edit" />
        </q-item-section>

        <q-item-section> Modificar </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>

  <q-img
    class="absolute-top"
    src="https://cdn.quasar.dev/img/parallax2.jpg"
    style="height: 150px"
  >
    <div class="absolute-full text-subtitle2 flex flex-center"></div>
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <div class="text-weight-bold">Razvan Stoenescu</div>
      <div>@rstoenescu</div>
    </div>
  </q-img>

  <div class="absolute-bottom bg-transparent q-pb-md">
    <div class="row justify-center">
      <q-btn color="primary">Cerrar sesion</q-btn>
    </div>
  </div>
</template>
