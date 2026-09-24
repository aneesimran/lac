'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import styles from './cancel.module.css';

export default function BookingCancelPage() {
  return (
    <div className={styles.cancelPage}>
      <div className={styles.container} data-testid="booking-cancel-page">
        <div className={styles.cancelBadge}>
          <XCircle size={40} strokeWidth={2} />
        </div>

        <h1 className={styles.title}>Booking not completed</h1>

        <p className={styles.description}>
          You closed the payment screen before finishing — no charge has been made and no slot is
          held. Want to try again?
        </p>

        <div className={styles.actions}>
          <Link href="/booking" data-testid="cancel-retry-btn" className={styles.retryBtn}>
            <ArrowLeft size={16} /> Back to booking
          </Link>

          <a
            href="https://wa.me/447538963090"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
          >
            <MessageSquare size={16} /> WhatsApp us instead
          </a>
        </div>
      </div>
    </div>
  );
}
