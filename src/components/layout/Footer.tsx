import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Globe, Send, PlayCircle, MessageCircle } from 'lucide-react';

const navLinks = [
  { to: '/',                    label: 'Home'                  },
  { to: '/event',               label: 'Event'                 },
  { to: '/riwayat',             label: 'Riwayat'               },
  { to: '/hubungi-admin',       label: 'Hubungi Admin'         },
  { to: '/syarat-ketentuan',    label: 'Syarat & Ketentuan'    },
  { to: '/kebijakan-privasi',   label: 'Kebijakan Privasi'     },
];

const paymentMethods = [
  { name: 'QRIS',       color: 'from-red-500 to-red-600',     short: 'QRIS'    },
  { name: 'DANA',       color: 'from-blue-500 to-blue-600',   short: 'DANA'    },
  { name: 'ShopeePay', color: 'from-orange-500 to-red-500',  short: 'SPay'    },
  { name: 'OVO',        color: 'from-purple-600 to-purple-700', short: 'OVO'  },
  { name: 'GoPay',      color: 'from-teal-500 to-green-500',  short: 'GPay'    },
  { name: 'BCA',        color: 'from-blue-600 to-blue-700',   short: 'BCA'     },
  { name: 'BNI',        color: 'from-orange-600 to-orange-700', short: 'BNI'  },
  { name: 'Mandiri',    color: 'from-yellow-500 to-yellow-600', short: 'MDR'  },
  { name: 'Indomaret',  color: 'from-red-600 to-red-700',     short: 'INDO'    },
  { name: 'Alfamart',   color: 'from-red-500 to-pink-500',    short: 'ALFA'    },
];

const socialLinks = [
  { icon: Globe,         href: '#', label: 'Website'   },
  { icon: Send,          href: '#', label: 'Telegram'  },
  { icon: PlayCircle,    href: '#', label: 'YouTube'   },
  { icon: MessageCircle, href: '#', label: 'WhatsApp'  },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Col 1: Logo + Desc ── */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/image/logo.png" alt="Decrab Topup" className="w-10 h-10 object-contain" />
              <span className="text-lg font-black tracking-tight">
                <span className="text-blue-700 dark:text-blue-500">DECRAB</span>
                <span className="text-gray-900 dark:text-white"> TOPUP</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Platform top-up game terpercaya di Indonesia. Proses instan, harga terjangkau, layanan 24 jam.
            </p>
            {/* Social */}
            <div className="flex gap-2.5 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Links ── */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Navigasi</h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-muted hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Payment Methods ── */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Metode Pembayaran</h3>
            <div className="grid grid-cols-5 gap-2">
              {paymentMethods.map(({ name, color, short }) => (
                <div
                  key={name}
                  title={name}
                  className={`h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-150`}
                >
                  <span className="text-white text-[9px] font-black tracking-tight">{short}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-3">
              Transaksi Anda dilindungi dengan enkripsi SSL 256-bit
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-xs text-muted">Terpercaya & Aman</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted">
            © 2026 DECRAB TOPUP. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
