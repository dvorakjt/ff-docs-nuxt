<template>
  <div>
    <Transition
      name="header"
      @before-leave="onBeforeHeaderLeave"
      @enter="onHeaderEnter"
      ><TheHeader v-if="showHeader" class="header"
    /></Transition>
    <Transition
      name="page"
      @before-leave="onBeforePageLeave"
      @enter="onPageEnter"
      ><NuxtPage
    /></Transition>
  </div>
</template>

<script setup lang="ts">
const {
  showHeader,
  onBeforeHeaderLeave,
  onHeaderEnter,
  onBeforePageLeave,
  onPageEnter,
} = usePageTransitions();
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Roboto Flex";
  color: white;
  margin: 0;
  padding: 0;
}

html {
  scrollbar-gutter: stable;
}

body {
  background-color: black;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Monomaniac One";
}

.page-enter-from,
.page-enter-active {
  position: fixed;
  top: 0;
  left: 0;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.header-enter-active .animated {
  animation: 0.4s linear 1 forwards slide-down;
}

.header-leave-active .animated {
  animation: 0.4s linear reverse 1 forwards slide-down;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
