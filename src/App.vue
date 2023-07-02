<template>
  <v-app class="bg-red-lighten-3">
    <h1 class="px-4 py-2 bg-brown-darken-3">DASHBOARD</h1>
    <v-main>
      <!-- <Test /> -->
      <LogbookTable />
    </v-main>
  </v-app>
</template>

<script setup>
import LogbookTable from "./components/LogbookTable.vue";
// import Test from "./components/Test.vue";
</script>
