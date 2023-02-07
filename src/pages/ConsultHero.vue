<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

getHero();

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

const rows = ref([]);
const loading = ref(true);

async function getHero() {
  try {
    const q = query(collection(db, "heroes"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      const rowHero = {
        IdHero: doc.id,
        NombreHero: doc.data().nombre,
        DescHero: doc.data().descripcion
      }
      console.log(rowHero);
      rows.value.push(rowHero);
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <h3 class="text-weight-bolder text-center text-primary">
    Consultar todos los superhéroes
    <q-img
      src="https://i.ibb.co/f2CQhxF/free-png-superman-png-images-transparent-superman-comic-11562850237b7jn3x0usi.png"
      style="width: 5%; height: 5%"
    ></q-img>
  </h3>

  <div class="q-pa-md">
    <q-table
      title="Superhéroes"
      :loading="loading"
      :rows="rows"
      :columns="columns"
      :row-key="rows.IdHero"
      no-data-label="Sin datos"
    />
  </div>
</template>
