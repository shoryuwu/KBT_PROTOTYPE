import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Carousel } from '../components/ui/Carousel';
import { CountdownTimer } from '../components/ui/CountdownTimer';
import { ProductCard } from '../components/ui/ProductCard';
import { GameCard, PopularGameCard } from '../components/ui/GameCard';
import { Flame, Zap, Search } from 'lucide-react';
import { heroSlides, flashSaleProducts, games } from '../data/mockData';

type CategoryTab = 'game' | 'voucher' | 'pulsa' | 'entertainment';

const categoryTabs: { id: CategoryTab; label: string }[] = [
  { id: 'game',          label: '🎮 Game'          },
  { id: 'voucher',       label: '🎁 Voucher'       },
  { id: 'pulsa',         label: '📱 Pulsa'         },
  { id: 'entertainment', label: '🎬 Entertainment' },
];

export function HomePage() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('game');
  const [searchQuery, setSearchQuery] = useState('');

  const popularGames = games.filter(g => g.popular);
  const filteredGames = games.filter(g =>
    g.category === activeTab &&
    (searchQuery === '' || g.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      {/* ── Hero Carousel ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Carousel
          slides={heroSlides}
          className="h-56 sm:h-72 md:h-96"
          renderSlide={(slide) => {
            const s = slide as typeof heroSlides[0];
            return (
              <div className={`relative w-full h-full bg-gradient-to-r ${s.bg} flex items-center overflow-hidden`}>
                {/* BG image with overlay */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
                />
                {/* Decorative circles */}
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
                <div className="absolute -right-8 -bottom-16 w-48 h-48 rounded-full bg-white/10" />

                <div className="relative z-10 px-8 sm:px-12 max-w-2xl">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    🔥 Promo Spesial
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
                    {s.title}
                  </h1>
                  <p className="mt-2 text-white/85 text-sm sm:text-base">{s.subtitle}</p>
                  <button className="mt-5 bg-white text-blue-600 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                    {s.cta} →
                  </button>
                </div>
              </div>
            );
          }}
        />
      </section>

      {/* ── Flash Sale ── */}
      <section className="mt-8 mx-4 sm:mx-6 lg:mx-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #428a91, #6f9c97, #aecdc7)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-white" fill="white" />
                <h2 className="text-xl font-black text-white">Flash Sale</h2>
              </div>
              <span className="text-white/70 text-sm hidden sm:block">Berakhir dalam:</span>
              <CountdownTimer targetHours={6} targetMinutes={57} targetSeconds={42} />
            </div>
            <button className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-2 hidden sm:block">
              Lihat Semua
            </button>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Games ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-blue-500" fill="currentColor" />
            <h2 className="section-title">Game Populer</h2>
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold">Lihat Semua →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
          {popularGames.map(game => (
            <PopularGameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* ── Main Catalog ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-12">
        <h2 className="section-title mb-5">Semua Produk</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-blue-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari game favoritmu..."
            className="input-field pl-12"
          />
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} size="lg" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-muted text-lg">Tidak ada produk ditemukan untuk "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-blue-500 font-semibold">Reset Pencarian</button>
          </div>
        )}
      </section>
    </Layout>
  );
}
