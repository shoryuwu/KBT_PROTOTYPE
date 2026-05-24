import React from 'react';
import { Badge } from './Badge';
import { formatPrice, Transaction } from '../../data/mockData';
import { CalendarDays, Clock, Receipt } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  showDetail?: boolean;
  onDetail?: () => void;
}

const statusVariant = {
  'Berhasil':      'success',
  'Pending':       'warning',
  'Gagal':         'danger',
  'Belum Dibayar': 'neutral',
} as const;

export function TransactionCard({ transaction, showDetail = false, onDetail }: TransactionCardProps) {
  return (
    <div className="card p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 animate-in">
      <div className="flex items-start gap-3">
        {/* Game icon */}
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-slate-700">
          <img
            src={transaction.gameIcon}
            alt={transaction.game}
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(transaction.game)}&background=f97316&color=fff&size=80`; }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{transaction.game}</p>
              <p className="text-muted text-xs">{transaction.product}</p>
            </div>
            <Badge variant={statusVariant[transaction.status]} dot>
              {transaction.status}
            </Badge>
          </div>

          {/* Invoice */}
          <div className="flex items-center gap-1 mt-1.5">
            <Receipt className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-muted font-mono">{transaction.invoice}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {transaction.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {transaction.time}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-500 text-sm">{formatPrice(transaction.price)}</span>
          {showDetail && (
            <button
              onClick={onDetail}
              className="text-xs border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2.5 py-1 rounded-lg transition-colors duration-150"
            >
              Lihat Detail
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
