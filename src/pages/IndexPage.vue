<script setup>
import { ref } from "vue";

const expanded = ref(false);
</script>


<template>
  <q-page class="flex flex-center" padding>
    <div class="row q-gutter-sm">
      <div class="col-12 col-md-6">
        <q-card class="my-card">
          <q-img src="https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2020/05/Los-Mejores-Superhe%CC%81roes-De-La-Historia-Del-Mundo.jpg?resize=1080%2C609&quality=80&ssl=1" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">Cafe Basilico</div>
              <div
                class="
                  col-auto
                  text-grey text-caption
                  q-pt-md
                  row
                  no-wrap
                  items-center
                "
              >
                <q-icon name="place" />
                250 ft
              </div>
            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">$・Italian, Cafe</div>
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary"> Reserve </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-5">
        <q-card class="my-card" flat bordered>
          <q-img src="https://images.ecestaticos.com/VsUNbZZAGtFVYciYJr9OpGtMQ9A=/0x0:2034x1473/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fb54%2Fbcc%2F18f%2Fb54bcc18fe2d01c9500f87f35fa741c6.jpg" />

          <q-card-section>
            <div class="text-overline text-orange-9">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn flat color="dark" label="Share" />
            <q-btn flat color="primary" label="Book" />

            <q-space />

            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                <p>Idk expanded</p>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-img class="col" src="https://dam.smashmexico.com.mx/wp-content/uploads/2018/09/07142333/spidermanbio_portada-770x513.jpg" />

            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="accent" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="my-card">
          <q-parallax
            src="https://4.bp.blogspot.com/-rIntBZpcWAI/XB0FYm0FhNI/AAAAAAABtvg/cWXZS5u8_HwAeMPHKgXQoQDsJ0m5fRpYwCEwYBhgL/s1600/aquaman-origen-poderes.jpg"
            :height="150"
          />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4"></div>
    </div>
  </q-page>
</template>

