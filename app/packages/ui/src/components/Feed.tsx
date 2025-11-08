'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';

type CarouselSlide = {
  id: string;
  type: 'text' | 'image';
  content: string;
  label?: string;
};

type NewsItem = {
  id: string;
  title: string;
  date: string;
  dateTime: string;
  slides: CarouselSlide[];
  footer: {
    type: 'text' | 'link';
    content: string;
    href?: string;
  };
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Signal Relay Restored',
    date: 'Apr 18, 2024',
    dateTime: '2024-04-18',
    slides: [
      {
        id: 'news-1-slide-1',
        type: 'image',
        content: 'linear-gradient(135deg, #111, #2d3436)',
        label: 'Night relay tower',
      },
      {
        id: 'news-1-slide-2',
        type: 'text',
        content: 'Emergency crews patch fibre relays before dawn to keep the broadcast alive.',
      },
      {
        id: 'news-1-slide-3',
        type: 'image',
        content: 'linear-gradient(135deg, #0f2027, #203a43)',
        label: 'Encrypted waveform',
      },
      {
        id: 'news-1-slide-4',
        type: 'text',
        content: 'Listeners across five safehouses confirmed the signal within nine minutes.',
      },
      {
        id: 'news-1-slide-5',
        type: 'image',
        content: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
        label: 'Relay schematics',
      },
    ],
    footer: {
      type: 'link',
      content: 'Read the restoration log',
      href: '#',
    },
  },
  {
    id: 'news-2',
    title: 'Whisper Network Update',
    date: 'Apr 16, 2024',
    dateTime: '2024-04-16',
    slides: [
      {
        id: 'news-2-slide-1',
        type: 'text',
        content: 'Volunteers onboarded six new couriers who can transport encrypted stories.',
      },
      {
        id: 'news-2-slide-2',
        type: 'image',
        content: 'linear-gradient(135deg, #3c1053, #ad5389)',
        label: 'Courier rendezvous',
      },
      {
        id: 'news-2-slide-3',
        type: 'text',
        content: 'Briefings emphasise avoiding surveillance hotspots along Route 12.',
      },
      {
        id: 'news-2-slide-4',
        type: 'image',
        content: 'linear-gradient(135deg, #1b1b1b, #434343)',
        label: 'Encrypted briefing cards',
      },
      {
        id: 'news-2-slide-5',
        type: 'text',
        content: 'Next signal sync scheduled for 02:45 local time with mirrored backups.',
      },
    ],
    footer: {
      type: 'text',
      content: 'Prepared by the courier liaison cell.',
    },
  },
  {
    id: 'news-3',
    title: 'Safe Passage Corridor',
    date: 'Apr 13, 2024',
    dateTime: '2024-04-13',
    slides: [
      {
        id: 'news-3-slide-1',
        type: 'image',
        content: 'linear-gradient(135deg, #588157, #3a5a40)',
        label: 'Mapped corridor overlay',
      },
      {
        id: 'news-3-slide-2',
        type: 'text',
        content: 'Scouts confirmed thermal quiet along the southern ridge for 36 hours.',
      },
      {
        id: 'news-3-slide-3',
        type: 'image',
        content: 'linear-gradient(135deg, #bc4749, #f2bb05)',
        label: 'Supply cache drop',
      },
      {
        id: 'news-3-slide-4',
        type: 'text',
        content: 'Emergency beacons installed at each checkpoint with mirrored codes.',
      },
      {
        id: 'news-3-slide-5',
        type: 'image',
        content: 'linear-gradient(135deg, #001219, #005f73)',
        label: 'Night passage markers',
      },
    ],
    footer: {
      type: 'link',
      content: 'Coordinate with the corridor team',
      href: '#',
    },
  },
  {
    id: 'news-4',
    title: 'Archive Digitisation Drive',
    date: 'Apr 10, 2024',
    dateTime: '2024-04-10',
    slides: [
      {
        id: 'news-4-slide-1',
        type: 'text',
        content: 'Fifty analog tapes converted overnight with volunteer equipment.',
      },
      {
        id: 'news-4-slide-2',
        type: 'image',
        content: 'linear-gradient(135deg, #14213d, #fca311)',
        label: 'Digitisation console',
      },
      {
        id: 'news-4-slide-3',
        type: 'text',
        content: 'Metadata tagging ensures quick retrieval for editorials and podcasts.',
      },
      {
        id: 'news-4-slide-4',
        type: 'image',
        content: 'linear-gradient(135deg, #780206, #061161)',
        label: 'Tape archive stacks',
      },
      {
        id: 'news-4-slide-5',
        type: 'text',
        content: 'Next focus: oral history interviews from the northern cells.',
      },
    ],
    footer: {
      type: 'text',
      content: 'Archive desk contact: archive@tnbf.example',
    },
  },
  {
    id: 'news-5',
    title: 'Mutual Aid Deployment',
    date: 'Apr 08, 2024',
    dateTime: '2024-04-08',
    slides: [
      {
        id: 'news-5-slide-1',
        type: 'image',
        content: 'linear-gradient(135deg, #03045e, #00b4d8)',
        label: 'Aid crates stacked',
      },
      {
        id: 'news-5-slide-2',
        type: 'text',
        content: 'Community kitchens stocked enough reserves for two additional weeks.',
      },
      {
        id: 'news-5-slide-3',
        type: 'image',
        content: 'linear-gradient(135deg, #2a9d8f, #264653)',
        label: 'Volunteer convoy map',
      },
      {
        id: 'news-5-slide-4',
        type: 'text',
        content: 'Medical kits replenished after late-night drone deliveries.',
      },
      {
        id: 'news-5-slide-5',
        type: 'image',
        content: 'linear-gradient(135deg, #8ecae6, #219ebc)',
        label: 'Supply ledger update',
      },
    ],
    footer: {
      type: 'link',
      content: 'Offer transport or supplies',
      href: '#',
    },
  },
];

