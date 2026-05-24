import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../data/mockData';
import { Zap } from 'lucide-react';

interface GameCardProps {
  game: Game;
  size?: 'sm' | 'md' | 'lg';
}

export function GameCard({ game, size = 'lg' }: GameCardProps) {
  const sizeClasses = {
    sm: 'w-36 h-24',
    md: 'w-52 h-36',
    lg: 'w-full',
  };

  const imgHeightClasses = {
    sm: 'h-20',
    md: 'h-32',
    lg: 'h-44',
  };

  return (
    <Link to={`/game/${game.id}`} className={`block card overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${size === 'lg' ? '' : `flex-shrink-0 ${sizeClasses[size]}`}`}>
      {/* Image */}
      <div className={`relative overflow-hidden bg-gray-200 dark:bg-slate-700 ${imgHeightClasses[size]}`}>
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(game.title)}&background=1e293b&color=f97316&size=400`; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Country flag */}
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-lg rounded-md px-1.5 py-0.5">
          {game.countryFlag}
        </div>
        {/* Title on image for large */}
        {size === 'lg' && (
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white font-bold text-sm truncate drop-shadow">{game.title}</p>
            <p className="text-white/70 text-xs">{game.genre}</p>
          </div>
        )}
      </div>

      {/* Content for non-large */}
      {size !== 'lg' && (
        <div className="p-2">
          <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{game.title}</p>
          <p className="text-xs text-muted">{game.genre}</p>
        </div>
      )}
    </Link>
  );
}

// Wide card variant for Popular section
export function PopularGameCard({ game }: { game: Game }) {
  return (
    <Link to={`/game/${game.id}`} className="block flex-shrink-0 w-56 card overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      <div className="relative h-32 overflow-hidden bg-gray-200 dark:bg-slate-700">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(game.title)}&background=1e293b&color=f97316&size=400`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-2 right-2 text-lg">{game.countryFlag}</div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-white font-bold text-sm truncate">{game.title}</p>
          </div>
          <p className="text-white/60 text-xs mt-0.5">{game.genre}</p>
        </div>
      </div>
    </Link>
  );
}
