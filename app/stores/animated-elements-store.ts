import type { SizeAndPosition } from "~/model/size-and-position";

interface AnimatedElementsStoreState {
  lastRecordedHeroSizeAndPosition: SizeAndPosition | null;
  lastRecordedHeaderLogoSizeAndPosition: SizeAndPosition | null;
  lastRecordedSplashScreenHeadingSizeAndPosition: SizeAndPosition | null;
  lastRecordedHomePageHeadingSizeAndPosition: SizeAndPosition | null;
}

export const useAnimatedElementsStore = defineStore<
  "animatedElementsStore",
  AnimatedElementsStoreState
>("animatedElementsStore", {
  state: () => {
    return {
      lastRecordedHeroSizeAndPosition: null,
      lastRecordedHeaderLogoSizeAndPosition: null,
      lastRecordedSplashScreenHeadingSizeAndPosition: null,
      lastRecordedHomePageHeadingSizeAndPosition: null,
    };
  },
});
