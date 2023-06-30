<template>
  <Loader v-if="!true"></Loader>
  <div v-else class="rounded border bg-red-lighten-3">
    <h2 class="bg-red-lighten-3 px-3 text-uppercase">Ежегодная статистика</h2>

    <v-table class="mx-1 mb-1">
      <thead>
        <tr class="text-uppercase bg-red-lighten-5">
          <th class="text-left">Наименование</th>
          <th>осталось(км/дата)</th>
          <th>поставил(км/дата)</th>
          <th class="text-right">приблизительно осталось дней</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in entities" :key="item.title">
          <td class="text-left font-weight-medium bg-graded-lighten-3">{{ item.title }}</td>
          <td class="border"><span class="border">xxcx</span>cxzcz</td>
          <td></td>
          <td class="text-right"></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Loader from "./Loader.vue";
import warningTableConfig from "./configs/warningTableConfig";
const entities = warningTableConfig();
console.log(entities);

const tableState=computed(()=>({
  title: 
}))

defineProps({
  entity: {
    type: Array,
    default: () => [], // [{title: '', value: '' || [''],}]
    required: true,
  },
});
</script>

<style></style>
