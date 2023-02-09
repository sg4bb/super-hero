<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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
const prompt = ref(false);
const $q = useQuasar();

const idHero = ref("");
const nombreHero = ref("");
const descHero = ref("");

function editHero(IdHero) {
  prompt.value = true;

  try {
    const Coleccion = collection(db, "heroes");
    const q = query(Coleccion, where("__name__", "==", IdHero.trim()));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const rowHero = {
          IdHero: doc.id,
          NombreHero: doc.data().nombre,
          DescHero: doc.data().descripcion,
        };

        idHero.value = rowHero.IdHero;
        nombreHero.value = rowHero.NombreHero;
        descHero.value = rowHero.DescHero;
      });
    });
  } catch (error) {
    $q.notify({
      message: error.message,
      color: "primary",
      icon: "error",
    });
    text.value = "";
  }
}

function modHero() {
  // console.log(idHero.value);
  // console.log(nombreHero.value);
  // console.log(descHero.value);

  if (nombreHero.value.trim() !== "" && descHero.value.trim() !== "") {

    async function updateHero() {
      try {
        const RefHero = doc(db, "heroes", idHero.value);

        await updateDoc(RefHero, {
          nombre: nombreHero.value,
          descripcion: descHero.value
        });

        rows.value = [];
        idHero.value = '';
        nombreHero.value = '';
        descHero.value = '';
        getHero();

        $q.notify({
          message: "Superhéroe modificado correctamente",
          color: "positive",
          icon: "cloud_done",
        });
      } catch (error) {
        console.log(error);
      }
    }
    updateHero();
  } else {
    $q.notify({
      message: "No se permiten datos vacíos",
      color: "primary",
      icon: "error",
    });

    prompt.value = false;
    idHero.value = "";
    nombreHero.value = "";
    descHero.value = "";
  }
}

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
              @click="editHero(props.row.IdHero)"
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

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-primary">
            Datos a editar <q-icon name="mdi-human-edit" />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="modHero" @key.enter="modHero">
            <q-input
              autofocus
              dense
              v-model="nombreHero"
              label="Nombre"
              :rules="[(val) => !!val || 'Ingresa un nombre']"
            />
            <q-input
              autofocus
              dense
              type="textarea"
              v-model="descHero"
              label="Descripción"
              :rules="[(val) => !!val || 'Ingresa una descripcion']"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            type="submit"
            label="Guardar"
            @click="modHero"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
