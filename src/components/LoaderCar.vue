<template>
  <div class="loader">
    {{ carLoader }}
    <img :src="carLoader" alt="">
  </div>
</template>

<script setup>
import { carLoader } from "../assets/images/";
console.log(carLoader);
</script>

<style lang="scss" scoped>
.loader {
  margin-top: 30px;
  border-bottom: 10px solid #002742;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car {
  &__body {
    animation: shake 0.2s ease-in-out infinite alternate;
  }

  &__line {
    transform-origin: center right;
    stroke-dasharray: 22;
    animation: line 0.8s ease-in-out infinite;
    animation-fill-mode: both;

    &--top {
      animation-delay: 0s;
    }

    &--middle {
      animation-delay: 0.2s;
    }

    &--bottom {
      animation-delay: 0.4s;
    }
  }
}

@keyframes shake {
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(3%);
  }
}

@keyframes line {
  0% {
    stroke-dashoffset: 22;
  }

  25% {
    stroke-dashoffset: 22;
  }

  50% {
    stroke-dashoffset: 0;
  }

  51% {
    stroke-dashoffset: 0;
  }

  80% {
    stroke-dashoffset: -22;
  }

  100% {
    stroke-dashoffset: -22;
  }
}
</style>
