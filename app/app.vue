<template>
  <div>
    <Transition
      :onBeforeEnter="onBeforeEnter"
      :onEnter="onEnter"
      :onAfterEnter="onAfterEnter"
      ><NuxtPage
    /></Transition>
  </div>
</template>

<script setup>
import { usePageTransitionStore } from "./stores/pageTransitionStore";
import { gsap } from "gsap";

const pageTransitionStore = usePageTransitionStore();

const onBeforeEnter = (el) => {
  // if (pageTransitionStore.to === "/home") {
  //   el.style.position = "fixed";
  //   el.style.top = 0;
  //   el.style.left = 0;
  // }
};

const onEnter = () => {
  // gsap.set(el, { opacity: 0 });
  // const tl = gsap.timeline().add(gsap.to(el, { opacity: 1 }), 0);
  // const splashScreenHeading = document.getElementById("heading-splash");
  // const homeScreenHeading = document.getElementById("heading-home");
  // const splashHeadingRect = splashScreenHeading.getBoundingClientRect();
  // const homeHeadingRect = homeScreenHeading.getBoundingClientRect();
  // if (pageTransitionStore.to === "/home") {
  //   const differenceY = splashHeadingRect.y - homeHeadingRect.y;
  //   gsap.set("#heading-splash", { opacity: 0 });
  //   gsap.set("#heading-home", { opacity: 1, y: differenceY });
  //   tl.add(gsap.to("#heading-home", { y: 0 }), 0);
  // } else {
  //   const differenceY = homeHeadingRect.y - splashHeadingRect.y;
  //   gsap.set("#heading-splash", { opacity: 1, y: differenceY });
  //   tl.add(gsap.to("#heading-splash", { y: 0 }), 0);
  // }
  // tl.play().then(() => done());
};

const onAfterEnter = (el) => {
  // if (pageTransitionStore.to === "/home") {
  //   el.style.position = "initial";
  //   el.style.top = "unset";
  //   el.style.left = "unset";
  // }
};
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
</style>
