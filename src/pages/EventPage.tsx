import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Carousel } from '../components/ui/Carousel';
import { Badge } from '../components/ui/Badge';
import { CalendarDays, Sparkles, Trophy, Tag } from 'lucide-react';
import { events, popularNews, heroSlides } from '../data/mockData';

const categoryPills = ['Flash Sale', 'Diskon Koin', 'Lucky Draw', 'New Game', 'Double Reward', 'Anniversary'];

export function EventPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredEvents = activeCategory
    ? events.filter(e => e.category === activeCategory)
    : events;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Event & Promo
          </h1>
          <p className="text-muted mt-1">Jangan lewatkan penawaran dan event eksklusif terbaru!</p>
        </div>

        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Main Content (70%) ── */}
          <div className="flex-1 min-w-0">
            {/* Big promo carousel */}
            <Carousel
              slides={heroSlides}
              className="h-48 sm:h-64 md:h-72 mb-8"
              renderSlide={(slide) => {
                const s = slide as typeof heroSlides[0];
                return (
                  <div className={`relative w-full h-full bg-gradient-to-r ${s.bg} flex items-center px-8`}>
                    <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />
                    <div className="relative z-10">
                      <Badge variant="blue" className="mb-3">🎉 Event Spesial</Badge>
                      <h2 className="text-xl sm:text-2xl font-black text-white">{s.title}</h2>
                      <p className="text-white/80 text-sm mt-1">{s.subtitle}</p>
                    </div>
                  </div>
                );
              }}
            />

            {/* Event Cards */}
            <div className="space-y-5">
              {filteredEvents.map(event => (
                <div key={event.id} className="card overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  {/* Banner */}
                  <div className="relative h-44 overflow-hidden bg-gray-200 dark:bg-slate-700">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=f97316&color=fff&size=800&bold=true`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="blue">{event.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted mt-2 leading-relaxed">{event.description}</p>
                    <button className="mt-4 btn-primary px-5 py-2 text-sm rounded-lg">
                      Lihat Detail →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar (30%) ── */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">

            {/* Lucky Draw Widget */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 border border-slate-600 p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white">Lucky Draw</h3>
                <span className="ml-auto text-xs text-yellow-400 font-semibold animate-pulse">LIVE</span>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-yellow-500/20 rounded-xl p-4 mb-4 border border-blue-500/30">
                <div className="text-4xl text-center mb-2">🎰</div>
                <p className="text-white/70 text-xs text-center">Spin & menangkan hadiah eksklusif senilai hingga</p>
                <p className="text-yellow-400 font-black text-xl text-center mt-1">Rp 5.000.000</p>
              </div>
              <div className="space-y-2 mb-4">
                {['iPhone 16 Pro', 'RTX 4090', 'Free Fire 10.000 Diamonds'].map((prize, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-yellow-400 font-bold">{i + 1}.</span>
                    {prize}
                  </div>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white font-bold py-2.5 rounded-xl hover:from-blue-600 hover:to-yellow-600 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Ikut Lucky Draw
              </button>
            </div>

            {/* Category Filter */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Cari Kategori</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryPills.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/30'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular News */}
            <div className="card p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Berita Terpopuler</h3>
              <div className="space-y-4">
                {popularNews.map((news, i) => (
                  <div key={news.id} className="flex gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0">
                      <img
                        src={news.thumbnail}
                        alt={news.title}
                        className="w-16 h-12 object-cover rounded-lg bg-gray-200 dark:bg-slate-700 group-hover:scale-105 transition-transform duration-200"
                        onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=News&background=f97316&color=fff&size=120`; }}
                      />
                      <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
                        {news.title}
                      </p>
                      <p className="text-xs text-muted mt-1 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {news.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
