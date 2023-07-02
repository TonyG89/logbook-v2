<template>
  <Loader v-if="!entity.length"></Loader>
  <div class="info order mr-4 pa-2 rounded border bg-red-lighten-3" v-else>
    <h3>{{ title }}</h3>
    <!-- TODO: TABLE  -->
    <div>
      <infoCard
        v-for="(item, ind) in entitiesState"
        :key="ind"
        :block="item"
        :color="color"
      />
    </div>
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
    default: () => "INFORMATIONS",
    required: false,
  },
  color: {
    type: String,
    default: () => "primary",
    required: false,
  },
});
</script>
<!-- {{ $vuetify.theme.themes.light.primary }} -->
<style>
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
</style>
