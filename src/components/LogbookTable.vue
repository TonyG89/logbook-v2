<template>
  <div class="d-flex flex-column w-100">
    <v-row class="ma-2">
      <InfoDashboard :entity="dashboardGeneralInfo" title="Общая информация:" />
      <InfoDashboard :entity="dashboardCost" title="Расходы" />
      <InfoDashboard :entity="dashboardDistance" title="Растояние" />
      <InfoDashboard
        :entity="averageStatisticInfo"
        title="Средняя статистика"
      />
      <InfoDashboard
        :entity="dashboardWarning"
        title="ПОТРАЧЕНО(wastedMoney)"
      />
    </v-row>

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
      <Loader />
    </div>
    <ag-grid-vue
      v-else
      class="ag-theme-alpine"
      style="min-width: 300px; height: 500px"
      :columnDefs="tableData.value.headerTitle"
      :rowData="tableData.value.items"
      :defaultColDef="defaultColDef.pinnedBottomRowConfig"
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
import Loader from "./Loader.vue";
import InfoDashboard from "./InfoDashboard.vue";
import useLogbook from "../composables/useLogbook";
import logbookConfig from "./configs/logbookTableConfig";
import computedData from "./configs/infoDashboardsConfig";
import {
  distanceDashboardConfig,
  costDashboardConfig,
  generalInfoDashboardConfig,
  warningDashboardConfig,
} from "./configs";
const gridApi = ref(null); // Optional - for accessing Grid's API
const { colDefs, row, processProps, tableData, defaultColDef } =
  logbookConfig();
const { allStatistic, averageStatistic } = computedData();

const { logbookList, getLogbookList } = useLogbook();

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
};

const statusFilter = computed(() => {
  if (tableData.value?.items) {
    const statusArr = tableData.value.items.map((item) => item.status);
    const uniqStatus = [...new Set(statusArr)];
    console.log(uniqStatus);
    return uniqStatus;
  }
});

const isLoading = ref(true);

// обновляет данные дашбордов
const dashboardGeneralInfo = ref([]);
const averageStatisticInfo = ref([]);
const dashboardDistance = ref([]);
const dashboardCost = ref([]);
const dashboardWarning = ref([]);

const infoDashboardsRender = () => {
  averageStatisticInfo.value = averageStatistic(logbookList);
  dashboardDistance.value = distanceDashboardConfig(logbookList);
  dashboardCost.value = costDashboardConfig(logbookList);
  dashboardGeneralInfo.value = generalInfoDashboardConfig(logbookList);
  dashboardWarning.value = warningDashboardConfig(logbookList);
};
console.log(dashboardDistance);
const loadData = async () => {
  // TODO: проверка на наявность в локал стораже... и кнопка обновить базу.
  isLoading.value = true;
  await getLogbookList();
  processProps(logbookList);
  infoDashboardsRender();
  console.log(tableData.value.items);
  // if (logbookList.value.length) {
  //   headerArray.value = Object.keys(logbookList.value?.[0]);
  // }

  // // ЗАГОЛОВОК
  // columnDefs.value = headerArray.value
  //   .map((title) => {
  //     return {
  //       headerName: title.toUpperCase(),
  //       field: title.toLowerCase(),
  //     };
  //   })
  //   .filter((item) => item.field !== 'comments') // скрыть комментарии
  //   .map((item) => {
  //     console.log(item);
  //     // В НАЧАЛЕ Мэпа...
  //     if (item.field === 'details') {
  //       item.headerName = 'xxx';
  //       item.children = [
  //         {
  //           headerName: 'title.toUpperCase()',
  //           field: 'sSSSSS'.toLowerCase(),
  //         },
  //       ];
  //     }
  //     return {
  //       ...item,
  //     };
  //   });
  isLoading.value = false;
};

const changeFilterStatus = (filterValue) => {
  const filteredLogbookList = logbookList.value?.filter(
    ({ status }) => status === filterValue
  );
  console.log(filterValue);
  // debugger;
  console.log(filteredLogbookList);
  processProps(filteredLogbookList);
};

const cellWasClicked = (data) => {
  console.log("cellWasClicked", data);
};

onMounted(async () => loadData());
</script>

<style></style>
../composables/infoDashboardsConfig./config/infoDashboardsConfig
./config/logbookTableConfig./configs/logbookTableConfig./configs/infoDashboardsConfig./configs
