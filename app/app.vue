<template>
  <div>
    <TheHeader class="header" />
    <canvas id="background"></canvas>
    <Transition
      :onBeforeEnter="onBeforeEnter"
      :onEnter="onEnter"
      :onAfterEnter="onAfterEnter"
      ><NuxtPage
    /></Transition>
  </div>
</template>

<script setup lang="ts">
import { usePageTransitionStore } from "./stores/pageTransitionStore";
import { gsap } from "gsap";
import { BackgroundPainter } from "./util/background-painter";
import { MainAnimationCoordinator } from "./util/main-animation-coordinator";
import { loadImages } from "./util/load-images";

// const images = await loadImages([
//   "/images/background-images/logo-89x75.png",
//   "/images/background-images/logo-355x300.png",
//   "/images/background-images/logo-355x300.png",
//   "/images/background-images/logo-592x500.png",
// ]);

const route = useRoute();
const backgroundPainter = ref<BackgroundPainter | null>();
const mainAnimationCoordinator = ref<MainAnimationCoordinator | null>();

onBeforeMount(() => {
  const canvas = document.getElementById("background") as HTMLCanvasElement;
  const images = [document.getElementById("hero") as HTMLImageElement];

  backgroundPainter.value = new BackgroundPainter(
    canvas,
    images,
    90,
    75,
    35,
    33
  );

  mainAnimationCoordinator.value = new MainAnimationCoordinator({
    animationDurationInSeconds: 0.4,
    splashScreenId: "splash-screen",
    splashScreenHeadingId: "heading-splash-screen",
    heroId: "hero",
    navLogoId: "ff-logo",
    homeScreenHeadingId: "heading-home",
    backgroundPainter: backgroundPainter.value,
  });
});

onMounted(() => {
  resizeAndPaintBackground();

  // should store this in a ref so can remove it on unmount
  window.addEventListener("resize", resizeAndPaintBackground);

  function resizeAndPaintBackground() {
    const canvas = document.getElementById("background") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // oops! don't know animation progress here!
    // backgroundPainter.value?.paintBackground({
    //   goalState = route.path === '/' ? 'collapsed' : 'expanded',
    //   animationProgress:
    // })
  }
});

const pageTransitionStore = usePageTransitionStore();

const onBeforeEnter = (el: Element) => {
  mainAnimationCoordinator.value?.beforeEnter(
    pageTransitionStore.from!,
    pageTransitionStore.to!,
    el
  );
};

const onEnter = async (el: Element, done: () => void) => {
  await mainAnimationCoordinator.value?.enter(
    pageTransitionStore.from!,
    pageTransitionStore.to!,
    el
  );
  done();
};

const onAfterEnter = (el: Element) => {
  mainAnimationCoordinator.value?.afterEnter(el);
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

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

#background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}
</style>