function NewsCard({ item }: { item: NewsItem }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const goToIndex = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, item.slides.length - 1)));
  };

  const handleNext = () => {
    goToIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    goToIndex(currentIndex - 1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) {
      return;
    }
    const currentX = event.touches[0]?.clientX ?? 0;
    const delta = touchStartRef.current - currentX;
    if (delta > 40) {
      handleNext();
      touchStartRef.current = null;
    } else if (delta < -40) {
      handlePrev();
      touchStartRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  return (
    <article className="news-card">
      <header className="news-card-meta">
        <time className="news-card-date" dateTime={item.dateTime}>
          {item.date}
        </time>
        <h3 className="news-card-title">{item.title}</h3>
      </header>
      <div
        className="news-card-frame"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {item.slides.map((slide) => (
            <div className="carousel-slide" key={slide.id}>
              {slide.type === 'text' ? (
                <p className="carousel-text">{slide.content}</p>
              ) : (
                <div
                  className="carousel-image"
                  style={{ backgroundImage: slide.content }}
                  role="img"
                  aria-label={slide.label}
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="carousel-control prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          <span aria-hidden="true">◀</span>
        </button>
        <button
          type="button"
          className="carousel-control next"
          onClick={handleNext}
          disabled={currentIndex === item.slides.length - 1}
          aria-label="Next slide"
        >
          <span aria-hidden="true">▶</span>
        </button>
      </div>
      <footer className="news-card-footer">
        {item.footer.type === 'link' ? (
          <a href={item.footer.href}>{item.footer.content}</a>
        ) : (
          <p>{item.footer.content}</p>
        )}
      </footer>
    </article>
  );
}

type FeedProps = {
  children?: React.ReactNode;
};

export default function Feed({ children }: FeedProps) {
  const [open, setOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const pressedKeysRef = useRef<Set<string>>(new Set());

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

      <div className="feed-content" style={{ opacity: 0, visibility: 'hidden' }}>
        {children ?? (
          <div className="page-shell">
            <header className="page-header">
              <nav className="page-nav" aria-label="Primary">
                <a href="#main">Main</a>
                <a href="#about">About</a>
                <a href="#t4r">T4R=TorForRussia</a>
                <a href="#help">HELP!</a>
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
                <a className="secondary-action" href="#help">
                  Join The Cause
                </a>
              </div>
            </main>

            <div id="about" className="anchor-marker" aria-hidden="true" />
            <div id="t4r" className="anchor-marker" aria-hidden="true" />

            <section className="news-section" aria-labelledby="news-heading">
              <h2 id="news-heading" className="sr-only">
                Latest stories
              </h2>
              <div className="news-list">
                {NEWS_ITEMS.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            <footer id="help" className="page-footer">
              <nav className="page-nav" aria-label="Footer">
                <a href="#main">Main</a>
                <a href="#about">About</a>
                <a href="#t4r">T4R=TorForRussia</a>
                <a href="#help">HELP!</a>
              </nav>
              <p className="copyright">
                © {new Date().getFullYear()} The Nightmare Before Freedom
              </p>
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
          background: var(--feed-bg, #fff);
          color: var(--foreground, #0a0a0a);
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .feed-root.opened .feed-content {
          animation: fadeIn 0.6s ease forwards;
          animation-delay: 0.5s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            visibility: hidden;
          }
          to {
            opacity: 1;
            visibility: visible;
          }
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

        .page-footer {
          text-align: center;
          font-size: 0.95rem;
        }

        .copyright {
          margin: 0;
        }

        .anchor-marker {
          position: relative;
          top: -120px;
          height: 0;
        }

        .news-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .news-list {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          width: 100%;
        }

        .news-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding-inline: clamp(1.25rem, 4vw, 3rem);
          box-sizing: border-box;
        }

        .news-card-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.35rem;
        }

        .news-card-date {
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.7;
        }

        .news-card-title {
          margin: 0;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .news-card-frame {
          position: relative;
          border: 3px solid #000;
          border-radius: 1.75rem;
          overflow: hidden;
          background: #000;
          width: min(100vw, 100vh);
          height: min(100vw, 100vh);
          max-width: 100vw;
          max-height: 100vh;
          display: flex;
          margin-inline: auto;
        }

        .carousel-track {
          display: flex;
          height: 100%;
          width: 100%;
          transition: transform 0.4s ease;
        }

        .carousel-slide {
          flex: 0 0 100%;
          display: grid;
          place-items: center;
          padding: 1.75rem;
          box-sizing: border-box;
          color: #f3f4f6;
          text-align: center;
        }

        .carousel-text {
          margin: 0;
          line-height: 1.6;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          border-radius: 1.2rem;
          background-size: cover;
          background-position: center;
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.18);
          color: #fff;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .carousel-control:hover:not(:disabled),
        .carousel-control:focus-visible:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
        }

        .carousel-control:disabled {
          opacity: 0.25;
          cursor: default;
        }

        .carousel-control.prev {
          left: 1.25rem;
        }

        .carousel-control.next {
          right: 1.25rem;
        }

        .news-card-footer {
          width: min(640px, 90vw);
          text-align: center;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .news-card-footer p {
          margin: 0;
        }

        .news-card-footer a {
          color: inherit;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid currentColor;
          padding-bottom: 0.15rem;
        }

        .news-card-footer a:hover,
        .news-card-footer a:focus-visible {
          opacity: 0.75;
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

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .page-shell {
            gap: 3rem;
            padding: 2.5rem 1rem 3rem;
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

          .carousel-control {
            display: none;
          }
        }

        .curtain.left.open {
          animation: openLeft 1s ease forwards;
        }
        .curtain.right.open {
          animation: openRight 1s ease forwards;
        }

        @keyframes openLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes openRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

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
          .carousel-track {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
