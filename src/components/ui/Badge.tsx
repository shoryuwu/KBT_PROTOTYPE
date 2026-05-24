import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'info' | 'blue';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantMap: Record<BadgeVariant, string> = {
  success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700/50',
  danger:  'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700/50',
  neutral: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-600',
  info:    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50',
  blue:  'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50',
};

const dotMap: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-500',
  neutral: 'bg-gray-400',
  info:    'bg-blue-500',
  blue:  'bg-blue-500',
};

export function Badge({ variant = 'neutral', children, className = '', dot = false }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantMap[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotMap[variant]}`} />}
      {children}
    </span>
  );
}
