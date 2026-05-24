import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { TransactionCard } from '../components/ui/TransactionCard';
import { Search, ReceiptText } from 'lucide-react';
import { transactions } from '../data/mockData';

export function RiwayatPage() {
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [filteredResult, setFilteredResult] = useState(transactions);

  const handleSearch = () => {
    if (!invoiceSearch.trim()) {
      setFilteredResult(transactions);
      setSearched(false);
      return;
    }
    const result = transactions.filter(t =>
      t.invoice.toLowerCase().includes(invoiceSearch.toLowerCase())
    );
    setFilteredResult(result);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ReceiptText className="w-7 h-7 text-blue-500" />
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Riwayat Transaksi</h1>
          </div>
          <p className="text-muted">Cek status transaksi dan riwayat pembelianmu di sini.</p>
        </div>

        {/* Invoice Search */}
        <div className="card p-6 mb-8">
          <h2 className="font-bold text-gray-900 dark:text-white mb-1">Cek Status Transaksi</h2>
          <p className="text-sm text-muted mb-4">Masukkan nomor invoice untuk melihat detail transaksi.</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={invoiceSearch}
                onChange={e => setInvoiceSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Masukkan nomor invoice (contoh: satset*****182a)"
                className="input-field pl-12"
              />
            </div>
            <button
              onClick={handleSearch}
              className="btn-primary px-7 py-3 rounded-xl flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Cek
            </button>
          </div>
        </div>

        {/* Results / Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">
              {searched ? `Hasil Pencarian (${filteredResult.length})` : 'Transaksi Terbaru'}
            </h2>
            {searched && (
              <button
                onClick={() => { setInvoiceSearch(''); setSearched(false); setFilteredResult(transactions); }}
                className="text-sm text-blue-500 font-semibold hover:text-blue-600"
              >
                Reset
              </button>
            )}
          </div>

          {filteredResult.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResult.map(tx => (
                <TransactionCard key={tx.id} transaction={tx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-muted text-lg">Transaksi tidak ditemukan</p>
              <p className="text-muted text-sm mt-1">Periksa kembali nomor invoice Anda</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
