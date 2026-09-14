import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, Instagram, Send, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        {/* Top Info Banner */}
        <div className={styles.locationBanner}>
          <div className={styles.bannerBadge}>
            <span className="badge-dot"></span>
            <span>CHADWELL HEATH WORKSHOP</span>
          </div>
          <div className={styles.expansionBadge}>
            <Sparkles size={14} />
            <span>2ND LOCATION · COMING SOON</span>
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className={styles.footerGrid}>
          {/* Col 1: Brand & Bio */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <div className={styles.logoWrapper}>
                <Image
                  src="https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/33963u68_Lac%20logo.JPG"
                  alt="LAC Logo"
                  width={38}
                  height={38}
                  className={styles.logoImg}
                />
              </div>
              <div>
                <div className={styles.brandTitle}>LONDON AUTOMOTIVE CUSTOMS</div>
                <div className={styles.brandTagline}>Bespoke Automotive Transformations</div>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Hand-crafted starlight headliners, multi-zone OEM ambient lighting, and bespoke interior
              customizations in East London. Fitted by passionate enthusiasts, finished to factory-spec.
            </p>
            <div className={styles.socialRow}>
              <a
                href="https://www.tiktok.com/@lac.ltd"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.05 3.25-1.57 3.32-3.38.03-4.78.01-9.56.02-14.34z" />
                </svg>
                <span>@lac.ltd</span>
              </a>
              <a
                href="https://www.instagram.com/lac.ltd"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Instagram"
              >
                <Instagram size={18} />
                <span>@lac.ltd</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Services */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/#services" className={styles.footerLink}>
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={styles.footerLink}>
                  Build Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className={styles.footerLink}>
                  Book Online (£50 Deposit)
                </Link>
              </li>
              <li>
                <Link href="/#why-lac" className={styles.footerLink}>
                  Why Choose LAC
                </Link>
              </li>
              <li>
                <Link href="/#story" className={styles.footerLink}>
                  Our Story & Timeline
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.footerLink}>
                  Terms & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Location & Hours */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Workshop Details</h4>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <MapPin size={20} className={styles.contactIcon} />
                <div>
                  <div className={styles.contactLabel}>Location</div>
                  <div className={styles.contactValue}>
                    397 Whalebone Lane, Chadwell Heath, London RM6 6RH
                  </div>
                  <a
                    href="https://maps.google.com/?q=397+Whalebone+Lane+Chadwell+Heath+RM6+6RH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <Clock size={20} className={styles.contactIcon} />
                <div>
                  <div className={styles.contactLabel}>Opening Hours</div>
                  <div className={styles.contactValue}>
                    Monday – Saturday: 09:00 – 18:00
                    <br />
                    <span className={styles.dimText}>Sunday: Closed (By Appointment Only)</span>
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <Phone size={20} className={styles.contactIcon} />
                <div>
                  <div className={styles.contactLabel}>Phone & WhatsApp</div>
                  <a href="tel:+447538963090" className={styles.phoneLink}>
                    +44 7538 963090
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} London Automotive Customs Ltd. All rights reserved.
          </div>
          <div className={styles.bottomBadges}>
            <span className={styles.guaranteeBadge}>
              <ShieldCheck size={16} />
              OEM-Grade Wiring &bull; Zero Factory Voiding
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
