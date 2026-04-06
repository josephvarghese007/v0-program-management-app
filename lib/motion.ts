import type { Variants, TargetAndTransition } from 'framer-motion';

// ═══════════════════════════════════════════════
//  ENTRANCE ANIMATIONS
// ═══════════════════════════════════════════════

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// ═══════════════════════════════════════════════
//  CONTAINER ORCHESTRATION (stagger children)
// ═══════════════════════════════════════════════

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ═══════════════════════════════════════════════
//  INTERACTION PRESETS (whileHover / whileTap)
// ═══════════════════════════════════════════════

export const tapScale: TargetAndTransition = { scale: 0.97 };
export const tapScaleDeep: TargetAndTransition = { scale: 0.94 };

export const hoverLift: TargetAndTransition = {
  y: -4,
  scale: 1.02,
  transition: { type: 'spring', stiffness: 400, damping: 20 },
};

export const hoverGlow: TargetAndTransition = {
  y: -2,
  boxShadow: '0 0 30px rgba(255, 210, 100, 0.15)',
  transition: { duration: 0.3 },
};

export const hoverScale: TargetAndTransition = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 400, damping: 20 },
};

// ═══════════════════════════════════════════════
//  PAGE / TAB TRANSITIONS
// ═══════════════════════════════════════════════

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// ═══════════════════════════════════════════════
//  MODAL TRANSITIONS
// ═══════════════════════════════════════════════

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 },
  },
};

// ═══════════════════════════════════════════════
//  TOAST / NOTIFICATION
// ═══════════════════════════════════════════════

export const toastSlideIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ═══════════════════════════════════════════════
//  SKELETON / PULSE
// ═══════════════════════════════════════════════

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// ═══════════════════════════════════════════════
//  LIVE INDICATOR
// ═══════════════════════════════════════════════

export const livePulse: Variants = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [1, 0.4, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(255, 210, 100, 0.1)',
      '0 0 40px rgba(255, 210, 100, 0.25)',
      '0 0 20px rgba(255, 210, 100, 0.1)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ═══════════════════════════════════════════════
//  COUNT-UP (for stat numbers)
// ═══════════════════════════════════════════════

export const countUp: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.1 },
  },
};
