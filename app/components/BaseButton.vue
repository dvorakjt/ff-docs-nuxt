<template>
  <button v-bind="props" :class="variant">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface BaseButtonProps {
  variant: "primary" | "secondary";
}

const { variant, ...props } = defineProps<BaseButtonProps>();
</script>

<style scoped>
button {
  border-radius: 7px;
  border: 1px solid #7acdc8;
  padding: 9px 26px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
}

.primary {
  background-color: #7acdc8;
  color: #000000;
}

.secondary {
  background-color: #000000;
  color: #7acdc8;
}
</style>
