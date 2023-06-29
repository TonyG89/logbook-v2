<template>
  <v-card class="my-card" @mouseover="addShadow" @mouseleave="removeShadow">
    <v-row>
      <v-col ma-5 cols="6">
        <div class="left-column">
          <!-- Содержимое левого столбца -->dsadsadsdsa
        </div>
      </v-col>
      <v-col cols="6">
        <div class="right-column">
          <!-- Содержимое правого столбца -->dcxcasdasdsda
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {
    addShadow() {
      const card = this.$refs.card;
      card.classList.add("shadow");
    },
    removeShadow() {
      const card = this.$refs.card;
      card.classList.remove("shadow");
    },
  },
};
</script>

<style scoped>
.my-card {
  background-color: #c8e6c9;
  transition: box-shadow 0.3s ease;
}

.left-column,
.right-column {
  padding: 16px;
}

.left-column {
  background-color: #81c784;
}

.right-column {
  background-color: #4caf50;
  color: #fff;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
