<template>
  <Loader v-if="!entity.length"></Loader>
  <div class="info order mr-4 pa-2 rounded border bg-dashboard my-4" v-else>
    <h3>{{ title.toLocaleUpperCase() }}:</h3>
    <!-- TODO: TABLE  -->
      <infoCard
        v-for="(item, ind) in entitiesState"
        :key="ind"
        :block="item"
        :color="color"
      />
  </div>
</template>

<script setup>
import infoCard from "./infoCard.vue";
import { ref, reactive, computed } from "vue";
import Loader from "./Loader.vue";

const entitiesState = computed(() => {
  const typeBlocks = props.entity?.reduce(
    (acc, item) => (acc.includes(item.type) ? acc : [...acc, item.type]),
    []
  );
  const blocks = typeBlocks?.map((type) => {
    const entities = [...props.entity];
    const obj = {
      ...entities.filter((item) => item.type === type),
    };
    return obj;
  });
  return blocks;
});

const props = defineProps({
  entity: {
    type: Array,
    default: () => [], // [{title: '', value: '', type: '' || [''],}]
    required: true,
  },
  title: {
    type: String,
    default: () => "unnamed dashboard",
    required: false,
  },
  color: {
    type: String,
    default: () => "dashboardList",
    required: false,
  },
});
</script>
<!-- {{ $vuetify.theme.themes.light.primary }} -->
<style scoped>
:root {
  --main-color: green;
}
.bb {
  border-bottom: 1px dotted var(--main-color);
  padding-bottom: 5px;
}
.info {
  min-width: 300px;
}
h3 {
  font-family: "MartianMono";
  color: white;
}
</style>
