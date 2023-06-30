<template>
  <div class="bg-brown-darken-3">
    <h1>DASHBOARD</h1>
    <WarningTable 
    :data="data"
    />
  </div>
  <LoaderCar />
</template>

<script setup>
import LoaderCar from "./LoaderCar.vue";
import WarningTable from "./WarningTable.vue";

defineProps({
  data: {
    
  }
})
</script>

<style lang="scss" scoped></style>
