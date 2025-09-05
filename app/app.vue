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
// plan:
// how to scale things not use width and height

import { usePageTransitionStore } from "./stores/pageTransitionStore";
import { BackgroundPainter } from "./util/background-painter";
import { MainAnimationCoordinator } from "./util/main-animation-coordinator";
import { loadImages } from "./util/load-images";

const route = useRoute();
const backgroundPainter = ref<BackgroundPainter | null>();
const mainAnimationCoordinator = ref<MainAnimationCoordinator | null>();

onMounted(() => {
  loadImages([
    "/images/background-images/logo-89x75.png",
    "/images/background-images/logo-355x300.png",
    "/images/background-images/logo-355x300.png",
    "/images/background-images/logo-592x500.png",
  ]).then((images) => {
    console.log(images);

    const canvas = document.getElementById("background") as HTMLCanvasElement;

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

    resizeAndPaintBackground();

    // should store this in a ref so can remove it on unmount
    window.addEventListener("resize", resizeAndPaintBackground);

    function resizeAndPaintBackground() {
      const canvas = document.getElementById("background") as HTMLCanvasElement;
      canvas.width = window.innerWidth - 92;
      canvas.height = window.innerHeight - 48;

      const progress = mainAnimationCoordinator.value!.getProgress();
      if (route.path === "/" && progress >= 1) {
        return;
      } else if (progress >= 1) {
        backgroundPainter.value!.paintStaticBackground();
      } else {
        const hero = document.getElementById("hero")!;
        const heroSizeAndPosition = hero.getBoundingClientRect();
        backgroundPainter.value!.paintAnimatedBackground({
          goalState: pageTransitionStore.to === "/" ? "collapsed" : "expanded",
          animationProgress: progress,
          heroSizeAndPosition,
        });
      }
    }
  });
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
  top: 24px;
  left: 46px;
  height: calc(100vh - 48px);
  width: calc(100vw - 92px);
  z-index: -1;
}
</style>
