import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import {
  games, gameDetails, formatPrice, TopupItem,
} from '../data/mockData';
import {
  Share2, ChevronDown, ChevronUp, ShoppingCart,
  HelpCircle, Zap, Clock, CheckCircle, Info,
  Coins, Tag, Phone, Gamepad2, ArrowLeft,
  Copy, X, Loader2,
} from 'lucide-react';

// ─── Payment Result Types ─────────────────────────────────────────────────────
interface PaymentResult {
  type: 'qris' | 'va' | 'cstore';
  order_id: string;
  qr_url?: string;
  va_number?: string;
  bank?: string;
  biller_code?: string;
  bill_key?: string;
  payment_code?: string;
  store?: string;
  expiry_time?: string;
}

// ─── Payment Method Config ────────────────────────────────────────────────────
interface PaymentMethod {
  name: string;
  color: string;
  short: string;
  type: 'qris' | 'va' | 'cstore';
  bank?: string;
  store?: string;
}

interface AccordionItem {
  id: string;
  label: string;
  methods: PaymentMethod[];
}

const paymentGroups: AccordionItem[] = [
  {
    id: 'ewallet',
    label: 'QRIS & E-Wallet',
    methods: [
      { name: 'QRIS',      color: 'from-red-500 to-red-600',       short: 'QRIS', type: 'qris' },
      { name: 'GoPay',     color: 'from-teal-500 to-green-500',    short: 'GPay', type: 'qris' },
    ],
  },
  {
    id: 'va',
    label: 'Transfer Bank / Virtual Account',
    methods: [
      { name: 'BCA',     color: 'from-blue-600 to-blue-700',     short: 'BCA',  type: 'va', bank: 'bca' },
      { name: 'BNI',     color: 'from-orange-600 to-orange-700', short: 'BNI',  type: 'va', bank: 'bni' },
      { name: 'BRI',     color: 'from-sky-500 to-sky-600',       short: 'BRI',  type: 'va', bank: 'bri' },
      { name: 'Mandiri', color: 'from-yellow-500 to-yellow-600', short: 'MDR',  type: 'va', bank: 'mandiri' },
      { name: 'Permata', color: 'from-red-400 to-red-500',       short: 'PRM',  type: 'va', bank: 'permata' },
    ],
  },
  {
    id: 'market',
    label: 'Minimarket',
    methods: [
      { name: 'Indomaret', color: 'from-red-600 to-red-700',  short: 'INDO', type: 'cstore', store: 'indomaret' },
      { name: 'Alfamart',  color: 'from-red-500 to-pink-500', short: 'ALFA', type: 'cstore', store: 'alfamart' },
    ],
  },
];

// ─── Payment Result Display Component ─────────────────────────────────────────
function PaymentResultDisplay({ result, onClose }: { result: PaymentResult; onClose: () => void }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Berhasil disalin!');
  };

  return (
    <div className="mt-4 p-5 bg-white dark:bg-slate-800 border-2 border-blue-300 dark:border-blue-600 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
          {result.type === 'qris' && '📱 Scan QR Code untuk Bayar'}
          {result.type === 'va' && `🏦 Virtual Account ${result.bank?.toUpperCase()}`}
          {result.type === 'cstore' && `🏪 Kode Pembayaran ${result.store}`}
        </h4>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* QRIS - Show QR Code */}
      {result.type === 'qris' && result.qr_url && (
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-inner border">
            <img src={result.qr_url} alt="QR Code" className="w-56 h-56 mx-auto" />
          </div>
          <p className="text-xs text-muted mt-3">Scan QR code di atas menggunakan aplikasi e-wallet atau mobile banking</p>
        </div>
      )}

      {/* VA - Show VA Number */}
      {result.type === 'va' && (
        <div className="text-center space-y-3">
          {result.bank === 'mandiri' ? (
            <>
              <div>
                <p className="text-xs text-muted mb-1">Biller Code</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-black text-gray-900 dark:text-white tracking-widest">{result.biller_code}</span>
                  <button onClick={() => copyToClipboard(result.biller_code || '')} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                    <Copy className="w-4 h-4 text-blue-500" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Bill Key</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-black text-gray-900 dark:text-white tracking-widest">{result.bill_key}</span>
                  <button onClick={() => copyToClipboard(result.bill_key || '')} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                    <Copy className="w-4 h-4 text-blue-500" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p className="text-xs text-muted mb-1">Nomor Virtual Account</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-widest">{result.va_number}</span>
                <button onClick={() => copyToClipboard(result.va_number || '')} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                  <Copy className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </div>
          )}
          <p className="text-xs text-muted">Transfer ke nomor VA di atas melalui ATM, mobile banking, atau internet banking</p>
        </div>
      )}

      {/* CStore - Show Payment Code */}
      {result.type === 'cstore' && (
        <div className="text-center space-y-3">
          <div>
            <p className="text-xs text-muted mb-1">Kode Pembayaran</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-widest">{result.payment_code}</span>
              <button onClick={() => copyToClipboard(result.payment_code || '')} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                <Copy className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>
          <p className="text-xs text-muted">Tunjukkan kode ini ke kasir {result.store} untuk melakukan pembayaran</p>
        </div>
      )}

      {/* Order ID & Expiry */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 space-y-1">
        <p className="text-xs text-muted">Order ID: <span className="font-mono font-bold text-gray-700 dark:text-slate-300">{result.order_id}</span></p>
        {result.expiry_time && (
          <p className="text-xs text-muted">Batas waktu: <span className="font-bold text-red-500">{result.expiry_time}</span></p>
        )}
      </div>
    </div>
  );
}

