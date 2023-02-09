<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { useQuasar } from "quasar";

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
const $q = useQuasar();

function confirmDelete(IdHero) {
  $q.dialog({
    title: "Borrar superhéroe",
    message: "¿Estás seguro de querer eliminarlo?",
    cancel: true,
  })
    .onOk(async () => {
      console.log(IdHero);
      try {
        await deleteDoc(doc(db, "heroes", IdHero.trim()));

        rows.value = [];
        getHero();

        $q.notify({
          message: "Superhéroe eliminado correctamente",
          color: "positive",
          icon: "cloud_done",
        });
      } catch (error) {
        console.log(error);
        $q.notify({
          message: error.message,
          color: "primary",
          icon: "error",
        });
      }
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}

async function getHero() {
  try {
    const q = query(collection(db, "heroes"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      const rowHero = {
        IdHero: doc.id,
        NombreHero: doc.data().nombre,
        DescHero: doc.data().descripcion,
      };
      console.log(rowHero);
      rows.value.push(rowHero);
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <h3 class="text-weight-bolder text-center text-primary">
    Modifica los superhéroes existentes
    <q-img
      src="https://i.ibb.co/f2CQhxF/free-png-superman-png-images-transparent-superman-comic-11562850237b7jn3x0usi.png"
      style="width: 5%; height: 5%"
    ></q-img>
  </h3>

  <div class="q-pa-md">
    <q-table
      title="Superhéroes"
      :rows="rows"
      :columns="columns"
      :row-key="rows.IdHero"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width class="q-gutter-sm">
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click=""
              icon="edit_note"
            />
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click="confirmDelete(props.row.IdHero)"
              icon="delete"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
