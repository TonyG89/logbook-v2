<template>
  <div class="d-flex flex-column wrapper bg-lime-lighten-2">
    <v-chip-group selected-class="text-secondary">
      <v-chip
        v-for="item in statusFilter"
        :key="item"
        @click="changeFilterStatus(item)"
        >{{ item }}</v-chip
      >
    </v-chip-group>

    <button @click="isLoading = !isLoading">developer flag</button>
    <div v-if="isLoading">
      <LoaderCar />
    </div>
    <ag-grid-vue
      v-else
      class="ag-theme-alpine h-screen"
      style="min-width: 300px; height: 500px"
      :columnDefs="tableData.value.headerTitle"
      :rowData="tableData.value.items"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { computed, onMounted, reactive, ref } from "vue";
import Loader from "./ui/Loader.vue";
import LoaderCar from "./ui/LoaderCar.vue";
import useLogbook from "../composables/useLogbook";
import logbookConfig from "./configs/logbookTableConfig";

const gridApi = ref(null); // Optional - for accessing Grid's API
const { colDefs, row, processProps, tableData, defaultColDef } =
  logbookConfig();

const { logbookList, getLogbookList } = useLogbook();

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
};

// const tableData = ref([]);

// const transferDataToInfoTableData = () => {
//   tableData.value = logbookList.map(item=>{
//     title:,
//     wasted,
//     distance,
//     count:,
//   })
// };

const statusFilter = computed(() => {
  if (tableData.value?.items) {
    const statusArr = tableData.value.items.map((item) => item.status);
    const uniqStatus = [...new Set(statusArr)];
    return uniqStatus;
  }
});

const isLoading = ref(true);

const loadData = async () => {
  // TODO: проверка на наявность в локал стораже... и кнопка обновить базу.
  isLoading.value = true;
  await getLogbookList();
  processProps(logbookList);
  emits("logbookData", logbookList);
  // transferDataToInfoTableData(logbookList);
  isLoading.value = false;
};

const changeFilterStatus = (filterValue) => {
  const filteredLogbookList = logbookList.value?.filter(
    ({ status }) => status === filterValue
  );
  // debugger;
  processProps(filteredLogbookList);
};

const cellWasClicked = (data) => {
  console.log("cellWasClicked", data);
  window.navigator.clipboard.writeText(data.value);
  console.log(`"${data.value}" - сохранено в буфере обмена`);
  // HINT - данные ячейки скопированы
};

const emits = defineEmits(["logbookData"]);

onMounted(async () => loadData());
</script>

<style>
.wrapper {
  max-width: 100%;
  min-width: 330px;
}
</style>
