'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Services', href: pathname === '/' ? '#services' : '/#services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: pathname === '/' ? '#about' : '/#about' },
    { label: 'Contact', href: pathname === '/' ? '#contact' : '/#contact' },
  ];

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo */}
        <Link href="/" className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image
              src="https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/33963u68_Lac%20logo.JPG"
              alt="London Automotive Customs Logo"
              width={42}
              height={42}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>LONDON AUTOMOTIVE</span>
            <span className={styles.brandSubtitle}>CUSTOMS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className={styles.navActions}>
          <Link href="/booking" className={styles.bookBtn}>
            <span>Book Now</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <nav className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{link.label}</span>
              <ChevronRight size={18} className={styles.mobileChevron} />
            </Link>
          ))}
          <div className={styles.mobileCtaWrapper}>
            <Link
              href="/booking"
              className={`btn-primary ${styles.mobileBookBtn}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Your Install
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
