<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";
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

const consultHero = () => {
  if (text.value.trim() !== "") {
    try {
      const Coleccion = collection(db, "heroes");
      const q = query(Coleccion, where("__name__","==",text.value.trim()));
      rows.value = []; // Esto para que no se puedan ir almacenando en la tabla, solo una consulta

      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const rowHero = {
            IdHero: doc.id,
            NombreHero: doc.data().nombre,
            DescHero: doc.data().descripcion
          }

          rows.value.push(rowHero);
        });

        console.log(rows.value);

        if (rows.value.length !== 0) {
          console.log("no esta vacio");
          console.log(rows.value)
          text.value = "";
        } else {
          console.log("esta vacio el doc");

          $q.notify({
            message: "No se encontraron superheroes",
            color: "primary",
            icon: "error",
          });
          text.value = "";
        }
      });
    } catch (error) {
      $q.notify({
            message: error,
            color: "primary",
            icon: "error",
          });
      text.value = "";
    }finally{
      loading.value = false;
    }

  } else {
    console.log("No se permiten consultas vacias");

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
    (: consultar Superhéroe por ID
    <q-img
      src="https://i.ibb.co/jHXTpXW/106-1068339-cool-batman-png-png-download-comic-batman-transparent.png"
      style="width: 5%; height: 5%"
    ></q-img>
  </h3>

  <q-form
    @submit.prevent="consultHero"
    class="q-gutter-md"
    @key.enter="consultHero"
  >
    <div class="row justify-center q-mt-xl q-gutter-sm">
      <div class="col-9 col-md-3">
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
