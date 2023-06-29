<template>
  <Loader v-if="!data.length"></Loader>
  <div v-else>
    <h2>Ежегодная статистика</h2>
    <v-table>
      <thead>
        <tr>
          <th>год</th>
          <th>потрачено</th>
          <th>дистанция</th>
          <th>количество действий</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableDataState" :key="item.title">
          <td>{{ item?.title }}</td>
          <td>{{ item?.wasted || "-" }}</td>
          <td>{{ item?.distance || "-" }}</td>
          <td>{{ item?.count || "-" }}</td>
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

const filterDataByYear = (year) => {
  if (year === "amount") {
    return props.data;
  } else {
    return props.data.filter((item) => item.date.includes(year));
  }
};

const tableData = [...props.sortingArray, "amount"];
console.log(tableData)
const tableDataState = computed(() =>
  tableData.map((year) => ({
    title: year,
    wasted: `${filterDataByYear(year)
      ?.map(({ work, details }) =>
        work ? +work + +details : details ? +details : 0
      )
      .reduce((a, b) => a + b, 0)} грн`,
    distance: `${
      +filterDataByYear(year)[0].kilometers -
      +filterDataByYear(year).at(-1).kilometers
    } км`,
    count: filterDataByYear(year)?.length,
  }))
);
</script>

<style scoped></style>
