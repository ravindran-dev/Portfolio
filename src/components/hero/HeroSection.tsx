import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../../photo3.png';

function SocialIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3, scale: 1.08 }}
      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/15 p-2 text-slate-100 backdrop-blur-md transition hover:border-cyan-300/70 hover:text-white"
      aria-label={label}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-4.5rem)] w-full items-start bg-gradient-to-b from-[#0a0f1f] to-[#0f172a] pt-10 text-slate-100 sm:min-h-[calc(100vh-5rem)] sm:pt-8 md:min-h-[calc(100vh-6rem)] md:items-center md:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto w-full max-w-7xl px-6"
      >
        <div className="grid items-center gap-4 sm:gap-7 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="space-y-1.5 text-center sm:space-y-2.5 md:space-y-5 md:text-left"
          >
            <p className="text-base text-cyan-100/90 sm:text-lg md:text-xl">Hello, I am</p>
            <h1 className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-4xl font-black leading-[1.05] text-transparent drop-shadow-[0_8px_24px_rgba(34,211,238,0.25)] sm:text-5xl md:text-6xl lg:text-7xl">
              RAVINDRAN S
            </h1>
            <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
              AI . BUILD . SHIP
            </p>
            <p className="mx-auto max-w-lg text-base leading-snug text-slate-300 sm:text-lg sm:leading-relaxed md:mx-0 md:text-[1.15rem] md:leading-relaxed">
              AI/ML Engineer & Full-Stack Developer focused on intelligent systems and scalable applications.
            </p>

            <div className="flex items-center justify-center gap-2.5 pt-1 sm:gap-3 md:justify-start">
              <SocialIcon href="https://github.com/ravindran-dev" label="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.89-.01-1.74-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0112 6.9c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.2 10.2 0 0022 12.23C22 6.58 17.52 2 12 2z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://www.linkedin.com/in/ravindran-s-982702327/" label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.48v6.27zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="mailto:ravindran@example.com" label="Email">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25V6.75z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5L12 13.5l8.25-6" />
                </svg>
              </SocialIcon>
            </div>

            <div className="hidden items-center gap-3 pt-1 sm:flex md:justify-start">
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition hover:border-cyan-300/70 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5h5.25a2.5 2.5 0 011.768.732l.75.75a2.5 2.5 0 001.768.732H18.5A2.5 2.5 0 0121 9.714v8.786A2.5 2.5 0 0118.5 21h-13A2.5 2.5 0 013 18.5v-11z" />
                  </svg>
                  Projects
                </Link>
              </motion.div>
              <motion.a
                href="https://docs.google.com/document/d/1rAVuu7cZYGYkGqxK24-MLWHf3SxamPqXdVYZm1or89w/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-medium text-slate-100 backdrop-blur-md transition hover:border-cyan-300/70 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h6.879a1.5 1.5 0 011.06.44l3.371 3.371a1.5 1.5 0 01.44 1.06V19.5A1.5 1.5 0 0117.75 21h-10.5A1.5 1.5 0 015.75 19.5v-14A1.5 1.5 0 017.25 4h.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 14.25h7.5M8.25 18h4.5" />
                </svg>
                Resume
              </motion.a>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-1 sm:hidden">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/15 p-2 text-slate-100 backdrop-blur-md transition hover:border-cyan-300/70 hover:text-white"
                  aria-label="Projects"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5h5.25a2.5 2.5 0 011.768.732l.75.75a2.5 2.5 0 001.768.732H18.5A2.5 2.5 0 0121 9.714v8.786A2.5 2.5 0 0118.5 21h-13A2.5 2.5 0 013 18.5v-11z" />
                  </svg>
                </Link>
              </motion.div>
              <motion.a
                href="https://docs.google.com/document/d/1rAVuu7cZYGYkGqxK24-MLWHf3SxamPqXdVYZm1or89w/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/15 p-2 text-slate-100 backdrop-blur-md transition hover:border-cyan-300/70 hover:text-white"
                aria-label="Resume"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h6.879a1.5 1.5 0 011.06.44l3.371 3.371a1.5 1.5 0 01.44 1.06V19.5A1.5 1.5 0 0117.75 21h-10.5A1.5 1.5 0 015.75 19.5v-14A1.5 1.5 0 017.25 4h.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 14.25h7.5M8.25 18h4.5" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-[280px] md:w-[350px] lg:w-[420px]">
              <img src={profileImage} alt="Ravindran S" className="h-auto w-full object-contain" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
