<template>
  <Loader v-if="!true"></Loader>
  <div v-else class="rounded border bg-red-lighten-3">
    <h2 class="bg-red-lighten-3 px-3 text-uppercase">Maintenance</h2>

    <v-table class="mx-1 mb-1">
      <thead>
        <tr class="text-uppercase bg-red-lighten-5">
          <th class="text-left">Title</th>
          <th>Kilometers left</th>
          <th>Last operation</th>
          <th class="text-right">Days left</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableDataState" :key="item.title">
          <td class="text-left font-weight-medium bg-graded-lighten-3">
            {{ item.title }}
          </td>
          <td class="border">
            <v-tooltip
              class="tooltip"
              v-if="item.hint"
              activator="parent"
              location="top"
              >default limit:{{ numberWithSpace(item.hint) }} km
            </v-tooltip>
            {{ numberWithSpace(item.over) }}
          </td>
          <td>{{ item.didIt }}</td>
          <td class="text-right">{{ item.dayToEnd }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Loader from "./ui/Loader.vue";
import warningTableConfig from "./configs/consumablesTableConfig";
import moment from "moment";
import { numberWithSpace } from "@/helpers/numbers";

const entities = warningTableConfig();

const tableDataState = computed(() =>
  entities.map((item) => {
    const lastAction = props.data?.find((obj) => obj.categories === item.title);

    const averageDistance =
      props.data[0]?.kilometers - props.data.at(-1)?.kilometers;

    const startDate = moment(props.data.at(-1)?.date);
    const lastDate = moment(props.data[0]?.date);
    const daysPassed = lastDate.diff(startDate, "days");
    const supply =
      item.limit - (props.data[0]?.kilometers - lastAction?.kilometers);

    console.log(averageDistance / daysPassed);
    return {
      title: item.title,
      hint: numberWithSpace(item.limit),
      over: typeof item.limit === "string" ? "-" : supply + " км",
      didIt: `${numberWithSpace(lastAction?.kilometers)} км \n  ${moment(
        lastAction?.date
      ).format("D/MM/YY")}`,
      dayToEnd: parseInt(supply / (averageDistance / daysPassed)) + " дней",
    };
  })
);

console.log(props.data.value);
const props = defineProps({
  data: {
    type: Array,
    default: () => [], // [{title: '', value: '' || [''],}]
    required: true,
  },
});
</script>

<style></style>
./configs/consumablesTableConfig
