import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Coins, ChevronDown, User, LogOut, Settings, Receipt, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/event', label: 'Event' },
  { to: '/riwayat', label: 'Riwayat' },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-700/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/image/logo.png" alt="Decrab Topup" className="w-10 h-10 object-contain" />
            <span className="text-lg font-black tracking-tight">
              <span className="text-blue-700 dark:text-blue-500">DECRAB</span>
              <span className="text-gray-900 dark:text-white"> TOPUP</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link px-4 py-2 rounded-lg ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 text-gray-600 dark:text-slate-300"
            >
              {isDark
                ? <Sun className="w-4.5 h-4.5" />
                : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* User Dropdown */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(o => !o)}
                  className="hidden md:flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full bg-blue-100"
                  />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-none">{user.name}</p>
                    <p className="text-xs text-blue-500 font-medium flex items-center gap-0.5 mt-0.5">
                      <Coins className="w-3 h-3" />
                      {user.coins} koin
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 card shadow-xl py-1.5 animate-in">
                    <div className="px-4 py-2.5 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Coins className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-bold text-blue-500">{user.coins} Koin</span>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <User className="w-4 h-4" /> Profil Saya
                      </Link>
                      <Link to="/riwayat" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <Receipt className="w-4 h-4" /> Riwayat
                      </Link>
                      <Link to="/profile#settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <Settings className="w-4 h-4" /> Pengaturan
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 dark:border-slate-700 pt-1">
                      <button className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === to
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
              >
                {label}
              </Link>
            ))}
            {user && (
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 mt-2 rounded-xl bg-blue-50 dark:bg-blue-900/20"
              >
                <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-blue-500 font-medium">{user.coins} Koin</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
