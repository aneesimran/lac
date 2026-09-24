'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, AlertCircle, Home, MessageSquare, MapPin, Clock, Coffee, ShieldCheck, Loader2 } from 'lucide-react';
import styles from './success.module.css';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState(sessionId ? 'checking' : 'paid');
  const [depositAmount, setDepositAmount] = useState('50.00');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionId) {
      // Simulate quick check or fetch session status
      const timer = setTimeout(() => {
        setStatus('paid');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [sessionId]);

  return (
    <div className={styles.successPage}>
      <div className={styles.glow} />

      <div className={styles.container} data-testid="booking-success-page">
        {status === 'checking' && (
          <div>
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-[#D946EF] mb-6" />
            <h1 className={styles.title}>Confirming payment…</h1>
            <p className={styles.description}>Hold tight — checking with Stripe.</p>
          </div>
        )}

        {status === 'paid' && (
          <div>
            <div className={styles.badge}>
              <Check size={40} strokeWidth={2.5} />
            </div>

            <h1 className={styles.title}>Deposit received.</h1>

            <p className={styles.description}>
              Your slot is locked in. We&apos;ve emailed your confirmation and we&apos;ll be in touch before
              your install. Your{' '}
              <span className={styles.highlightAmount}>£{depositAmount}</span> deposit comes off your final
              invoice on the day.
            </p>

            <div className={styles.detailsBox}>
              <div className={styles.detailsHeader}>Workshop Arrival &amp; Details</div>
              <div className={styles.detailsList}>
                <div className={styles.detailsRow}>
                  <MapPin size={18} />
                  <span>
                    <strong>Unit 15, Rainham, London RM13 8HZ</strong> — Dedicated automotive styling studio.
                  </span>
                </div>
                <div className={styles.detailsRow}>
                  <Clock size={18} />
                  <span>
                    <strong>2–3 Hours Fast Turnaround</strong> — Please arrive 10 minutes prior to your slot.
                  </span>
                </div>
                <div className={styles.detailsRow}>
                  <Coffee size={18} />
                  <span>
                    <strong>Customer Lounge Available</strong> — High-speed WiFi, hot coffee &amp; viewing area.
                  </span>
                </div>
                <div className={styles.detailsRow}>
                  <ShieldCheck size={18} />
                  <span>
                    <strong>12-Month Workmanship Warranty</strong> — Every installation is backed by LAC guarantee.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/" className={styles.homeBtn} data-testid="success-home-btn">
                <Home size={16} /> Back home
              </Link>
              <a
                href="https://wa.me/447538963090"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waBtn}
              >
                <MessageSquare size={16} /> WhatsApp us
              </a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className={styles.warningBadge}>
              <AlertCircle size={40} strokeWidth={2} />
            </div>

            <h1 className={styles.title}>Payment not completed</h1>
            <p className={styles.description}>
              We couldn&apos;t verify your payment yet. If money was taken, contact us on WhatsApp 07538
              963090 with your name and we&apos;ll sort it manually.
            </p>

            <div className={styles.actions}>
              <Link href="/booking" className={styles.homeBtn}>
                Try again
              </Link>
              <a
                href="https://wa.me/447538963090"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waBtn}
              >
                <MessageSquare size={16} /> WhatsApp us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className={styles.successPage}><div className={styles.container}>Loading…</div></div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
