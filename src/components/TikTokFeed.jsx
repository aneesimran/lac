'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import styles from './TikTokFeed.module.css';

export default function TikTokFeed() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      if (window.tiktokEmbed && typeof window.tiktokEmbed.lib?.render === 'function') {
        window.tiktokEmbed.lib.render(document.querySelectorAll('.tiktok-embed'));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="recent-work"
      className={styles.section}
      data-testid="tiktok-feed-section"
    >
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Heading & Context */}
          <div className={styles.infoCol}>
            <div className={styles.sectionLabel}>/ 03 — RECENT WORK</div>
            <h2 className={styles.title}>
              The latest from
              <br />
              <span className={styles.neonViolet}>@lac.ltd</span>
              <br />
              — live.
            </h2>

            <p className={styles.description}>
              This feed pulls our most recent installs straight from TikTok — every car,
              every fibre, every finish. Real cars, real customers, no staged shots.
            </p>

            <div className={styles.actionCol}>
              <a
                href="https://www.tiktok.com/@lac.ltd"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="tiktok-profile-cta"
                className={styles.tiktokBtn}
              >
                <span>Follow @lac.ltd on TikTok</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="https://www.instagram.com/lac.ltd"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instaBtn}
              >
                <Instagram size={18} />
                <span>See @lac.ltd on Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Column: TikTok Creator Embed */}
          <div className={styles.embedWrapper}>
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@lac.ltd"
              data-unique-id="lac.ltd"
              data-embed-type="creator"
              style={{ maxWidth: 780, minWidth: 288, margin: '0 auto', width: '100%' }}
            >
              <section>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@lac.ltd?refer=creator_embed"
                  style={{ color: '#fff' }}
                >
                  @lac.ltd
                </a>
              </section>
            </blockquote>

            <noscript>
              <div className={styles.embedFallback}>
                <a
                  href="https://www.tiktok.com/@lac.ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fallbackLink}
                >
                  View @lac.ltd on TikTok &rarr;
                </a>
              </div>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
