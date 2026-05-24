import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const { isDark, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      window.location.href = '/';
    } catch {
      setError('Email atau password salah. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Left decorative panel — hidden on small */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa)' }}>
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -right-12 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="w-32 h-32 mb-6 drop-shadow-2xl">
            <img src="/image/logo.png" alt="Decrab Topup" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-4xl font-black text-center leading-tight">
            DECRAB<br />TOPUP
          </h2>
          <p className="text-white/80 text-center mt-4 max-w-xs text-sm leading-relaxed">
            Platform top-up game terpercaya dengan proses instan dan harga terbaik di Indonesia.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-3 w-full max-w-xs">
            {[
              { emoji: '⚡', text: 'Proses top-up instan' },
              { emoji: '🔒', text: 'Transaksi 100% aman' },
              { emoji: '💎', text: 'Harga terbaik dijamin' },
              { emoji: '🎁', text: 'Dapatkan koin reward' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <span className="text-xl">{emoji}</span>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5 text-blue-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        <div className="w-full max-w-md">
          {/* Logo (mobile only) */}
          <div className="flex items-center gap-2.5 justify-center mb-8 lg:hidden">
            <img src="/image/logo.png" alt="Decrab Topup" className="w-10 h-10 object-contain" />
            <span className="text-xl font-black">
              <span className="text-blue-700 dark:text-blue-500">DECRAB</span>
              <span className="text-gray-900 dark:text-white"> TOPUP</span>
            </span>
          </div>

          <div className="card p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">Masuk ke Akun</h1>
              <p className="text-sm text-muted mt-1">Selamat datang kembali! Masukkan kredensialmu.</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="input-field pl-11"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="input-field pl-11 pr-11"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(o => !o)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <Link to="/lupa-password" className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
                  Lupa Password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
              <span className="text-xs text-muted font-medium">atau</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
            </div>

            {/* Register */}
            <p className="text-center text-sm text-muted">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-600 font-bold">
                Daftar Sekarang
              </Link>
            </p>
          </div>

          {/* Back to home */}
          <p className="text-center mt-5">
            <Link to="/" className="text-sm text-muted hover:text-blue-500 transition-colors">
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
