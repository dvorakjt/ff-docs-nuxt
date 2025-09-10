import { gsap } from "gsap";
import { usePageTransitionStore } from "#imports";
import { useAnimatedElementsStore } from "#imports";

interface PageTransitionHooks {
  showHeader: Ref<boolean>;
  onBeforeHeaderLeave: (el: Element) => void;
  onHeaderEnter: (el: Element, done: () => void) => void;
  onBeforePageLeave: (el: Element) => void;
  onPageEnter: (el: Element, done: () => void) => void;
}

interface Transformations {
  translateX: number | string;
  translateY: number | string;
  scaleX: number | string;
  scaleY: number | string;
}

const AnimatedElementIds = {
  Hero: "#hero",
  HeaderLogo: "#header-logo",
  HeadingSplashScreen: "#heading-splash-screen",
  HeadingHomePage: "#heading-home-page",
};

const ANIMATION_DURATION = 0.4;

export function usePageTransitions(): PageTransitionHooks {
  const route = useRoute();
  const showHeader = ref(route.path !== "/");
  const pageTransitionStore = usePageTransitionStore();
  const animatedElementsStore = useAnimatedElementsStore();

  function onBeforeHeaderLeave(header: Element) {
    recordHeaderLogoSizeAndPosition(header);
  }

  function recordHeaderLogoSizeAndPosition(header: Element) {
    const logo = header.querySelector(AnimatedElementIds.HeaderLogo)!;
    const logoSizeAndPosition = logo.getBoundingClientRect();
    animatedElementsStore.lastRecordedHeaderLogoSizeAndPosition =
      logoSizeAndPosition;
  }

  function onHeaderEnter(header: Element, done: () => void) {
    const headerLogo = header.querySelector(AnimatedElementIds.HeaderLogo)!;

    const initialTransformations =
      calculateHeaderLogoInitialTransformations(headerLogo);

    animateHeaderLogo(headerLogo, initialTransformations, done);
  }

  function calculateHeaderLogoInitialTransformations(
    logo: Element
  ): Transformations {
    const logoSizeAndPosition = logo.getBoundingClientRect();

    const lastRecordedHeroSizeAndPosition =
      animatedElementsStore.lastRecordedHeroSizeAndPosition!;

    const translateX =
      lastRecordedHeroSizeAndPosition.x - logoSizeAndPosition.x;

    const translateY =
      lastRecordedHeroSizeAndPosition.y - logoSizeAndPosition.y;

    const scaleX =
      lastRecordedHeroSizeAndPosition.width / logoSizeAndPosition.width;

    const scaleY =
      lastRecordedHeroSizeAndPosition.height / logoSizeAndPosition.height;

    return { translateX, translateY, scaleX, scaleY };
  }

  function animateHeaderLogo(
    logo: Element,
    initialTransformations: Transformations,
    done: () => void
  ) {
    const { translateX, translateY, scaleX, scaleY } = initialTransformations;
    gsap.set(logo, { x: translateX, y: translateY, scaleX, scaleY });
    gsap
      .to(logo, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: ANIMATION_DURATION,
        ease: "none",
      })
      .play()
      .then(() => done());
  }

  function onBeforePageLeave(page: Element) {
    showHeader.value = pageTransitionStore.to !== "/";

    if (pageTransitionStore.from === "/") {
      handleSplashScreenLeave(page);
    }
  }

  function handleSplashScreenLeave(splashScreen: Element) {
    const hero = splashScreen.querySelector(AnimatedElementIds.Hero)!;
    const heroSizeAndPosition = hero.getBoundingClientRect();
    animatedElementsStore.lastRecordedHeroSizeAndPosition = heroSizeAndPosition;
  }

  function onPageEnter(page: Element, done: () => void) {
    if (pageTransitionStore.to === "/") {
      handleSplashScreenEnter(page, done);
    }
  }

  function handleSplashScreenEnter(splashScreen: Element, done: () => void) {
    const hero = splashScreen.querySelector("#hero")!;
    const initialHeroTransformations =
      calculateHeroInitialTransformations(hero);
    animateHero(hero, initialHeroTransformations, done);
  }

  function calculateHeroInitialTransformations(hero: Element): Transformations {
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

    return { translateX, translateY, scaleX, scaleY };
  }

  function animateHero(
    hero: Element,
    initialTransformations: Transformations,
    done: () => void
  ) {
    const { translateX, translateY, scaleX, scaleY } = initialTransformations;
    gsap.set(hero, {
      x: translateX,
      y: translateY,
      scaleX,
      scaleY,
    });

    gsap
      .to(hero, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: ANIMATION_DURATION,
        ease: "none",
      })
      .play()
      .then(() => done());
  }

  return {
    showHeader,
    onBeforeHeaderLeave,
    onHeaderEnter,
    onBeforePageLeave,
    onPageEnter,
  };
}
