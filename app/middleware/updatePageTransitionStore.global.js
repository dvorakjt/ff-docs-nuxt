import { usePageTransitionStore } from "~/stores/pageTransitionStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { $pinia } = useNuxtApp();
  const pageTransitionStore = usePageTransitionStore($pinia);
  pageTransitionStore.to = to.path;
  pageTransitionStore.from = from.path;
});
