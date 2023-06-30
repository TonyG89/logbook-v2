<template>
  <Loader v-if="!data.length"></Loader>
  <div v-else class="rounded border bg-red-lighten-3 ">
    <h2 class="bg-red-lighten-3 px-3 text-uppercase">Ежегодная статистика</h2>

    <v-table class="mx-1 mb-1">
      <thead>
        <tr class="text-uppercase bg-red-lighten-5 ">
          <th class="text-left">год</th>
          <th>потрачено</th>
          <th >дистанция</th>
          <th class="text-right">количество действий</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableDataState" :key="item.title">
          <td class="text-left font-weight-medium bg-graded-lighten-3">{{ item?.title }}</td>
          <td>{{ item?.wasted || "-" }}</td>
          <td>{{ item?.distance || "-" }}</td>
          <td class="text-right">{{ item?.count || "-" }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Loader from "./Loader.vue";
const props = defineProps({
  data: {
    type: Array, // MAIN DATA
    required: true,
  },
  sortingArray: {
    type: Array, // [2019,2020,2021,2022,2023]
    required: false,
  },
});

const customRow = {
  amount: "Итого",
  average: "Средняя",
};

const filterDataByYear = (year) => {
  switch (year) {
    case "amount":
      return props.data;
    case "average":
      return props.data;
    default:
      return props.data.filter((item) => item.date.includes(year));
  }
};

const tableData = ref([]);

console.log(tableData.value);
const tableDataState = computed(() => {
  tableData.value = [
    ...props.sortingArray,
    // customRow.average,
    "amount",
  ];
  return tableData.value?.map((year) => ({
    title: year,
    wasted: `${filterDataByYear(year)
      ?.map(({ work, details }) =>
        work ? +work + +details : details ? +details : 0
      )
      .reduce((a, b) => a + b, 0)} грн`,
    distance: `${
      +filterDataByYear(year)[0]?.kilometers -
      +filterDataByYear(year).at(-1)?.kilometers
    } км`,
    count: filterDataByYear(year)?.length + " заявок",
  }));
});
</script>

<style >
th,
td {
  text-align: center;
  width: 0%;
}

.bl{
  border-left: 2px dashed black;
}
</style>
