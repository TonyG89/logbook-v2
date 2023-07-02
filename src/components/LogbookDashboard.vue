<template>
    <WarningTable :data="data" class="w-50"/>
  <LoaderCar />
</template>

<script setup>
import LoaderCar from "./ui/LoaderCar.vue";
import WarningTable from "./WarningTable.vue";

defineProps({
  data: {},
});
</script>

<style lang="scss" scoped></style>
