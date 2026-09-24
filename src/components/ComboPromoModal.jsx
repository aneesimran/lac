'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import styles from './ComboPromoModal.module.css';

export default function ComboPromoModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Never show on admin pages
    if (pathname?.startsWith('/admin')) return;

    // Only show if user hasn't dismissed it in the last 24h
    const dismissed = sessionStorage.getItem('lac_combo_promo_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('lac_combo_promo_dismissed', 'true');
  };

  if (pathname?.startsWith('/admin') || !isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close promotion modal"
        >
          <X size={20} />
        </button>

        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>
            <Sparkles size={13} />
            SAVE 15%
          </span>
        </div>

        <h3 className={styles.title}>
          Starlights <span className={styles.plus}>+</span> Ambient,
          <br />
          <span className={styles.glowHighlight}>15% off</span> the lot.
        </h3>

        <p className={styles.description}>
          Booking both together? Pick any Starlight package and any Ambient package on the same
          booking and we&apos;ll knock <strong>15% off</strong> your combined total. One install.
          One day. Same OEM finish.
        </p>

        <div className={styles.actions}>
          <Link
            href="/booking?service=Combo"
            className={`btn-primary ${styles.primaryBtn}`}
            onClick={handleClose}
          >
            <span>Build my combo</span>
            <ArrowRight size={18} />
          </Link>

          <button className={styles.dismissBtn} onClick={handleClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
