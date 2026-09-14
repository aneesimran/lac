import Link from 'next/link';
import { ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './terms.module.css';

export const metadata = {
  title: 'Terms & Conditions · London Automotive Customs',
  description:
    'Booking deposit policies, 48-hour cancellation terms, OEM warranty preservation, and aftercare guarantee.',
};

export default function TermsPage() {
  return (
    <div className={styles.termsPage}>
      <div className="container">
        <div className={styles.backRow}>
          <Link href="/booking" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Booking</span>
          </Link>
        </div>

        <div className={`glass-card ${styles.card}`}>
          <div className="section-label">/ LEGAL &amp; POLICIES</div>
          <h1 className={styles.title}>Terms &amp; Conditions</h1>
          <p className={styles.lastUpdated}>Last updated: September 2026 &bull; London Automotive Customs Ltd</p>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>1. Booking &amp; £50 Deposit Policy</h2>
              <p>
                To reserve a dedicated installation slot at our Chadwell Heath workshop, a £50 deposit
                is required at the time of online booking. This deposit confirms your time with our
                specialist technicians and is directly deducted from the total balance due on the day of
                completion.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>2. Rescheduling &amp; Cancellations</h2>
              <p>
                We understand schedules change. You may reschedule or cancel your appointment free of
                charge up to <strong>48 hours</strong> prior to your confirmed arrival time.
              </p>
              <p>
                Cancellations made within 48 hours of the appointment time forfeit the £50 deposit, as
                materials (such as precision-cut fibre optic looms) and technician bay allocation are
                prepared in advance.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>3. Vehicle Warranty &amp; OEM Standards</h2>
              <p>
                All installations carried out by London Automotive Customs utilize factory-standard
                automotive-rated wiring, dedicated fuse taps, and non-destructive mounting techniques.
                We do not splice, cut, or alter your vehicle&apos;s factory engine or safety looms.
                Systems can be fully returned to original condition without invalidating manufacturer
                coverage.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Drop-off, Collection &amp; Remaining Balance</h2>
              <p>
                Vehicles must be dropped off during the selected arrival window. Upon completion, our
                technicians will perform a walkthrough demonstration of app/screen controls with you.
                The remaining balance (total cost minus £50 deposit) is due upon collection via Debit/Credit
                Card, Bank Transfer, or Cash.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Lifetime Workmanship Guarantee</h2>
              <p>
                Every starlight headliner and ambient lighting build is backed by our aftercare
                guarantee. In the rare event that a fibre strand shifts or a component requires
                recalibration, we provide swift in-house adjustments free of charge.
              </p>
            </section>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.guaranteeText}>
              <ShieldCheck size={20} className="neon-text" />
              <span>Have any questions regarding our terms? WhatsApp us directly at +44 7538 963090.</span>
            </div>
            <Link href="/booking" className="btn-primary">
              <span>Continue Booking</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
