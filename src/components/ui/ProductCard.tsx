import React from 'react';
import { FlashSaleProduct, formatPrice } from '../../data/mockData';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: FlashSaleProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card flex-shrink-0 w-40 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.game)}&background=f97316&color=fff&size=200`; }}
        />
        {/* Discount badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
          -{product.discount}%
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs text-muted truncate">{product.game}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate mt-0.5">{product.name}</p>
        <div className="mt-2">
          <p className="text-blue-500 font-bold text-sm">{formatPrice(product.price)}</p>
          <p className="text-gray-400 dark:text-slate-500 text-xs line-through">{formatPrice(product.originalPrice)}</p>
        </div>
        <button className="mt-2.5 w-full btn-primary py-1.5 text-xs rounded-lg flex items-center justify-center gap-1.5">
          <ShoppingCart className="w-3.5 h-3.5" />
          Beli
        </button>
      </div>
    </div>
  );
}
