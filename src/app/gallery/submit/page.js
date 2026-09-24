'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Send, Check, Loader2 } from 'lucide-react';
import styles from './submit.module.css';

function GallerySubmitForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking') || null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    mediaUrl.trim().startsWith('http');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          vehicle: vehicle.trim(),
          media_url: mediaUrl.trim(),
          note: note.trim(),
          booking_id: bookingId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit POV.');
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.submitPage}>
      <div className={styles.glowSphere} />

      <div className={styles.container}>
        <Link href="/gallery" className={styles.backLink} data-testid="gallery-submit-back">
          <ArrowLeft size={16} /> Back to gallery
        </Link>

        {isSuccess ? (
          <div className={styles.successCard} data-testid="gallery-submit-success">
            <div className={styles.successIcon}>
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className={styles.successTitle}>Thanks — got it!</h2>
            <p className={styles.successMessage}>
              We&apos;ll have a look and feature you in the gallery shortly. Keep an eye on{' '}
              <a href="https://www.tiktok.com/@lac.ltd" target="_blank" rel="noopener noreferrer">
                @lac.ltd
              </a>{' '}
              — we tag every customer we post.
            </p>
            <div className={styles.successActions}>
              <Link href="/gallery" className={styles.viewGalleryBtn}>
                View gallery
              </Link>
              <Link href="/" className={styles.homeBtn}>
                Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.sectionTag}>SUBMIT YOUR POV</div>
            <h1 className={styles.title}>
              Send us <span className={styles.neonViolet}>your install.</span>
            </h1>
            <p className={styles.description}>
              Photos, a TikTok link, an Instagram reel — paste it below and we&apos;ll feature you in the
              LAC customer gallery and tag you on our channels.
            </p>

            <form onSubmit={handleSubmit} className={styles.form} data-testid="gallery-submit-form">
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="g-name">
                    Your name
                  </label>
                  <input
                    id="g-name"
                    data-testid="g-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First & last"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="g-email">
                    Email
                  </label>
                  <input
                    id="g-email"
                    type="email"
                    data-testid="g-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="g-vehicle">
                  Your car (optional)
                </label>
                <input
                  id="g-vehicle"
                  data-testid="g-vehicle"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="e.g. 2022 BMW M3 Competition"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="g-media">
                  Photo / Video link
                </label>
                <input
                  id="g-media"
                  data-testid="g-media-url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://tiktok.com/… · https://instagram.com/… · direct image URL"
                  className={styles.input}
                  required
                />
                <p className={styles.fieldHelper}>
                  Paste a TikTok / Instagram / YouTube link, or a hosted image URL (Google Photos shared
                  link, iCloud Drive link, etc).
                </p>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="g-note">
                  A few words (optional)
                </label>
                <textarea
                  id="g-note"
                  data-testid="g-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="How was the experience? Any details we should highlight?"
                  className={styles.textarea}
                />
              </div>

              {errorMsg && (
                <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errorMsg}</div>
              )}

              <div className={styles.submitBtnRow}>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  data-testid="g-submit"
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send my POV
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function GallerySubmitPage() {
  return (
    <Suspense fallback={<div className={styles.submitPage}><div className={styles.container}>Loading…</div></div>}>
      <GallerySubmitForm />
    </Suspense>
  );
}
