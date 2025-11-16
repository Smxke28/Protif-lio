// components/BodySanitizer.tsx
'use client';

import { useEffect } from 'react';

export default function BodySanitizer() {
  useEffect(() => {
    try {
      const blacklist = ['bis_register'];
      const attrs = Array.from(document.body.attributes).map(a => a.name);
      for (const name of attrs) {
        if (name.startsWith('__processed_') || blacklist.includes(name)) {
          document.body.removeAttribute(name);
        }
      }
    } catch (e) {
      // silencioso em ambientes restritos
    }
  }, []);

  return null;
}
