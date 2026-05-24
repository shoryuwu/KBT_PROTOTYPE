import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { TransactionCard } from '../components/ui/TransactionCard';
import { useAuth } from '../context/AuthContext';
import { Camera, Coins, ChevronLeft, ChevronRight, LogOut, KeyRound, Shield } from 'lucide-react';
import { transactions } from '../data/mockData';
import { Badge } from '../components/ui/Badge';

const ITEMS_PER_PAGE = 4;

const tierColors: Record<string, string> = {
  Stone:   'from-gray-400 to-gray-500',
  Bronze:  'from-amber-600 to-amber-700',
  Silver:  'from-gray-400 to-gray-300',
  Gold:    'from-yellow-400 to-yellow-500',
  Diamond: 'from-blue-400 to-cyan-400',
};

export function ProfilePage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <p className="text-muted">Silakan login terlebih dahulu.</p>
        </div>
      </Layout>
    );
  }

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTx = transactions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const tierGradient = tierColors[user.tier] || tierColors.Stone;
  const progressPct = Math.round((user.tierProgress / user.tierMax) * 100);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Profil Saya</h1>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar (30%) ── */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">

            {/* Profile Card */}
            <div className="card p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mx-auto"
                />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <h2 className="font-bold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-sm text-muted mt-0.5">{user.email}</p>
              <Badge variant="blue" className="mt-3">Member Aktif</Badge>
            </div>

            {/* Tier Card */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">Tier Saya</h3>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${tierGradient}`}>
                  {user.tier}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${tierGradient} transition-all duration-700`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted">
                <span>{user.tierProgress} XP</span>
                <span>{user.tierMax} XP</span>
              </div>
              <p className="text-xs text-muted mt-2">
                {user.tierMax - user.tierProgress} XP lagi untuk tier berikutnya
              </p>
            </div>

            {/* Coin Card */}
            <div className="card p-5 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-900/20 dark:to-amber-900/20 border-blue-200 dark:border-blue-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">Koin Saya</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl font-black text-blue-500">{user.coins}</span>
                <span className="text-lg font-bold text-blue-400">Koin</span>
              </div>
              <p className="text-xs text-muted mb-3">
                Koin dapat ditukar dengan diskon pembelian berikutnya.
              </p>
              <button className="w-full btn-outline py-2 text-sm rounded-xl">
                Tukar Koin
              </button>
            </div>

            {/* Quick Links */}
            <div className="card p-3">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <KeyRound className="w-4 h-4 text-blue-500" />
                Reset Password
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1">
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </aside>

          {/* ── Main Content (70%) ── */}
          <div className="flex-1 min-w-0">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Riwayat Transaksi</h2>

              {/* Transaction List */}
              <div className="space-y-3">
                {paginatedTx.map(tx => (
                  <TransactionCard key={tx.id} transaction={tx} showDetail onDetail={() => {}} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                <p className="text-sm text-muted">
                  Halaman <span className="font-bold text-gray-900 dark:text-white">{page}</span> dari{' '}
                  <span className="font-bold text-gray-900 dark:text-white">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-slate-600 hover:border-blue-400 hover:text-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${
                        p === page
                          ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/30'
                          : 'border border-gray-200 dark:border-slate-600 hover:border-blue-400 hover:text-blue-500 text-gray-700 dark:text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-slate-600 hover:border-blue-400 hover:text-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
