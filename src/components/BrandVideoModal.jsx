'use client';

import Link from 'next/link';
import { X, ExternalLink, Play, ArrowRight } from 'lucide-react';
import styles from './BrandVideoModal.module.css';

export default function BrandVideoModal({ brand, onClose }) {
  if (!brand) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        data-testid="brand-modal"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            {brand.direct ? 'FROM THE LAC WORKSHOP' : '@LAC.LTD ON TIKTOK'}
          </div>
          <h3 className={styles.title}>{brand.name} Installs</h3>
          <p className={styles.subtitle}>
            {brand.videos?.length} {brand.direct ? 'clips' : 'reels'} &mdash; tap to{' '}
            {brand.direct ? 'play with sound' : 'watch on TikTok'}.
          </p>
        </div>

        {/* Scrollable 9:16 Vertical Video Grid */}
        <div className={styles.scrollArea}>
          <div className={styles.videoGrid}>
            {brand.videos?.map((vid, idx) => {
              if (brand.direct) {
                return (
                  <div
                    key={idx}
                    className={styles.reelCard}
                    data-testid={`brand-video-${idx}`}
                  >
                    <video
                      src={vid}
                      controls
                      playsInline
                      preload="metadata"
                      className={styles.directPlayer}
                    />
                    <div className={styles.reelBadge}>#{idx + 1}</div>
                  </div>
                );
              }

              return (
                <a
                  key={idx}
                  href={vid}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`brand-video-${idx}`}
                  className={styles.reelCard}
                >
                  {/* Poster Thumbnail */}
                  <img
                    src={brand.thumbnail}
                    alt={`${brand.name} install #${idx + 1}`}
                    loading="lazy"
                    className={styles.cardPoster}
                  />

                  {/* Gradient Overlay */}
                  <div className={styles.cardGradient} />

                  {/* Top Build Badge */}
                  <div className={styles.reelBadge}>#{idx + 1}</div>

                  {/* Center Play Button */}
                  <div className={styles.centerPlayBtn}>
                    <div className={styles.playCircle}>
                      <Play
                        size={22}
                        fill="currentColor"
                        className={styles.playIconShift}
                      />
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className={styles.cardFooterInfo}>
                    <div className={styles.buildTitle}>
                      {brand.name} Build #{idx + 1}
                    </div>
                    <div className={styles.watchMeta}>
                      <span>Watch on TikTok</span>
                      <ExternalLink size={13} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.footerPrompt}>
            Own a <strong>{brand.name}</strong>? Transform yours next.
          </div>
          <Link
            href={`/booking?brand=${encodeURIComponent(brand.name)}`}
            className={styles.bookBtn}
            onClick={onClose}
          >
            <span>Book for your {brand.name}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
