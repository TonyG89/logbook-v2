<template>
  <Loader v-if="!entity.length"></Loader>
  <div class="border mr-4 pa-2" v-else>
    <h3>{{ title }}</h3>
    <!-- TODO: TABLE  -->
    <v-card class="text-left pa-1">
      <div
        class="d-flex align-center justify-space-between bb pa-2"
        :class="`bg-${color}`"
        v-for="item in entity"
        :key="item"
      >
        <h4>{{ item.title }}</h4>
        <div class="ml-1" v-if="Array.isArray(item.value)">
          <v-chip class="mx-1" v-for="value in item.value" :key="value">{{
            value
          }}</v-chip>
        </div>
        <div class="ml-1" v-else>
          {{ item.value }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import Loader from "./Loader.vue";

defineProps({
  entity: {
    type: Array,
    default: () => [], // [{title: '', value: '' || [''],}]
    required: true,
  },
  title: {
    type: String,
    default: () => "INFORMATIONS",
    required: false,
  },
  color: {
    type: String,
    default: () => "primary",
    required: false,
  },
});
</script>

<style>
.bb {
  border-bottom: 1px dotted rgb(238, 130, 130);
  padding-bottom: 5px;
}
</style>
