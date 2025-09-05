import gsap from "gsap";
import { BackgroundPainter, type BackgroundState } from "./background-painter";

interface MainAnimationCoordinatorConfig {
  animationDurationInSeconds: number;
  backgroundPainter: BackgroundPainter;
  splashScreenId: string;
  heroId: string;
  navLogoId: string;
  splashScreenHeadingId: string;
  homeScreenHeadingId: string;
}

export class MainAnimationCoordinator {
  private animationDurationInSeconds: number;
  private backgroundPainter: BackgroundPainter;
  private splashScreenId: string;
  private heroId: string;
  private navLogoId: string;
  private splashScreenHeadingId: string;
  private homeScreenHeadingId: string;
  private animationTimeLine: GSAPTimeline | null = null;

  constructor({
    animationDurationInSeconds,
    backgroundPainter,
    splashScreenId,
    heroId,
    navLogoId,
    splashScreenHeadingId,
    homeScreenHeadingId,
  }: MainAnimationCoordinatorConfig) {
    this.animationDurationInSeconds = animationDurationInSeconds;
    this.backgroundPainter = backgroundPainter;
    this.splashScreenId = splashScreenId;
    this.heroId = heroId;
    this.navLogoId = navLogoId;
    this.splashScreenHeadingId = splashScreenHeadingId;
    this.homeScreenHeadingId = homeScreenHeadingId;
  }

  public beforeEnter(from: string, to: string, page: Element) {
    this.animationTimeLine?.kill();
    this.setPagePosition(page, "fixed");

    if (from === "/" && to === "/home") {
      const homeHeading = page.querySelector(
        `#${this.homeScreenHeadingId}`
      ) as Element;

      this.setPageOpacity(page, 0, [homeHeading]);
    } else if (from === "/home" && to === "/") {
      const hero = page.querySelector(`#${this.heroId}`)!;
      const opaqueElements: Element[] = [hero];

      if (this.shouldTranslateHeading()) {
        const splashScreenHeading = page.querySelector(
          `#${this.splashScreenHeadingId}`
        )!;
        opaqueElements.push(splashScreenHeading);
      }

      this.setPageOpacity(page, 0, opaqueElements);
    } else {
      this.setPageOpacity(page, 0);
    }
  }

