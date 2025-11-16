// components/ThemeClient.tsx
'use client';

import { useEffect } from 'react';

export default function ThemeClient({ initial = 'dark' }: { initial?: string }) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      const theme = (saved || initial) as 'dark' | 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    } catch (e) {
      // ambiente sem localStorage (SSR) — silencioso
    }
  }, [initial]);

  return null;
}
