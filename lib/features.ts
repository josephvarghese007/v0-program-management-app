/**
 * Feature Toggles
 *
 * Modules check these flags before rendering.
 * Disabled features show graceful fallbacks (e.g. "Coming soon") instead of breaking.
 *
 * Flip a flag to `true` when the feature is ready for production.
 */
export const FEATURES = {
  /** Phase 3 — Live meeting links on programs */
  LIVE_PRAYER: true,

  /** Phase 4 — Community prayer request wall */
  PRAYER_REQUESTS: false,

  /** Phase 5 — PWA install prompt + offline mode */
  PWA: false,

  /** Phase 6 — Sound effects on interactions */
  SOUND: false,

  /** Phase 6 — Light / AMOLED theme switcher */
  THEME_MODES: false,

  /** Future — Attendance leaderboard */
  LEADERBOARD: false,
} as const;

/** Type-safe feature check */
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
  return FEATURES[feature];
}
