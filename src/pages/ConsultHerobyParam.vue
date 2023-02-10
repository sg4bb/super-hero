<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { useQuasar } from "quasar";

const text = ref("");
const loading = ref(true);
const rows = ref([]);
const $q = useQuasar();

const columns = [
  {
    name: "IdHero",
    required: true,
    label: "IdHero",
    align: "left",
    field: "IdHero",
    // format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "NombreHero",
    align: "center",
    label: "Nombre",
    field: "NombreHero",
    sortable: true,
  },
  {
    name: "DescHero",
    align: "center",
    label: "Descripción",
    field: "DescHero",
    sortable: false,
  },
];

const consultHerobyParam = () => {
  if (text.value.trim() !== "") {
    async function getHero() {
      try {
        const q = query(collection(db, "heroes"));
        const querySnapshot = await getDocs(q);
        rows.value = []; // Esto para que no se puedan ir almacenando en la tabla, solo una consulta

        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          const rowHero = {
            IdHero: doc.id,
            NombreHero: doc.data().nombre,
            DescHero: doc.data().descripcion,
          };

          if ((rowHero.NombreHero).includes(text.value) == true){
            rows.value.push(rowHero);
          } else {
            console.log('noup');
          }
        });
      } catch (error) {
        $q.notify({
          message: error,
          color: "primary",
          icon: "error",
        });

        text.value = "";
      } finally {
        loading.value = false;
      }
    };

    getHero();
  } else {
    $q.notify({
      message: "No se permiten consultas vacias",
      color: "primary",
      icon: "error",
    });

    text.value = "";
  }
};
</script>

<template>
  <h3 class="text-weight-bolder text-center text-primary">
    Consultar Superhéroe por Parámetro
    <q-img
      src="https://i.ibb.co/x1wt84V/Sin-t-tulo-asda2.png"
      width="80px"
      height="104px"
    ></q-img>
  </h3>

  <q-form
    @submit.prevent="consultHerobyParam"
    class="q-gutter-md"
    @key.enter="consultHerobyParam"
  >
    <div class="row justify-center q-mt-xl q-gutter-sm">
      <div class="col-8 col-md-3">
        <q-input filled v-model="text" label="Ingresa una ID"> </q-input>
      </div>
      <div class="col-2 col-md-1">
        <q-btn
          color="primary"
          label="Buscar"
          type="submit"
          style="height: 56px"
        />
      </div>
    </div>
  </q-form>

  <div class="q-pa-md">
    <q-table
      title="Superhéroe"
      :loading="loading"
      :rows="rows"
      :columns="columns"
      :row-key="rows.IdHero"
      no-data-label="Sin datos"
      loading-label="Esperando por tu consulta"
    />
  </div>
</template>