  public async enter(from: string, to: string, page: Element): Promise<void> {
    this.animationTimeLine = gsap
      .timeline()
      .duration(this.animationDurationInSeconds);

    // handle opacity
    if ((from === "/" && to === "/home") || (from === "/home" && to === "/")) {
      const leafNodes: Element[] = [];
      this.getLeafNodes(page, leafNodes);
      for (const node of leafNodes) {
        this.animationTimeLine.add(gsap.to(node, { opacity: 1 }), 0);
      }
    } else {
      this.animationTimeLine.add(gsap.to(page, { opacity: 1 }));
    }

    // handle z-indices
    if (from === "/") {
      const splashScreen = document.getElementById(this.splashScreenId)!;
      gsap.set(splashScreen, { zIndex: -2 });
    } else if (to === "/") {
      const splashScreen = document.getElementById(this.splashScreenId)!;
      gsap.set(splashScreen, { zIndex: 0 });
    }

    if (from === "/" || to === "/") {
      // move logo / change visibility
      const hero = document.getElementById(this.heroId)!;
      const navLogo = document.getElementById(this.navLogoId)!;
      const heroSizeAndPosition = hero.getBoundingClientRect();
      const navLogoSizeAndPosition = navLogo.getBoundingClientRect();

      if (from === "/") {
        const translateNavLogoX =
          heroSizeAndPosition.x - navLogoSizeAndPosition.x;

        const translateNavLogoY =
          heroSizeAndPosition.y - navLogoSizeAndPosition.y;

        gsap.set(hero, { visibility: "hidden" });
        gsap.set(navLogo, { visibility: "visible" });

        const tween = gsap.from(navLogo, {
          x: translateNavLogoX,
          y: translateNavLogoY,
          width: `${heroSizeAndPosition.width}px`,
          height: `${heroSizeAndPosition.height}px`,
        });

        this.animationTimeLine.add(tween, 0);
      } else if (to === "/") {
        const translateHeroX = navLogoSizeAndPosition.x - heroSizeAndPosition.x;
        const translateHeroY = navLogoSizeAndPosition.y - heroSizeAndPosition.y;

        gsap.set(navLogo, { visibility: "hidden" });
        gsap.set(hero, { visibility: "visible" });

        const tween = gsap.from(hero, {
          x: translateHeroX,
          y: translateHeroY,
          width: `${navLogoSizeAndPosition.width}px`,
          height: `${navLogoSizeAndPosition.height}px`,
        });

        this.animationTimeLine.add(tween, 0);
      }

      // move heading / change visibility
      const splashScreenHeading = document.getElementById(
        this.splashScreenHeadingId
      )!;
      const homeHeading = document.getElementById(this.homeScreenHeadingId)!;
      const { x: splashScreenHeadingX, y: splashScreenHeadingY } =
        splashScreenHeading.getBoundingClientRect();
      const { x: homeHeadingX, y: homeHeadingY } =
        homeHeading.getBoundingClientRect();

      if (from === "/") {
        const translateHomeScreenHeadingX = splashScreenHeadingX - homeHeadingX;
        const translateHomeScreenHeadingY = splashScreenHeadingY - homeHeadingY;
        const tween = gsap.from(homeHeading, {
          x: translateHomeScreenHeadingX,
          y: translateHomeScreenHeadingY,
        });
        this.animationTimeLine!.add(tween, 0);
      } else if (to === "/" && this.shouldTranslateHeading()) {
        const translateSplashScreenHeadingX =
          homeHeadingX - splashScreenHeadingX;
        const translateSplashScreenHeadingY =
          homeHeadingY - splashScreenHeadingY;
        const tween = gsap.from(splashScreenHeading, {
          x: translateSplashScreenHeadingX,
          y: translateSplashScreenHeadingY,
        });
        this.animationTimeLine!.add(tween, 0);
      }

      // animate background
      const paintBackground = (animationProgress: number) => {
        const goalState: BackgroundState =
          from === "/" ? "expanded" : "collapsed";

        const hero = document.getElementById(this.heroId)!;
        const heroSizeAndPosition = hero.getBoundingClientRect();

        this.backgroundPainter.paintBackground({
          goalState,
          animationProgress,
          heroSizeAndPosition,
        });
      };

      this.animationTimeLine.call(paintBackground, [0], 0);

      // repaint the canvas every 20 milliseconds
      this.animationTimeLine.add(
        gsap
          .delayedCall(0.002, () => {
            const progress = this.animationTimeLine!.progress();
            paintBackground(progress);
          })
          .repeat(-1)
      );

      // ensure that paintBackground is called at the end of the animation
      this.animationTimeLine.call(paintBackground, [1], 1);
    }

    await this.animationTimeLine!.play();
  }

  public afterEnter(page: Element) {
    this.setPagePosition(page, "initial");
  }

  private setPagePosition(page: Element, position: "fixed" | "initial") {
    gsap.set(page, { position });
    if (position === "fixed") {
      gsap.set(page, {
        top: 0,
        left: 0,
      });
    } else {
      gsap.set(page, {
        top: "unset",
        left: "unset",
      });
    }
  }

  private setPageOpacity(
    page: Element,
    opacity: number,
    excludeNodes?: Element[]
  ) {
    if (!excludeNodes || excludeNodes.length === 0) {
      gsap.set(page, { opacity });
    } else {
      const leafNodes: Element[] = [];
      this.getLeafNodes(page, leafNodes);
      for (const node of leafNodes) {
        if (excludeNodes.includes(node)) {
          continue;
        }

        gsap.set(node, { opacity });
      }
    }
  }

  private getLeafNodes(element: Element, nodes: Element[]) {
    const childElements = Array.from(element.children);

    if (childElements.length === 0) {
      nodes.push(element);
    } else {
      childElements.forEach((el) => this.getLeafNodes(el, nodes));
    }
  }

  private shouldTranslateHeading() {
    const homeScreenHeading = document.getElementById(
      this.homeScreenHeadingId
    )!;
    const { bottom } = homeScreenHeading.getBoundingClientRect();
    const isOffScreen = bottom < 0;
    return !isOffScreen;
  }
}
