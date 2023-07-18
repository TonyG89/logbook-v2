<template>
  <v-app class="bg-red-lighten-3">
    <h1 :class="['px-4 py-2', `bg-${headerColor}-darken-3`]">БОРТ ЖУРНАЛ</h1>
    <v-main class="d-flex flex-column wrapper bg-lime-lighten-2">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab :value="TAB_CONFIG_TYPES.MAIN_TABLE">Основная таблица</v-tab>
        <v-tab :value="TAB_CONFIG_TYPES.DASHBOARD">Дашборды</v-tab>
        <v-tab :value="TAB_CONFIG_TYPES.TABLES">Статистика</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <!-- ТАБЛИЦА Статистика -->
        <v-window-item :value="TAB_CONFIG_TYPES.TABLES">
          <div class="d-flex">
            <CurrentlySituation :data="logbookList" class="w-50 mx-2" />
            <InfoTable
              :data="logbookList"
              :sortingArray="arrayWithYears"
              class="w-50 mx-2"
            />
          </div>
        </v-window-item>
        <!-- Дашборды -->
        <v-window-item :value="TAB_CONFIG_TYPES.DASHBOARD">
          <v-row class="ma-2">
            <InfoDashboard
              :entity="dashboardGeneralInfo"
              title="Main information"
            />
            <InfoDashboard
              :entity="averageStatisticInfo"
              title="Amount statistics"
            />
            <InfoDashboard :entity="dashboardCost" title="Costs" />
            <InfoDashboard :entity="dashboardDistance" title="Drow" />
            <!-- <InfoDashboard :entity="dashboardCurrentYear" title="Текущий год" /> -->
          </v-row></v-window-item
        >
        <!-- Основная таблица -->
        <v-window-item :value="TAB_CONFIG_TYPES.MAIN_TABLE">
          <v-chip-group selected-class="text-secondary">
            <v-chip
              v-for="item in statusFilter"
              :key="item"
              @click="changeFilterStatus(item)"
              >{{ item }}</v-chip
            >
          </v-chip-group>
          <LogbookTable @logbookData="renderData"
        /></v-window-item>
      </v-window>

      <!-- <Test /> -->
      <!-- <LogbookTable
        @changeHeaderColor="(numColor) => (headerColor = color[numColor])"
      /> -->
    </v-main>
  </v-app>
</template>

<script setup>
import LogbookTable from "@/components/LogbookTable.vue";
import { TAB_CONFIG_TYPES } from "@/config/dataConfig";
// import Test from "@/components/Test.vue";
import { ref, computed, watch } from "vue";
import CurrentlySituation from "@/components/CurrentlySituation.vue";
import InfoDashboard from "@/components/ui/InfoDashboard.vue";
import InfoTable from "@/components/ui/InfoTable.vue";
import {
  distanceDashboardConfig,
  costDashboardConfig,
  generalInfoDashboardConfig,
  warningDashboardConfig,
  currentYearDashboardConfig,
} from "@/components/configs";
import computedData from "@/components/configs/infoDashboardsConfig";
import moment from "moment";

const { averageStatistic } = computedData();

const tab = ref(TAB_CONFIG_TYPES.MAIN_TABLE);

// DASHBOARDS
// обновляет данные дашбордов
const dashboardGeneralInfo = ref([]);
const averageStatisticInfo = ref([]);
const dashboardDistance = ref([]);
const dashboardCost = ref([]);
const dashboardWarning = ref([]);
const dashboardCurrentYear = ref([]);

const infoDashboardsRender = (logbookPayload) => {
  logbookList.value = logbookPayload.value;
  console.log(logbookList.value);
  averageStatisticInfo.value = averageStatistic(logbookPayload);
  dashboardDistance.value = distanceDashboardConfig(logbookPayload);
  dashboardCost.value = costDashboardConfig(logbookPayload);
  dashboardGeneralInfo.value = generalInfoDashboardConfig(logbookPayload);
  dashboardWarning.value = warningDashboardConfig(logbookPayload);
  dashboardCurrentYear.value = currentYearDashboardConfig(logbookPayload);
};

const isLoading = ref(true);
const logbookList = ref([]);

const renderData = (payload) => {
  isLoading.value = true;
  infoDashboardsRender(payload);
  isLoading.value = false;
};

const arrayWithYears = computed(() => {
  const years = logbookList.value?.map((item) => moment(item.date).year());

  const uniqYears = [...new Set(years)];
  return uniqYears;
});

const color = [
  "brown",
  "blue-grey",
  "light-green",
  "teal",
  "cyan",
  "indigo",
  "purple",
  "pink",
  "red",
];
const headerColor = ref(color[0]);

watch(tab.value, (tab) => {
  console.log(tab);
  switch (tab) {
    case "mainTable":
      return (headerColor.value = color[2]);
  }
});
</script>
