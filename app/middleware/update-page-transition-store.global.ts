import { usePageTransitionStore } from "~/stores/page-transition-store";

export default defineNuxtRouteMiddleware((to, from) => {
  const { $pinia } = useNuxtApp();
  const pageTransitionStore = usePageTransitionStore($pinia);
  pageTransitionStore.to = to.path;
  pageTransitionStore.from = from.path;
});
