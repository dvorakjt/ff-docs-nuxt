<template>
  <div>
    <TheHeader class="header" />
    <Transition><NuxtPage /></Transition>
  </div>
</template>

<script setup lang="ts"></script>

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

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
