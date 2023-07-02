<template>
  <v-card class="text-left pa-1 info my-2" :class="`bg-${color}`">
    <div
      class="d-flex align-center justify-space-between bb pa-2 ma-2"
      v-for="item in block"
      :key="item"
    >
      <h4>{{ item.title }}</h4>
      <div class="ml-1" v-if="Array.isArray(item.value)">
        <v-chip class="mx-1" v-for="value in item.value" :key="value">{{
          value
        }}</v-chip>
      </div>
      <div class="ml-1" v-else>
        {{ item.value }}
      </div>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  block: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    default: () => "background",
  },
});
</script>

<style lang="scss" scoped>
div {
  font-family: "Caveat";
  font-size: x-large;
}
</style>
