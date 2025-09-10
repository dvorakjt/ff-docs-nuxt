interface PageTransitionStoreState {
  from: string | undefined;
  to: string | undefined;
}

export const usePageTransitionStore = defineStore<
  "pageTransitionStore",
  PageTransitionStoreState
>("pageTransitionStore", {
  state: () => ({
    from: undefined,
    to: undefined,
  }),
});
