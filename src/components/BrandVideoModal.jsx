'use client';

import Link from 'next/link';
import { X, ExternalLink, Play, ArrowRight } from 'lucide-react';
import styles from './BrandVideoModal.module.css';

export default function BrandVideoModal({ brand, onClose }) {
  if (!brand) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className={styles.header}>
          <div className={styles.badge}>PORTFOLIO SPOTLIGHT</div>
          <h3 className={styles.title}>{brand.name} Installs</h3>
          <p className={styles.subtitle}>
            Watch real {brand.name} transformations completed at our Chadwell Heath workshop.
          </p>
        </div>

        <div className={styles.videoList}>
          {brand.videos?.map((vid, idx) => (
            <div key={idx} className={styles.videoCard}>
              <div className={styles.videoHeader}>
                <div className={styles.playIconWrapper}>
                  <Play size={16} fill="currentColor" />
                </div>
                <div className={styles.videoInfo}>
                  <div className={styles.videoName}>
                    {brand.name} Build #{idx + 1}
                  </div>
                  <div className={styles.videoMeta}>Hand-fitted &bull; Chadwell Heath</div>
                </div>
              </div>
              <a
                href={vid}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.watchLink}
              >
                <span>Watch on TikTok</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerText}>
            Own a {brand.name}? Transform yours next.
          </div>
          <Link
            href={`/booking?brand=${encodeURIComponent(brand.name)}`}
            className="btn-primary"
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
