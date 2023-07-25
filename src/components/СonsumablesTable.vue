<template>
  <WarningTable :data="data" />
</template>

<script setup>
import WarningTable from "./WarningTable.vue";
defineProps({
  data: {},
});
</script>

<style lang="scss" scoped></style>
