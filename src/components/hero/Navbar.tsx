import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

type NavbarProps = {
  activeTab?: 'About' | 'Portfolio' | 'Contact';
};

const items: Array<NavbarProps['activeTab']> = ['About', 'Portfolio', 'Contact'];
const tabPath: Record<NonNullable<NavbarProps['activeTab']>, string> = {
  About: '/about',
  Portfolio: '/projects',
  Contact: '/contact',
};

export default function Navbar({ activeTab = 'Portfolio' }: NavbarProps) {
  const location = useLocation();

  return (
    <header className="sticky top-4 z-40 w-full px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white">
          &lt;Ravindran /&gt;
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item) => {
            const path = tabPath[item];
            const isActive = location.pathname === path || (location.pathname === '/' && item === activeTab);
            return (
              <Link
                key={item}
                to={path}
                className={`group relative py-1 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <motion.div
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/contact"
            className="rounded-lg border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
