export interface Game {
  id: string;
  title: string;
  genre: string;
  country: string;
  countryFlag: string;
  image: string;
  category: 'game' | 'voucher' | 'pulsa' | 'entertainment';
  popular?: boolean;
}

export interface FlashSaleProduct {
  id: string;
  name: string;
  game: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  sold: number;
}

export interface Transaction {
  id: string;
  invoice: string;
  game: string;
  gameIcon: string;
  product: string;
  price: number;
  date: string;
  time: string;
  status: 'Berhasil' | 'Pending' | 'Gagal' | 'Belum Dibayar';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  banner: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}

// ─── Games ────────────────────────────────────────────────────────────────────
export const games: Game[] = [
  { id: 'g1', title: 'Mobile Legends', genre: 'MOBA', country: 'Indonesia', countryFlag: '🇮🇩', image: '/image/ML.jpg', category: 'game', popular: true },
  { id: 'g2', title: 'Free Fire', genre: 'Battle Royale', country: 'Indonesia', countryFlag: '🇮🇩', image: '/image/FF.png', category: 'game', popular: true },
  { id: 'g3', title: 'Honkai: Star Rail', genre: 'RPG', country: 'China', countryFlag: '🇨🇳', image: '/image/HSR.jpg', category: 'game', popular: true },
  { id: 'g4', title: 'Genshin Impact', genre: 'RPG', country: 'China', countryFlag: '🇨🇳', image: '/image/GI.jpg', category: 'game' },
  { id: 'g5', title: 'PUBG Mobile', genre: 'Battle Royale', country: 'Korea', countryFlag: '🇰🇷', image: '/image/PUBG.png', category: 'game' },
  { id: 'g6', title: 'Valorant', genre: 'FPS', country: 'USA', countryFlag: '🇺🇸', image: '/image/VAL.png', category: 'game' },
  { id: 'g7', title: 'Call of Duty Mobile', genre: 'FPS', country: 'USA', countryFlag: '🇺🇸', image: '/image/COD.png', category: 'game' },
  { id: 'g8', title: 'League of Legends', genre: 'MOBA', country: 'USA', countryFlag: '🇺🇸', image: '/image/LOL.png', category: 'game' },
  { id: 'g9', title: 'Clash of Clans', genre: 'Strategy', country: 'Finland', countryFlag: '🇫🇮', image: '/image/COC.png', category: 'game' },
  { id: 'g10', title: 'Roblox', genre: 'Sandbox', country: 'USA', countryFlag: '🇺🇸', image: '/image/ROBLOX.webp', category: 'game' },
  { id: 'g11', title: 'Minecraft', genre: 'Sandbox', country: 'Sweden', countryFlag: '🇸🇪', image: '/image/MC.jpg', category: 'game' },
  { id: 'g12', title: 'Ragnarok Origin', genre: 'MMORPG', country: 'Korea', countryFlag: '🇰🇷', image: '/image/RAG.png', category: 'game' },
  { id: 'v1', title: 'Steam Wallet', genre: 'Voucher Game', country: 'USA', countryFlag: '🇺🇸', image: 'https://picsum.photos/seed/steam/400/300', category: 'voucher' },
  { id: 'v2', title: 'Google Play Gift Card', genre: 'Voucher', country: 'USA', countryFlag: '🇺🇸', image: 'https://picsum.photos/seed/googleplay/400/300', category: 'voucher' },
  { id: 'v3', title: 'PlayStation Store', genre: 'Voucher Game', country: 'Japan', countryFlag: '🇯🇵', image: 'https://picsum.photos/seed/playstation/400/300', category: 'voucher' },
  { id: 'p1', title: 'Telkomsel', genre: 'Pulsa & Data', country: 'Indonesia', countryFlag: '🇮🇩', image: 'https://picsum.photos/seed/telkomsel/400/300', category: 'pulsa' },
  { id: 'p2', title: 'Indosat Ooredoo', genre: 'Pulsa & Data', country: 'Indonesia', countryFlag: '🇮🇩', image: 'https://picsum.photos/seed/indosat/400/300', category: 'pulsa' },
  { id: 'e1', title: 'Netflix', genre: 'Streaming', country: 'USA', countryFlag: '🇺🇸', image: 'https://picsum.photos/seed/netflix/400/300', category: 'entertainment' },
  { id: 'e2', title: 'Spotify Premium', genre: 'Music', country: 'Sweden', countryFlag: '🇸🇪', image: 'https://picsum.photos/seed/spotify/400/300', category: 'entertainment' },
];

