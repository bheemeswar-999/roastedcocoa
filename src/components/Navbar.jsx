import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-cream/90 shadow-lg shadow-espresso/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 font-serif text-2xl font-semibold tracking-wide text-espresso">
          <img src="/logo.svg" alt="Roasted Cocoa logo" className="h-11 w-11 rounded-3xl border border-espresso/10 bg-white/90 p-2 shadow-premium" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">Roasted Cocoa</span>
            <span className="text-xs uppercase tracking-[0.35em] text-espresso/60">Handcrafted Chocolates</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium uppercase tracking-[0.24em] transition hover:text-cocoa ${
                  isActive ? 'text-espresso' : 'text-espresso/70'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-full border border-espresso/10 bg-cream p-2 text-espresso shadow-sm md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-espresso/10 bg-cream/95 px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                    isActive ? 'bg-gold/20 text-espresso' : 'text-espresso/80 hover:bg-espresso/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}

export default Navbar;
