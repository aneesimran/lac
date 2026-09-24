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
                To reserve a dedicated installation slot at our Rainham workshop (Unit 15, Rainham, RM13 8HZ),
                a £50 deposit is required at the time of online booking. This deposit confirms your time with our
                specialist technicians and is directly deducted from the total balance due on the day of
                completion.
              </p>
              <p>
                The deposit will only be refunded in full if London Automotive Customs Ltd (&quot;LAC&quot;) is
                unable to complete your booking (e.g. workshop unavailability or equipment fault). In other cases,
                the deposit secures your bay allocation.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>2. Rescheduling &amp; Cancellations</h2>
              <p>
                We understand schedules change. You may reschedule your appointment free of
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
              <h2 className={styles.sectionHeading}>5. 12-Month Workmanship Warranty</h2>
              <p>
                All ambient and starlight installations carry a 12-month comprehensive workmanship warranty
                from the install date. The warranty covers all fitting and wiring; it excludes damage from accidents,
                tampering, or unauthorised third-party modifications. If any issue arises within 12 months,
                we diagnose and rectify it promptly free of charge.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Data &amp; Privacy (DVLA Lookups)</h2>
              <p>
                We collect your name, email, phone, vehicle, and booking details solely to process your booking
                and prepare your install. Vehicle registration lookups are performed via UK vehicle records
                only to verify fitment and package compatibility. You may request deletion of your booking record
                at any time by emailing{' '}
                <a href="mailto:lac.ltd24@gmail.com" className="neon-text">
                  lac.ltd24@gmail.com
                </a>
                .
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>7. Workshop Location &amp; Contact</h2>
              <p>
                London Automotive Customs Ltd &bull; Unit 15, Rainham, RM13 8HZ &bull; Phone:{' '}
                <a href="tel:+447538963090" className="neon-text">
                  +44 7538 963090
                </a>{' '}
                &bull; Email:{' '}
                <a href="mailto:lac.ltd24@gmail.com" className="neon-text">
                  lac.ltd24@gmail.com
                </a>
              </p>
            </section>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.guaranteeText}>
              <ShieldCheck size={20} className="neon-text" />
              <span>Questions? WhatsApp +44 7538 963090 or email lac.ltd24@gmail.com.</span>
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