// ─── Flash Sale ────────────────────────────────────────────────────────────────
export const flashSaleProducts: FlashSaleProduct[] = [
  { id: 'fs1', name: '86 Diamonds', game: 'Mobile Legends', image: '/image/ML.jpg', price: 19500, originalPrice: 26000, discount: 25, sold: 847 },
  { id: 'fs2', name: '100 Crystals', game: 'Free Fire', image: '/image/FF.png', price: 14900, originalPrice: 20000, discount: 26, sold: 1203 },
  { id: 'fs3', name: '60 Stellar Jade', game: 'Honkai: Star Rail', image: '/image/HSR.jpg', price: 12000, originalPrice: 18000, discount: 33, sold: 562 },
  { id: 'fs4', name: '160 Genesis Crystals', game: 'Genshin Impact', image: '/image/GI.jpg', price: 29000, originalPrice: 40000, discount: 28, sold: 934 },
  { id: 'fs5', name: '325 UC', game: 'PUBG Mobile', image: '/image/PUBG.png', price: 45000, originalPrice: 60000, discount: 25, sold: 721 },
  { id: 'fs6', name: '1000 VP', game: 'Valorant', image: '/image/VAL.png', price: 75000, originalPrice: 100000, discount: 25, sold: 412 },
];

// ─── Transactions ─────────────────────────────────────────────────────────────
export const transactions: Transaction[] = [
  { id: 't1', invoice: 'satset*****a1b2', game: 'Mobile Legends', gameIcon: '/image/ML.jpg', product: '86 Diamonds', price: 19500, date: '14 Mei 2026', time: '14:32', status: 'Berhasil' },
  { id: 't2', invoice: 'satset*****c3d4', game: 'Free Fire', gameIcon: '/image/FF.png', product: '100 Crystals', price: 14900, date: '13 Mei 2026', time: '09:17', status: 'Berhasil' },
  { id: 't3', invoice: 'satset*****e5f6', game: 'Honkai: Star Rail', gameIcon: '/image/HSR.jpg', product: '60 Stellar Jade', price: 12000, date: '12 Mei 2026', time: '21:05', status: 'Pending' },
  { id: 't4', invoice: 'satset*****182a', game: 'Genshin Impact', gameIcon: '/image/GI.jpg', product: '160 Genesis Crystals', price: 29000, date: '11 Mei 2026', time: '16:44', status: 'Berhasil' },
  { id: 't5', invoice: 'satset*****g7h8', game: 'PUBG Mobile', gameIcon: '/image/PUBG.png', product: '325 UC', price: 45000, date: '10 Mei 2026', time: '11:22', status: 'Gagal' },
  { id: 't6', invoice: 'satset*****i9j0', game: 'Valorant', gameIcon: '/image/VAL.png', product: '1000 VP', price: 75000, date: '09 Mei 2026', time: '08:59', status: 'Berhasil' },
  { id: 't7', invoice: 'satset*****k1l2', game: 'Mobile Legends', gameIcon: '/image/ML.jpg', product: '172 Diamonds', price: 38000, date: '08 Mei 2026', time: '19:30', status: 'Berhasil' },
  { id: 't8', invoice: 'satset*****m3n4', game: 'Roblox', gameIcon: '/image/ROBLOX.webp', product: '800 Robux', price: 52000, date: '07 Mei 2026', time: '14:15', status: 'Belum Dibayar' },
  { id: 't9', invoice: 'satset*****o5p6', game: 'Spotify', gameIcon: 'https://picsum.photos/seed/spotify-icon/80/80', product: 'Premium 1 Bulan', price: 29000, date: '06 Mei 2026', time: '10:00', status: 'Berhasil' },
  { id: 't10', invoice: 'satset*****q7r8', game: 'Netflix', gameIcon: 'https://picsum.photos/seed/netflix-icon/80/80', product: 'Basic 1 Bulan', price: 54000, date: '05 Mei 2026', time: '22:10', status: 'Berhasil' },
];