// ─── Payment Accordion with clickable methods ─────────────────────────────────
function PaymentAccordion({
  onSelectMethod,
  selectedMethod,
  loading,
}: {
  onSelectMethod: (method: PaymentMethod) => void;
  selectedMethod: string | null;
  loading: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>('ewallet');

  return (
    <div className="space-y-2">
      {paymentGroups.map(group => {
        const isOpen = openId === group.id;
        return (
          <div key={group.id} className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : group.id)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{group.label}</span>
              {isOpen
                ? <ChevronUp className="w-4 h-4 text-blue-500" />
                : <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />}
            </button>
            {isOpen && (
              <div className="px-4 py-3 bg-white dark:bg-slate-800 flex flex-wrap gap-2">
                {group.methods.map(m => {
                  const isSelected = selectedMethod === m.name;
                  return (
                    <button
                      key={m.name}
                      title={`Bayar dengan ${m.name}`}
                      disabled={loading}
                      onClick={() => onSelectMethod(m)}
                      className={`h-10 px-4 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSelected ? 'ring-2 ring-offset-2 ring-blue-500 scale-105 shadow-lg' : ''
                      }`}
                    >
                      {loading && isSelected ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : (
                        <span className="text-white text-[10px] font-black tracking-tight">{m.short}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Topup Item Card ──────────────────────────────────────────────────────────
interface ItemCardProps {
  item: TopupItem;
  selected: boolean;
  onSelect: () => void;
}

function ItemCard({ item, selected, onSelect }: ItemCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full text-left p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm shadow-blue-500/20'
          : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
      }`}
    >
      {item.popular && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
          HOT
        </span>
      )}
      {selected && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-white" />
        </span>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl leading-none">{item.icon}</span>
        <span className="text-xs font-semibold text-gray-800 dark:text-slate-200 leading-tight">{item.name}</span>
      </div>
      <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded mb-1">
        -{item.discount}%
      </span>
      <p className="text-blue-500 font-black text-sm">{formatPrice(item.price)}</p>
      <p className="text-gray-400 dark:text-slate-500 text-[10px] line-through">{formatPrice(item.originalPrice)}</p>
      <div className="flex items-center gap-0.5 mt-1">
        <Coins className="w-2.5 h-2.5 text-yellow-500" />
        <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-medium">+{item.bonusCoins} koin</span>
      </div>
    </button>
  );
}

// ─── Step Card wrapper ────────────────────────────────────────────────────────
function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/40">
          <span className="text-white text-sm font-black">{step}</span>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function GameTopupPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game     = games.find(g => g.id === gameId);
  const detail   = gameId ? gameDetails[gameId] : undefined;

  const [userId,     setUserId]     = useState('');
  const [serverId,   setServerId]   = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [promoCode,  setPromoCode]  = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError,   setPromoError]   = useState('');
  const [whatsapp,   setWhatsapp]   = useState('');
  const [ordering,   setOrdering]   = useState(false);

  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const relatedGames = games.filter(g => g.category === 'game' && g.id !== gameId).slice(0, 6);

  if (!game || !detail) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Game tidak ditemukan</h1>
          <p className="text-muted mt-2">Game dengan ID <code className="text-blue-500">{gameId}</code> tidak tersedia.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 btn-primary px-6 py-2.5 rounded-xl text-sm">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedItemData = detail.items.find(i => i.id === selectedItem);

  // Discounted price if promo applied
  const finalPrice = selectedItemData
    ? promoApplied
      ? Math.round(selectedItemData.price * 0.9)
      : selectedItemData.price
    : null;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'DECRAB10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Kode promo tidak valid atau sudah kadaluarsa.');
    }
  };

  // Handle payment method click — directly call Midtrans Core API
  const handlePaymentMethodClick = async (method: PaymentMethod) => {
    if (!userId) return alert('Masukkan User ID terlebih dahulu.');
    if (!selectedItem) return alert('Pilih item top-up terlebih dahulu.');
    if (!whatsapp) return alert('Masukkan nomor WhatsApp untuk notifikasi.');

    setSelectedPaymentMethod(method.name);
    setPaymentLoading(true);
    setPaymentResult(null);

    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      let endpoint = '';
      let body: any = {
        orderId,
        grossAmount: finalPrice,
        itemName: selectedItemData?.name,
        gameName: game.title,
      };

      if (method.type === 'qris') {
        endpoint = '/api/charge/qris';
      } else if (method.type === 'va') {
        endpoint = '/api/charge/bank-transfer';
        body.bank = method.bank;
      } else if (method.type === 'cstore') {
        endpoint = '/api/charge/cstore';
        body.store = method.store;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server error (${response.status}): ${text || 'Empty response'}`);
      }

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Gagal membuat pembayaran');
      }

      setPaymentResult({
        type: method.type,
        order_id: data.order_id,
        qr_url: data.qr_url,
        va_number: data.va_number,
        bank: data.bank,
        biller_code: data.biller_code,
        bill_key: data.bill_key,
        payment_code: data.payment_code,
        store: data.store,
        expiry_time: data.expiry_time,
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(`❌ Gagal: ${error.message}`);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <Layout>
      {/* ── Header Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-amber-400">
        <img
          src={detail.banner}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-105"
        />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute right-40 -bottom-12 w-48 h-48 rounded-full bg-white/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl flex-shrink-0 bg-white/10">
                <img
                  src={detail.icon}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(game.title)}&background=f97316&color=fff&size=200&bold=true`; }}
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow">{game.title}</h1>
                <p className="text-white/80 text-sm mt-1">{detail.developer}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1.5 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" /> Instan
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> 24/7
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-amber-700/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> ID Check
                  </span>
                </div>
              </div>
            </div>
            <button className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/50 text-white text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left Sidebar ── */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-5 order-2 lg:order-1">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Petunjuk Top-up</h3>
              </div>
              <ol className="space-y-2.5">
                {[
                  'Pilih game dan nominal yang ingin dibeli.',
                  `Masukkan ${detail.idLabel}${detail.serverLabel ? ` dan ${detail.serverLabel}` : ''} dengan benar.`,
                  'Pilih metode pembayaran — klik untuk langsung bayar.',
                  'QR Code / Nomor VA akan langsung muncul.',
                  'Selesaikan pembayaran sebelum batas waktu.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-slate-400">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Gamepad2 className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Game Terkait</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {relatedGames.map(g => (
                  <Link key={g.id} to={`/game/${g.id}`} title={g.title}>
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 hover:scale-105 transition-transform duration-200 cursor-pointer shadow-sm">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(g.title)}&background=1e293b&color=f97316&size=120&bold=true`; }}
                      />
                    </div>
                    <p className="text-[10px] text-center text-muted mt-1 truncate">{g.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Right Column (Steps) ── */}
          <div className="flex-1 min-w-0 space-y-4 order-1 lg:order-2">

            {/* Step 1 — User ID */}
            <StepCard step={1} title="Masukkan ID Game">
              <div className={`grid gap-3 ${detail.serverLabel ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">{detail.idLabel}</label>
                    <button className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 font-medium">
                      <HelpCircle className="w-3 h-3" />
                      Info ID Game?
                    </button>
                  </div>
                  <input
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder={`Contoh: 123456789`}
                    className="input-field text-sm"
                  />
                </div>
                {detail.serverLabel && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 block mb-1.5">
                      {detail.serverLabel}
                    </label>
                    <input
                      type="text"
                      value={serverId}
                      onChange={e => setServerId(e.target.value)}
                      placeholder="Contoh: 2201"
                      className="input-field text-sm"
                    />
                  </div>
                )}
              </div>
              {userId && (
                <div className="mt-3 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-xl px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    ID terdeteksi — pastikan sudah benar sebelum melanjutkan.
                  </span>
                </div>
              )}
            </StepCard>

            {/* Step 2 — Pilih Item */}
            <StepCard step={2} title="Pilih Item">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {detail.items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selectedItem === item.id}
                    onSelect={() => { setSelectedItem(item.id); setPaymentResult(null); }}
                  />
                ))}
              </div>
              {selectedItemData && (
                <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedItemData.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedItemData.name}</p>
                      <p className="text-xs text-muted">{game.title}</p>
                    </div>
                  </div>
                  <p className="font-black text-blue-500">{formatPrice(selectedItemData.price)}</p>
                </div>
              )}
            </StepCard>

            {/* Step 3 — Kode Promo */}
            <StepCard step={3} title="Punya Kode Promo?">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoApplied(false); setPromoError(''); }}
                    placeholder="Masukkan kode promo"
                    className="input-field pl-10 text-sm font-mono tracking-wider"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="btn-primary px-5 py-2.5 rounded-xl text-sm flex-shrink-0"
                >
                  Gunakan
                </button>
              </div>
              {promoApplied && (
                <div className="mt-2.5 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-xl px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Kode <span className="font-black">{promoCode}</span> berhasil — diskon 10% diterapkan! 🎉
                  </p>
                </div>
              )}
              {promoError && (
                <p className="mt-2 text-xs text-red-500 font-medium">{promoError}</p>
              )}
              <p className="text-xs text-muted mt-2">Coba kode: <code className="text-blue-500 font-mono font-bold">DECRAB10</code> untuk diskon 10%.</p>
            </StepCard>

            {/* Step 4 — Kontak */}
            <StepCard step={4} title="Kontak (WhatsApp)">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="input-field pl-11 text-sm"
                />
              </div>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                Nomor WhatsApp aktif diperlukan untuk menerima notifikasi status pesanan.
              </p>
            </StepCard>

            {/* Order Summary */}
            {selectedItemData && (
              <div className="card p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-700/50">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Ringkasan Pesanan</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Item</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedItemData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Harga</span>
                    <span className="line-through text-gray-400">{formatPrice(selectedItemData.originalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Diskon item</span>
                    <span className="text-emerald-500 font-medium">-{selectedItemData.discount}%</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between">
                      <span className="text-muted">Promo {promoCode}</span>
                      <span className="text-emerald-500 font-medium">-10%</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted">Bonus Koin</span>
                    <span className="text-yellow-500 font-medium flex items-center gap-1">
                      <Coins className="w-3 h-3" /> +{selectedItemData.bonusCoins} koin
                    </span>
                  </div>
                  <div className="border-t border-blue-200 dark:border-blue-700/50 pt-2 flex justify-between font-black text-base">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-blue-500">{formatPrice(finalPrice!)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Metode Pembayaran (Klik langsung bayar) */}
            <StepCard step={5} title="Pilih & Bayar — Klik Metode Pembayaran">
              <p className="text-xs text-muted mb-3">
                Klik metode pembayaran di bawah untuk langsung mendapatkan QR Code / Nomor VA.
              </p>
              <PaymentAccordion
                onSelectMethod={handlePaymentMethodClick}
                selectedMethod={selectedPaymentMethod}
                loading={paymentLoading}
              />

              {/* Payment Result — QR Code / VA Number / Payment Code */}
              {paymentResult && (
                <PaymentResultDisplay
                  result={paymentResult}
                  onClose={() => { setPaymentResult(null); setSelectedPaymentMethod(null); }}
                />
              )}
            </StepCard>

            <p className="text-center text-xs text-muted pb-4">
              🔒 Transaksi aman via Midtrans (Sandbox). Proses instan 24/7.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
