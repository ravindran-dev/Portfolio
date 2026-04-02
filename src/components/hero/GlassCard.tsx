import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  glow?: 'none' | 'soft' | 'strong';
};

const glowMap: Record<NonNullable<GlassCardProps['glow']>, string> = {
  none: '',
  soft: 'shadow-[0_0_30px_rgba(56,189,248,0.14)]',
  strong: 'shadow-[0_0_40px_rgba(0,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.08)]',
};

export default function GlassCard({
  children,
  glow = 'soft',
  className = '',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={[
        'rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl',
        glowMap[glow],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  );
}