// ─── Events ───────────────────────────────────────────────────────────────────
export const events: Event[] = [
  { id: 'ev1', title: 'Flash Sale Ramadan Special — Diskon hingga 40%!', date: '14 Mei 2026', description: 'Dapatkan diamond dan skin terbaikmu dengan harga spesial selama Ramadan. Stok terbatas!', banner: 'https://picsum.photos/seed/event-ramadan/800/350', category: 'Flash Sale' },
  { id: 'ev2', title: 'Weekend Warriors — Double XP Event', date: '16–17 Mei 2026', description: 'Mainkan game favorit dan raih double reward setiap akhir pekan. Berlaku untuk semua game.', banner: 'https://picsum.photos/seed/event-weekend/800/350', category: 'Diskon Koin' },
  { id: 'ev3', title: 'Lucky Draw Spesial Anniversary SATSET', date: '20 Mei 2026', description: 'Rayakan 1 tahun SATSET STORE bersama kami! Menangkan hadiah eksklusif senilai jutaan rupiah.', banner: 'https://picsum.photos/seed/event-anniversary/800/350', category: 'Lucky Draw' },
  { id: 'ev4', title: 'New Game Launch — Valorant Season 9', date: '25 Mei 2026', description: 'Season baru Valorant hadir! Dapatkan VP eksklusif dengan bonus tambahan hanya di SATSET.', banner: '/image/VAL.png', category: 'New Game' },
];

export const popularNews: NewsItem[] = [
  { id: 'n1', title: 'Update Mobile Legends Patch 1.8.50 — Hero Baru & Balance Changes', date: '13 Mei 2026', thumbnail: '/image/ML.jpg' },
  { id: 'n2', title: 'Genshin Impact 4.7 — Semua yang Perlu Kamu Tahu', date: '12 Mei 2026', thumbnail: '/image/GI.jpg' },
  { id: 'n3', title: 'Tips Hemat Top Up Diamond Mobile Legends 2026', date: '11 Mei 2026', thumbnail: '/image/ML.jpg' },
  { id: 'n4', title: 'Free Fire OB45 Update — Karakter & Senjata Baru', date: '10 Mei 2026', thumbnail: '/image/FF.png' },
];

export const heroSlides = [
  { id: 'h1', title: 'Top Up Mobile Legends', subtitle: 'Promo spesial diamond hingga 30% off!', bg: 'from-blue-600 via-blue-500 to-amber-400', image: '/image/ML.jpg', cta: 'Top Up Sekarang' },
  { id: 'h2', title: 'Free Fire Anniversary', subtitle: 'Dapatkan Crystal eksklusif edisi terbatas', bg: 'from-red-600 via-blue-500 to-yellow-400', image: '/image/FF.png', cta: 'Klaim Sekarang' },
  { id: 'h3', title: 'Honkai: Star Rail Event', subtitle: 'Stellar Jade double bonus minggu ini!', bg: 'from-purple-700 via-purple-500 to-blue-400', image: '/image/HSR.webp', cta: 'Lihat Event' },
];

export const formatPrice = (price: number): string =>
  `Rp ${price.toLocaleString('id-ID')}`;

// ─── Top-up Item ──────────────────────────────────────────────────────────────
export interface TopupItem {
  id: string;
  name: string;
  icon: string;        // emoji or image url
  price: number;
  originalPrice: number;
  discount: number;
  bonusCoins: number;
  popular?: boolean;
}

export interface GameDetail {
  id: string;           // matches Game.id
  developer: string;
  icon: string;         // path to square icon
  banner: string;       // wide banner
  idLabel: string;      // label for first input
  serverLabel?: string; // label for second input (optional)
  items: TopupItem[];
}

