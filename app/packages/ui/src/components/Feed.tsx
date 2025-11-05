'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type FeedProps = {
  children?: React.ReactNode;
};

export default function Feed({ children }: FeedProps) {
  const [open, setOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const pressedKeysRef = useRef<Set<string>>(new Set());

  // Ставим "open" до первого пейнта
  useLayoutEffect(() => {
    const t = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'k' || key === 'l') {
        pressedKeysRef.current.add(key);
      }

      if (
        event.ctrlKey &&
        pressedKeysRef.current.has('k') &&
        pressedKeysRef.current.has('l')
      ) {
        setAdminModalOpen(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'k' || key === 'l') {
        pressedKeysRef.current.delete(key);
      }
      if (key === 'control') {
        pressedKeysRef.current.clear();
      }
    };

    const handleWindowBlur = () => {
      pressedKeysRef.current.clear();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  useEffect(() => {
    if (!adminModalOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAdminModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [adminModalOpen]);

  const closeAdminModal = () => setAdminModalOpen(false);

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
      <div className="feed-content" style={{ opacity: 0, visibility: 'hidden' }}>
        {children ?? (
          <div className="page-shell">
            <header className="page-header">
              <nav className="page-nav" aria-label="Primary">
                <a href="#main">Main</a>
                <a href="#about">About</a>
                <a href="#tor">TORForRussia</a>
              </nav>
            </header>

            <main id="main" className="page-main">
              <h1>The Nightmare Before Freedom</h1>
              <p>
                Explore the stories, voices, and tools crafted to illuminate the path to
                freedom. Stay informed, connect with the community, and step into the
                movement.
              </p>
              <div className="main-actions">
                <a className="primary-action" href="#about">
                  Learn More
                </a>
                <a className="secondary-action" href="#tor">
                  Join the Cause
                </a>
              </div>
            </main>

            <section id="about" className="page-section">
              <h2>About the Project</h2>
              <p>
                We document the untold narratives of resilience and resistance. Our
                platform brings together journalists, activists, and technologists who
                believe in transparency and digital freedom.
              </p>
            </section>

            <section id="tor" className="page-section">
              <h2>TOR For Russia</h2>
              <p>
                Access resources that help circumvent censorship and safeguard the free
                flow of information. Discover guides, updates, and secure entry points to
                the TOR network.
              </p>
            </section>

            <footer className="page-footer">
              <nav className="page-nav" aria-label="Footer">
                <a href="#main">Main</a>
                <a href="#about">About</a>
                <a href="#tor">TORForRussia</a>
              </nav>
              <p className="copyright">© {new Date().getFullYear()} The Nightmare Before Freedom</p>
            </footer>
          </div>
        )}
      </div>

      {adminModalOpen && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={closeAdminModal}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="admin-modal-title">Administrator Access</h2>
            <p>Authenticate to enter administrative mode.</p>
            <button type="button" onClick={closeAdminModal}>
              Close
            </button>
          </div>
        </div>
      )}

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

        .page-shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 4rem;
          min-height: 100vh;
          width: min(960px, 100%);
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
          box-sizing: border-box;
        }

        .page-header,
        .page-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }

        .page-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          width: min(720px, 100%);
        }

        .page-nav a {
          color: inherit;
          text-decoration: none;
          position: relative;
          padding-bottom: 0.25rem;
        }

        .page-nav a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.2s ease;
        }

        .page-nav a:hover::after,
        .page-nav a:focus-visible::after {
          transform: scaleX(1);
        }

        .page-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }

        .page-main h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          margin: 0;
        }

        .page-main p {
          max-width: 40ch;
          margin: 0;
          line-height: 1.6;
        }

        .main-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .primary-action,
        .secondary-action,
        .page-footer button {
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .primary-action {
          padding: 0.9rem 2.5rem;
          background: #0a0a0a;
          color: #fff;
          border-radius: 999px;
          transition: background 0.2s ease;
        }

        .primary-action:hover,
        .primary-action:focus-visible {
          background: #1f1f1f;
        }

        .secondary-action {
          padding: 0.9rem 2.5rem;
          border: 2px solid currentColor;
          border-radius: 999px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .secondary-action:hover,
        .secondary-action:focus-visible {
          background: rgba(0, 0, 0, 0.05);
        }

        .page-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .page-section h2 {
          margin: 0;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
        }

        .page-section p {
          margin: 0;
          line-height: 1.6;
        }

        .page-footer {
          text-align: center;
          font-size: 0.95rem;
        }

        .copyright {
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: grid;
          place-items: center;
          z-index: 5;
        }

        .modal-dialog {
          background: #fff;
          color: #0a0a0a;
          padding: 2.5rem 2rem;
          border-radius: 1rem;
          max-width: min(90vw, 420px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .modal-dialog h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .modal-dialog button {
          align-self: center;
          padding: 0.75rem 2rem;
          border-radius: 999px;
          border: none;
          background: #0a0a0a;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .modal-dialog button:hover,
        .modal-dialog button:focus-visible {
          background: #1f1f1f;
        }

        @media (max-width: 768px) {
          .page-shell {
            gap: 3rem;
            padding: 2.5rem 1.25rem 3rem;
          }

          .page-nav {
            flex-direction: column;
            gap: 1rem;
          }

          .main-actions {
            flex-direction: column;
            width: 100%;
          }

          .primary-action,
          .secondary-action {
            width: 100%;
            text-align: center;
          }
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
