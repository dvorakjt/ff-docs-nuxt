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
import { gsap } from "gsap";

const route = useRoute();
const showHeader = ref(route.path !== "/");
const pageTransitionStore = usePageTransitionStore();
const animatedElementsStore = useAnimatedElementsStore();

const onBeforeHeaderLeave = (el: Element) => {
  const logo = el.querySelector("#header-logo")!;
  const logoSizeAndPosition = logo.getBoundingClientRect();
  animatedElementsStore.lastRecordedHeaderLogoSizeAndPosition =
    logoSizeAndPosition;
};

const onBeforePageLeave = (el: Element) => {
  showHeader.value = pageTransitionStore.to !== "/";

  if (pageTransitionStore.from === "/") {
    const hero = el.querySelector("#hero")!;
    const heroSizeAndPosition = hero.getBoundingClientRect();
    animatedElementsStore.lastRecordedHeroSizeAndPosition = heroSizeAndPosition;
  }
};

const onHeaderEnter = (el: Element, done: () => void) => {
  const logo = el.querySelector("#header-logo")!;
  const logoSizeAndPosition = logo.getBoundingClientRect();
  const lastRecordedHeroSizeAndPosition =
    animatedElementsStore.lastRecordedHeroSizeAndPosition!;
  const translateX = lastRecordedHeroSizeAndPosition.x - logoSizeAndPosition.x;
  const translateY = lastRecordedHeroSizeAndPosition.y - logoSizeAndPosition.y;
  const scaleX =
    lastRecordedHeroSizeAndPosition.width / logoSizeAndPosition.width;
  const scaleY =
    lastRecordedHeroSizeAndPosition.height / logoSizeAndPosition.height;
  gsap.set(logo, { x: translateX, y: translateY, scaleX, scaleY });
  gsap
    .to(logo, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.4 })
    .play()
    .then(() => done());
};

const onPageEnter = (el: Element, done: () => void) => {
  if (pageTransitionStore.to === "/") {
    const hero = el.querySelector("#hero")!;
    const heroSizeAndPosition = hero.getBoundingClientRect();
    const lastRecordedHeaderLogoSizeAndPosition =
      animatedElementsStore.lastRecordedHeaderLogoSizeAndPosition!;
    const translateX =
      lastRecordedHeaderLogoSizeAndPosition.x - heroSizeAndPosition.x;
    const translateY =
      lastRecordedHeaderLogoSizeAndPosition.y - heroSizeAndPosition.y;
    const scaleX =
      lastRecordedHeaderLogoSizeAndPosition.width / heroSizeAndPosition.width;
    const scaleY =
      lastRecordedHeaderLogoSizeAndPosition.height / heroSizeAndPosition.height;

    gsap.set(hero, {
      x: translateX,
      y: translateY,
      scaleX,
      scaleY,
    });

    gsap
      .to(hero, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.4 })
      .play()
      .then(() => done());
  }
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
