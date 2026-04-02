import { motion } from 'framer-motion';

type LoaderProps = {
  isVisible: boolean;
};

export default function Loader({ isVisible }: LoaderProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] h-dvh w-screen overflow-hidden bg-gradient-to-b from-[#0a0f1f] to-[#0f172a]"
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.18),transparent_46%)]" />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative flex h-[220px] w-[240px] shrink-0 items-center justify-center sm:h-[280px] sm:w-[320px] md:h-[340px] md:w-[380px]">
        <motion.div
          className="absolute h-28 w-28 rounded-full border border-cyan-300/20 sm:h-44 sm:w-44"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        />

        <motion.div
          className="absolute h-40 w-40 rounded-full border border-cyan-400/10 sm:h-60 sm:w-60"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
        />

        <motion.svg
          viewBox="0 0 260 160"
          className="relative h-[120px] w-[220px] sm:h-[160px] sm:w-[290px] md:h-[190px] md:w-[340px]"
          initial="hidden"
          animate="visible"
          preserveAspectRatio="xMidYMid meet"
        >
        <defs>
          <linearGradient id="rsFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="rsGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={{ x: -16 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.1, duration: 0.42, ease: 'easeInOut' }}
        >
          <motion.path
            d="M45 26 L95 26 C110 26 121 36 121 50 C121 64 110 74 95 74 L75 74 L116 114 L92 114 L58 80 L45 80 Z M68 47 L68 60 L94 60 C100 60 104 56 104 50 C104 43 100 40 94 40 L68 40 Z"
            fill="transparent"
            stroke="rgba(186, 230, 253, 0.95)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.22 }}
          />
          <motion.path
            d="M45 26 L95 26 C110 26 121 36 121 50 C121 64 110 74 95 74 L75 74 L116 114 L92 114 L58 80 L45 80 Z M68 47 L68 60 L94 60 C100 60 104 56 104 50 C104 43 100 40 94 40 L68 40 Z"
            fill="url(#rsFill)"
            stroke="transparent"
            filter="url(#rsGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: 1.4, ease: 'easeOut', times: [0, 0.45, 0.75, 1] }}
          />
        </motion.g>

        <motion.g
          initial={{ x: 16 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.1, duration: 0.42, ease: 'easeInOut' }}
        >
          <motion.path
            d="M205 40 C194 31 182 26 167 26 C146 26 130 37 130 55 C130 74 146 83 163 88 C179 92 186 95 186 103 C186 111 177 116 165 116 C153 116 143 111 133 103"
            fill="transparent"
            stroke="rgba(186, 230, 253, 0.95)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.34 }}
          />
          <motion.path
            d="M205 40 C194 31 182 26 167 26 C146 26 130 37 130 55 C130 74 146 83 163 88 C179 92 186 95 186 103 C186 111 177 116 165 116 C153 116 143 111 133 103"
            fill="none"
            stroke="url(#rsFill)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#rsGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: 1.4, ease: 'easeOut', times: [0, 0.45, 0.75, 1] }}
          />
        </motion.g>

        <motion.g
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <motion.text
            x="130"
            y="142"
            textAnchor="middle"
            className="fill-cyan-100/90 text-[10px] tracking-[0.2em] sm:text-[12px] sm:tracking-[0.34em] md:text-[13px]"
            style={{
              textShadow: '0 0 18px rgba(0, 255, 255, 0.4)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.2, delay: 1.3 }}
          >
            RAVINDRAN S
          </motion.text>
        </motion.g>
        </motion.svg>
        </div>
      </div>
    </motion.div>
  );
}
