<template>
  <div class="bg-brown-darken-3">
    <h1 class="mx-4 my-2">DASHBOARD</h1>
    <WarningTable :data="data" />
  </div>
  <LoaderCar />
</template>

<script setup>
import LoaderCar from "./LoaderCar.vue";
import WarningTable from "./WarningTable.vue";

defineProps({
  data: {},
});
</script>

<style lang="scss" scoped></style>
