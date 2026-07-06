/** Shared easing — the "expo-out" curve used across every reveal. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Dispatch a smooth scroll handled by the Lenis provider (falls back to native). */
export function scrollToId(id: string) {
  window.dispatchEvent(new CustomEvent("app:scrollto", { detail: id }));
}
