<template>
  <LoaderCar v-if="Object.keys(data).length === 0" />
  <WarningTable v-else :data="data" />
</template>

<script setup>
import LoaderCar from "./ui/LoaderCar.vue";
import WarningTable from "./WarningTable.vue";
defineProps({
  data: {},
});
</script>

<style lang="scss" scoped></style>