export const gameDetails: Record<string, GameDetail> = {
  g1: {
    id: 'g1',
    developer: 'Moonton',
    icon: '/image/ML.jpg',
    banner: '/image/ML.jpg',
    idLabel: 'User ID',
    serverLabel: 'Zone ID',
    items: [
      { id: 'ml-1',  name: '86 Diamonds',    icon: '💎', price: 19500,  originalPrice: 26000,  discount: 25, bonusCoins: 5,  popular: false },
      { id: 'ml-2',  name: '172 Diamonds',   icon: '💎', price: 38000,  originalPrice: 51000,  discount: 25, bonusCoins: 10, popular: true  },
      { id: 'ml-3',  name: '257 Diamonds',   icon: '💎', price: 57000,  originalPrice: 76000,  discount: 25, bonusCoins: 14, popular: false },
      { id: 'ml-4',  name: '343 Diamonds',   icon: '💎', price: 76000,  originalPrice: 101000, discount: 25, bonusCoins: 19, popular: false },
      { id: 'ml-5',  name: '514 Diamonds',   icon: '💎', price: 114000, originalPrice: 152000, discount: 25, bonusCoins: 29, popular: false },
      { id: 'ml-6',  name: '706 Diamonds',   icon: '💎', price: 156500, originalPrice: 209000, discount: 25, bonusCoins: 40, popular: true  },
      { id: 'ml-7',  name: '1412 Diamonds',  icon: '💎', price: 311000, originalPrice: 415000, discount: 25, bonusCoins: 78, popular: false },
      { id: 'ml-8',  name: 'Weekly Diamond Pass', icon: '📦', price: 29000, originalPrice: 38000, discount: 24, bonusCoins: 7, popular: true },
    ],
  },
  g2: {
    id: 'g2',
    developer: 'Garena',
    icon: '/image/FF.png',
    banner: '/image/FF.png',
    idLabel: 'Player ID',
    items: [
      { id: 'ff-1',  name: '70 Crystals',    icon: '💠', price: 14000,  originalPrice: 19000,  discount: 26, bonusCoins: 4,  popular: false },
      { id: 'ff-2',  name: '140 Crystals',   icon: '💠', price: 27000,  originalPrice: 37000,  discount: 27, bonusCoins: 7,  popular: true  },
      { id: 'ff-3',  name: '355 Crystals',   icon: '💠', price: 68000,  originalPrice: 92000,  discount: 26, bonusCoins: 17, popular: false },
      { id: 'ff-4',  name: '720 Crystals',   icon: '💠', price: 136000, originalPrice: 183000, discount: 26, bonusCoins: 34, popular: true  },
      { id: 'ff-5',  name: '1450 Crystals',  icon: '💠', price: 270000, originalPrice: 364000, discount: 26, bonusCoins: 68, popular: false },
      { id: 'ff-6',  name: 'Weekly Pass',    icon: '📦', price: 22000,  originalPrice: 30000,  discount: 27, bonusCoins: 6,  popular: false },
    ],
  },
  g3: {
    id: 'g3',
    developer: 'HoYoverse',
    icon: '/image/HSR.jpg',
    banner: '/image/HSR.jpg',
    idLabel: 'UID',
    serverLabel: 'Server',
    items: [
      { id: 'hsr-1', name: '60 Stellar Jade',   icon: '🌟', price: 12000,  originalPrice: 18000,  discount: 33, bonusCoins: 3,  popular: false },
      { id: 'hsr-2', name: '120 Stellar Jade',  icon: '🌟', price: 23000,  originalPrice: 34000,  discount: 32, bonusCoins: 6,  popular: true  },
      { id: 'hsr-3', name: '300 Stellar Jade',  icon: '🌟', price: 56000,  originalPrice: 83000,  discount: 33, bonusCoins: 14, popular: false },
      { id: 'hsr-4', name: '600 Stellar Jade',  icon: '🌟', price: 111000, originalPrice: 165000, discount: 33, bonusCoins: 28, popular: true  },
      { id: 'hsr-5', name: '1280 Stellar Jade', icon: '🌟', price: 235000, originalPrice: 351000, discount: 33, bonusCoins: 59, popular: false },
      { id: 'hsr-6', name: 'Express Pass x1',   icon: '🎫', price: 18000,  originalPrice: 26000,  discount: 31, bonusCoins: 5,  popular: false },
    ],
  },
  g4: {
    id: 'g4',
    developer: 'HoYoverse',
    icon: '/image/GI.jpg',
    banner: '/image/GI.jpg',
    idLabel: 'UID',
    serverLabel: 'Server',
    items: [
      { id: 'gi-1',  name: '60 Genesis Crystals',   icon: '🔮', price: 12000,  originalPrice: 17000,  discount: 29, bonusCoins: 3,  popular: false },
      { id: 'gi-2',  name: '160 Genesis Crystals',  icon: '🔮', price: 29000,  originalPrice: 40000,  discount: 28, bonusCoins: 7,  popular: true  },
      { id: 'gi-3',  name: '330 Genesis Crystals',  icon: '🔮', price: 59000,  originalPrice: 81000,  discount: 27, bonusCoins: 15, popular: false },
      { id: 'gi-4',  name: '980 Genesis Crystals',  icon: '🔮', price: 176000, originalPrice: 241000, discount: 27, bonusCoins: 44, popular: true  },
      { id: 'gi-5',  name: '1980 Genesis Crystals', icon: '🔮', price: 352000, originalPrice: 481000, discount: 27, bonusCoins: 88, popular: false },
      { id: 'gi-6',  name: 'Blessing of the Welkin Moon', icon: '🌙', price: 30000, originalPrice: 41000, discount: 27, bonusCoins: 8, popular: true },
    ],
  },
  g5: {
    id: 'g5',
    developer: 'KRAFTON',
    icon: '/image/PUBG.png',
    banner: '/image/PUBG.png',
    idLabel: 'Character ID',
    items: [
      { id: 'pubg-1', name: '60 UC',    icon: '🪙', price: 10000,  originalPrice: 14000,  discount: 29, bonusCoins: 3,  popular: false },
      { id: 'pubg-2', name: '325 UC',   icon: '🪙', price: 45000,  originalPrice: 60000,  discount: 25, bonusCoins: 11, popular: true  },
      { id: 'pubg-3', name: '660 UC',   icon: '🪙', price: 90000,  originalPrice: 120000, discount: 25, bonusCoins: 23, popular: false },
      { id: 'pubg-4', name: '1800 UC',  icon: '🪙', price: 245000, originalPrice: 327000, discount: 25, bonusCoins: 61, popular: true  },
      { id: 'pubg-5', name: '3850 UC',  icon: '🪙', price: 520000, originalPrice: 693000, discount: 25, bonusCoins: 130, popular: false },
    ],
  },
  g6: {
    id: 'g6',
    developer: 'Riot Games',
    icon: '/image/VAL.png',
    banner: '/image/VAL.png',
    idLabel: 'Riot ID',
    serverLabel: 'Region',
    items: [
      { id: 'val-1', name: '475 VP',   icon: '🏹', price: 36000,  originalPrice: 48000,  discount: 25, bonusCoins: 9,  popular: false },
      { id: 'val-2', name: '1000 VP',  icon: '🏹', price: 75000,  originalPrice: 100000, discount: 25, bonusCoins: 19, popular: true  },
      { id: 'val-3', name: '2050 VP',  icon: '🏹', price: 154000, originalPrice: 205000, discount: 25, bonusCoins: 39, popular: false },
      { id: 'val-4', name: '3650 VP',  icon: '🏹', price: 274000, originalPrice: 365000, discount: 25, bonusCoins: 69, popular: true  },
      { id: 'val-5', name: '5350 VP',  icon: '🏹', price: 401000, originalPrice: 535000, discount: 25, bonusCoins: 101, popular: false },
    ],
  },
};
