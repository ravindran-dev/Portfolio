import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

const stateMap = {
  default: {
    scale: 1,
    width: 40,
    height: 40,
    opacity: 0.98,
    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.34), 0 0 12px rgba(59, 130, 246, 0.28)',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  hover: {
    scale: 1.18,
    width: 42,
    height: 42,
    opacity: 1,
    boxShadow: '0 11px 22px rgba(0, 0, 0, 0.4), 0 0 16px rgba(59, 130, 246, 0.45)',
    background: 'rgba(255, 255, 255, 0.14)',
  },
  active: {
    scale: 0.88,
    width: 41,
    height: 41,
    opacity: 1,
    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.42), 0 0 14px rgba(59, 130, 246, 0.5)',
    background: 'rgba(255, 255, 255, 0.18)',
  },
} as const;

export default function CustomCursor() {
  const { enabled, visible, mode, x, y, rotation } = useCursor();

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor"
      initial={{ opacity: 0 }}
      animate={{
        x,
        y,
        rotate: -16 + rotation * 0.25,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        x: { type: 'spring', stiffness: 360, damping: 28, mass: 0.4 },
        y: { type: 'spring', stiffness: 360, damping: 28, mass: 0.4 },
        rotate: { type: 'spring', stiffness: 260, damping: 20 },
        opacity: { duration: 0.18, ease: 'easeOut' },
      }}
    >
      <motion.div
        className="custom-cursor-core"
        animate={stateMap[mode]}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <span className="custom-cursor-depth" aria-hidden="true" />
        <span className="custom-cursor-streak" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}
