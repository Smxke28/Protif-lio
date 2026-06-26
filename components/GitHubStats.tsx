'use client';

import { useEffect, useState } from 'react';
import FeedbackSection from '../components/FeedbackSection';

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface LangMap { [key: string]: number }

const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178C6',
  JavaScript:  '#F7DF1E',
  Python:      '#3572A5',
  Java:        '#B07219',
  CSS:         '#563D7C',
  HTML:        '#E34C26',
  Shell:       '#89E051',
  Rust:        '#DEA584',
  Go:          '#00ADD8',
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'hoje';
  if (days === 1) return 'ontem';
  if (days < 30) return `${days}d atrás`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m atrás`;
  return `${Math.floor(months / 12)}a atrás`;
}

export default function GitHubStats({ username = 'Smxke28' }: { username?: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [langs, setLangs] = useState<LangMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData: GitHubUser = await userRes.json();
        const reposData: Repo[] = await reposRes.json();

        setUser(userData);

        const ownRepos = reposData.filter(r => !r.fork);
        setRepos(ownRepos.slice(0, 4));

        // Count languages
        const langCount: LangMap = {};
        ownRepos.forEach(r => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
        setLangs(langCount);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  const totalLangs = Object.values(langs).reduce((a, b) => a + b, 0);
  const sortedLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5);

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div className="section-label">GitHub</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card-glass" style={{ padding: '28px', height: '140px' }}>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', marginBottom: '12px', width: '60%' }} />
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', width: '85%' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return null;

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="section-label" style={{ marginBottom: '12px' }}>
            Atividade recente
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F0FF' }}>
            GitHub
          </h2>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank" rel="noreferrer"
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '8px 16px' }}
        >
          Ver perfil →
        </a>
      </div>

      {/* Stats row */}
      {user && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {[
            { label: 'Repositórios', value: user.public_repos },
            { label: 'Seguidores', value: user.followers },
            { label: 'Seguindo', value: user.following },
            { label: 'Anos no GitHub', value: new Date().getFullYear() - new Date(user.created_at).getFullYear() },
          ].map(stat => (
            <div key={stat.label} className="card-glass" style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00D4FF', lineHeight: 1, marginBottom: '6px', fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#555577', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages bar */}
      {sortedLangs.length > 0 && (
        <div className="card-glass" style={{ padding: '24px 28px', marginBottom: '24px' }}>
          <p style={{ fontSize: '0.72rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            Linguagens mais usadas
          </p>
          {/* Bar */}
          <div style={{ display: 'flex', height: '8px', borderRadius: '8px', overflow: 'hidden', gap: '2px', marginBottom: '16px' }}>
            {sortedLangs.map(([lang, count]) => (
              <div key={lang} style={{
                flex: count,
                background: LANG_COLORS[lang] || '#8888AA',
                transition: 'flex 0.5s ease',
              }} />
            ))}
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {sortedLangs.map(([lang, count]) => (
              <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: LANG_COLORS[lang] || '#8888AA', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#F0F0FF', fontWeight: 500 }}>{lang}</span>
                <span style={{ fontSize: '0.72rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace" }}>
                  {Math.round((count / totalLangs) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent repos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {repos.map(repo => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank" rel="noreferrer"
            className="card-glass"
            style={{ display: 'block', padding: '24px', textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                {/* Repo icon */}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#555577" style={{ flexShrink: 0 }}>
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/>
                </svg>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#00D4FF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {repo.name}
                </span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', flexShrink: 0 }}>
                {timeAgo(repo.updated_at)}
              </span>
            </div>

            {repo.description && (
              <p style={{ fontSize: '0.82rem', color: '#8888AA', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {repo.description}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
              {repo.language && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: LANG_COLORS[repo.language] || '#8888AA' }} />
                  <span style={{ fontSize: '0.75rem', color: '#8888AA' }}>{repo.language}</span>
                </div>
              )}
              {repo.stargazers_count > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="#555577">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.873 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: '#8888AA' }}>{repo.stargazers_count}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
