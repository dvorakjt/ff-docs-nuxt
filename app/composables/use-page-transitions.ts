import { gsap } from "gsap";
import { usePageTransitionStore } from "#imports";
import { useAnimatedElementsStore } from "#imports";
import { touchElementsExceptExcludedElementsAndTheirAncestors } from "~/util/touch-elements-except-excluded-elements-and-their-ancestors";

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

type Timeline = InstanceType<(typeof gsap)["core"]["Timeline"]>;

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

  function onBeforePageLeave(page: Element) {
    showHeader.value = pageTransitionStore.to !== "/";

    if (pageTransitionStore.from === "/") {
      handleSplashScreenLeave(page);
    } else if (pageTransitionStore.from === "/home") {
      handleHomePageLeave(page);
    }
  }

  function handleSplashScreenLeave(splashScreen: Element) {
    recordHeroSizeAndPosition(splashScreen);
    recordSplashScreenHeadingSizeAndPosition(splashScreen);
  }

  function recordHeroSizeAndPosition(splashScreen: Element) {
    const hero = splashScreen.querySelector(AnimatedElementIds.Hero)!;
    const heroSizeAndPosition = hero.getBoundingClientRect();
    animatedElementsStore.lastRecordedHeroSizeAndPosition = heroSizeAndPosition;
  }

  function recordSplashScreenHeadingSizeAndPosition(splashScreen: Element) {
    const splashScreenHeading = splashScreen.querySelector(
      AnimatedElementIds.HeadingSplashScreen
    )!;
    const splashScreenHeadingSizeAndPosition =
      splashScreenHeading.getBoundingClientRect();
    animatedElementsStore.lastRecordedSplashScreenHeadingSizeAndPosition =
      splashScreenHeadingSizeAndPosition;
  }

  function handleHomePageLeave(homePage: Element) {
    recordHomePageHeadingSizeAndPosition(homePage);
  }

  function recordHomePageHeadingSizeAndPosition(homePage: Element) {
    const homePageHeading = homePage.querySelector(
      AnimatedElementIds.HeadingHomePage
    )!;
    const homePageHeadingSizeAndPosition =
      homePageHeading.getBoundingClientRect();
    animatedElementsStore.lastRecordedHomePageHeadingSizeAndPosition =
      homePageHeadingSizeAndPosition;
  }

  function onBeforeHeaderLeave(header: Element) {
    recordHeaderLogoSizeAndPosition(header);
  }

  function recordHeaderLogoSizeAndPosition(header: Element) {
    const logo = header.querySelector(AnimatedElementIds.HeaderLogo)!;
    const logoSizeAndPosition = logo.getBoundingClientRect();
    animatedElementsStore.lastRecordedHeaderLogoSizeAndPosition =
      logoSizeAndPosition;
  }

  function onPageEnter(page: Element, done: () => void) {
    if (pageTransitionStore.to === "/") {
      handleSplashScreenEnter(page, done);
    } else if (
      pageTransitionStore.to === "/home" &&
      pageTransitionStore.from === "/"
    ) {
      handleHomePageEnterFromSplashScreen(page, done);
    }
  }

  function handleSplashScreenEnter(splashScreen: Element, done: () => void) {
    const timeline = gsap.timeline().paused(true);

    animateHero(splashScreen, timeline);

    if (shouldAnimateSplashScreenHeading()) {
      animateSplashScreenHeadingAndFadePageIn(splashScreen, timeline);
    } else {
      fadePageIn(splashScreen, timeline, []);
    }

    timeline.play().then(() => done());
  }

  function animateHero(splashScreen: Element, timeline: Timeline) {
    const hero = splashScreen.querySelector("#hero")!;

    const { translateX, translateY, scaleX, scaleY } =
      calculateHeroInitialTransformations(hero);

    gsap.set(hero, {
      x: translateX,
      y: translateY,
      scaleX,
      scaleY,
    });

    timeline.to(
      hero,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: ANIMATION_DURATION,
        ease: "none",
      },
      0
    );
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

  function shouldAnimateSplashScreenHeading() {
    if (pageTransitionStore.from === "/home") {
      const { y, height } =
        animatedElementsStore.lastRecordedHomePageHeadingSizeAndPosition!;
      const isHomePageHeadingVisible = y + height > 0 && y < window.innerHeight;
      return isHomePageHeadingVisible;
    }

    return false;
  }

  function animateSplashScreenHeadingAndFadePageIn(
    splashScreen: Element,
    timeline: Timeline
  ) {
    const heading = splashScreen.querySelector(
      AnimatedElementIds.HeadingSplashScreen
    )!;

    const { translateX, translateY, scaleX, scaleY } =
      calculateInitialSplashScreenHeadingTransformations(heading);

    gsap.set(heading, {
      x: translateX,
      y: translateY,
      scaleX,
      scaleY,
    });

    timeline.to(
      heading,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: ANIMATION_DURATION,
        ease: "none",
      },
      0
    );

    fadePageIn(splashScreen, timeline, [heading]);
  }

  function calculateInitialSplashScreenHeadingTransformations(
    heading: Element
  ) {
    const splashScreenHeadingSizeAndPosition = heading.getBoundingClientRect();

    const lastRecordedHomeScreenHeadingSizeAndPosition =
      animatedElementsStore.lastRecordedHomePageHeadingSizeAndPosition!;

    const translateX =
      lastRecordedHomeScreenHeadingSizeAndPosition.x -
      splashScreenHeadingSizeAndPosition.x;

    const translateY =
      lastRecordedHomeScreenHeadingSizeAndPosition.y -
      splashScreenHeadingSizeAndPosition.y;

    const scaleX =
      lastRecordedHomeScreenHeadingSizeAndPosition.width /
      splashScreenHeadingSizeAndPosition.width;

    const scaleY =
      lastRecordedHomeScreenHeadingSizeAndPosition.height /
      splashScreenHeadingSizeAndPosition.height;

    return { translateX, translateY, scaleX, scaleY };
  }

  function fadePageIn(
    page: Element,
    timeline: Timeline,
    elementsToExclude: Element[]
  ) {
    touchElementsExceptExcludedElementsAndTheirAncestors(
      page,
      elementsToExclude,
      (element) => {
        gsap.set(element, { opacity: 0 });
        timeline.to(
          element,
          { opacity: 1, duration: ANIMATION_DURATION, ease: "none" },
          0
        );
      }
    );
  }

  function handleHomePageEnterFromSplashScreen(
    homePage: Element,
    done: () => void
  ) {
    const timeline = gsap.timeline().paused(true);
    animateHomePageHeadingAndFadePageIn(homePage, timeline);
    timeline.play().then(() => done());
  }

  function animateHomePageHeadingAndFadePageIn(
    homePage: Element,
    timeline: Timeline
  ) {
    const heading = homePage.querySelector(AnimatedElementIds.HeadingHomePage)!;

    const { translateX, translateY, scaleX, scaleY } =
      calculateInitialHomePageHeadingTransformations(heading);

    gsap.set(heading, {
      x: translateX,
      y: translateY,
      scaleX,
      scaleY,
    });

    timeline.to(
      heading,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: ANIMATION_DURATION,
        ease: "none",
      },
      0
    );

    fadePageIn(homePage, timeline, [heading]);
  }

  function calculateInitialHomePageHeadingTransformations(heading: Element) {
    const homeScreenHeadingSizeAndPosition = heading.getBoundingClientRect();

    const lastRecordedSplashScreenHeadingSizeAndPosition =
      animatedElementsStore.lastRecordedSplashScreenHeadingSizeAndPosition!;

    const translateX =
      lastRecordedSplashScreenHeadingSizeAndPosition.x -
      homeScreenHeadingSizeAndPosition.x;

    const translateY =
      lastRecordedSplashScreenHeadingSizeAndPosition.y -
      homeScreenHeadingSizeAndPosition.y;

    const scaleX =
      lastRecordedSplashScreenHeadingSizeAndPosition.width /
      homeScreenHeadingSizeAndPosition.width;

    const scaleY =
      lastRecordedSplashScreenHeadingSizeAndPosition.height /
      homeScreenHeadingSizeAndPosition.height;

    return { translateX, translateY, scaleX, scaleY };
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

  return {
    showHeader,
    onBeforeHeaderLeave,
    onHeaderEnter,
    onBeforePageLeave,
    onPageEnter,
  };
}
