'use client';

import { useLayoutEffect, useState } from 'react';

type FeedProps = {
  children?: React.ReactNode;
};

export default function Feed({ children }: FeedProps) {
  const [open, setOpen] = useState(false);

  // Ставим "open" до первого пейнта
  useLayoutEffect(() => {
    const t = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className={`feed-root ${open ? 'opened' : ''}`}>
      {/* ШТОРЫ СНАЧАЛА в DOM + инлайновые стили, чтобы перекрыть экран даже без CSS */}
      <div
        className={`curtain left ${open ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '50vw',
          background: '#000',
          zIndex: 2,
          pointerEvents: 'none',
          transform: 'translateX(0)',
        }}
      />
      <div
        className={`curtain right ${open ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50vw',
          background: '#000',
          zIndex: 2,
          pointerEvents: 'none',
          transform: 'translateX(0)',
        }}
      />

      {/* Контент — ИЗНАЧАЛЬНО СКРЫТ ИНЛАЙНОМ, чтобы не мигал до стилей */}
      <div
        className="feed-content"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {children ?? <h1 style={{ margin: 0 }}>Hello World!</h1>}
      </div>

      <style jsx>{`
        .feed-root {
          position: relative;
          min-height: 100vh;
          background: var(--feed-bg, #fff);          /* белый фон под шторами */
          color: var(--foreground, #0a0a0a);
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        /* После установки класса opened — плавно показываем контент */
        .feed-root.opened .feed-content {
          animation: fadeIn 0.6s ease forwards;
          animation-delay: 0.5s; /* в такт шторам */
        }
        @keyframes fadeIn {
          from { opacity: 0; visibility: hidden; }
          to   { opacity: 1; visibility: visible; }
        }

        /* Анимации штор на 1s */
        .curtain.left.open {
          animation: openLeft 1s ease forwards;
        }
        .curtain.right.open {
          animation: openRight 1s ease forwards;
        }

        @keyframes openLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @keyframes openRight {
          from { transform: translateX(0); }
          to   { transform: translateX(100%); }
        }

        /* Без анимаций */
        @media (prefers-reduced-motion: reduce) {
          .curtain.left.open,
          .curtain.right.open {
            animation: none;
            transform: translateX(-100%);
          }
          .curtain.right.open {
            transform: translateX(100%);
          }
          .feed-root.opened .feed-content {
            animation: none;
            opacity: 1;
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
}
