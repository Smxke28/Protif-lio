'use client';

import { motion } from 'framer-motion';

const TECHS = [
  'Next.js', 'React', 'TypeScript', 'Spring Boot', 'Node.js',
  'PostgreSQL', 'Redes', 'Linux', 'Windows', 'Git', 'Tailwind','Backup','TCP/IP','Hardware','Help Desk','Manutenção',
];

export default function Specialties() {
  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '40px' }}
      >
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          Stack
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Especialidades
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}
      >
        {TECHS.map((tech, i) => (
          <span
            key={tech}
            className={i % 2 === 0 ? 'tag' : 'tag tag-violet'}
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
