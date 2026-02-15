// components/Card.tsx
import Link from 'next/link';
import React from 'react';

type CardProps = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  href?: string;
  badges?: string[];
  children?: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
};

export default function Card({
  title,
  description,
  href,
  badges = [],
  children,
  variant = 'default',
  className = '',
}: CardProps) {
  const base =
    'p-6 rounded-2xl border transition-transform duration-300 will-change-transform focus:outline-none';
  const lift = 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]';
  const bg =
    variant === 'accent'
      ? 'bg-gradient-to-br from-gray-800/70 to-black/60 border-gray-700/40'
      : 'bg-gradient-to-br from-gray-800/60 to-black/60 border-gray-700/30';

  const content = (
    <article
      className={`${base} ${bg} shadow-xl ${lift} focus-within:ring-2 focus-within:ring-blue-500/20 ${className}`}
      tabIndex={0}
      aria-labelledby="card-title"
    >
      <h3 id="card-title" className="text-xl font-semibold mb-2 text-white">
        {title}
      </h3>

      {description && <p className="text-sm text-gray-300 mb-4">{description}</p>}

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((b) => (
            <span key={b} className="inline-block px-3 py-1 rounded-full text-xs bg-white/6 text-gray-200">
              {b}
            </span>
          ))}
        </div>
      )}

      {children && <div className="mt-2">{children}</div>}
    </article>
  );

  return href ? (
    <Link href={href} className="no-underline" aria-label={typeof title === 'string' ? title : undefined}>
      {content}
    </Link>
  ) : (
    content
  );
}
