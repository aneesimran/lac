'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, ExternalLink } from 'lucide-react';
import styles from './gallery.module.css';

const galleryItems = [
  {
    id: 1,
    title: 'Mercedes A250 AMG Line',
    category: 'Mercedes',
    service: 'Ambient Lighting',
    specs: '64-Colour Multi-Zone + Turbine Air Vents',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/s7meftz2_Screenshot%202026-05-15%20at%2016.31.29.png',
    tiktok: 'https://vm.tiktok.com/ZNRpCdmsq/',
  },
  {
    id: 2,
    title: 'BMW M135i Starlight Roof',
    category: 'BMW',
    service: 'Starlights',
    specs: '800 Fibre Points + Shooting Stars Animation',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/h5lng0fn_IMG_0282.PNG',
    tiktok: 'https://vm.tiktok.com/ZNRpCDpnV/',
  },
  {
    id: 3,
    title: 'Tesla Model 3 Bespoke Sky',
    category: 'Tesla',
    service: 'Starlights',
    specs: '1,000 Fibre Stars + Dual Shooting Constellation',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/jktv5bxu_IMG_0450.jpeg',
    tiktok: 'https://www.tiktok.com/@lac.ltd',
  },
  {
    id: 4,
    title: 'Audi RS3 Sportback Full Suite',
    category: 'Audi',
    service: 'Combo',
    specs: 'Starlights + 64-Colour Footwells & Dash Ambient',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/izqcl26x_IMG_0427.jpeg',
    tiktok: 'https://vm.tiktok.com/ZNRpC2uuX/',
  },
  {
    id: 5,
    title: 'BMW M4 Digital Cockpit Retrofit',
    category: 'BMW',
    service: 'Custom Parts',
    specs: 'OEM Digital Display + Custom Coding & Calibration',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/zj8tp4v7_IMG_0409.jpeg',
    tiktok: 'https://vm.tiktok.com/ZNRpCf7Lw/',
  },
  {
    id: 6,
    title: 'Mercedes C-Class Screen-Coded',
    category: 'Mercedes',
    service: 'Ambient Lighting',
    specs: 'OEM Command-Controlled Multi-Zone System',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/s7meftz2_Screenshot%202026-05-15%20at%2016.31.29.png',
    tiktok: 'https://vm.tiktok.com/ZNRpQoEqd/',
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeFilter ||
            item.service === activeFilter
        );

  return (
    <div className={styles.galleryPage}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">/ PORTFOLIO SHOWCASE</div>
          <h1 className={styles.title}>Crafted in Chadwell Heath</h1>
          <p className={styles.subtitle}>
            Explore our latest starlight headliners, OEM screen-integrated ambient lighting, and custom
            automotive builds.
          </p>
        </div>

        {/* Filter Pills */}
        <div className={styles.filtersRow}>
          {['All', 'Starlights', 'Ambient Lighting', 'Mercedes', 'BMW', 'Tesla', 'Audi'].map(
            (tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === tab ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={`glass-card ${styles.card}`}>
              <div className={styles.imgWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.img}
                />
                <span className={styles.serviceBadge}>{item.service}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemSpecs}>{item.specs}</div>

                <div className={styles.cardActions}>
                  <Link
                    href={`/booking?service=${encodeURIComponent(item.service)}`}
                    className={styles.bookSimilarLink}
                  >
                    <span>Book similar build</span>
                    <ArrowRight size={15} />
                  </Link>

                  {item.tiktok && (
                    <a
                      href={item.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.tiktokLink}
                      aria-label="View on TikTok"
                    >
                      <Play size={14} fill="currentColor" />
                      <span>TikTok</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomBanner}>
          <div>
            <h2 className={styles.bannerTitle}>Ready to transform your interior?</h2>
            <p className={styles.bannerSubtitle}>
              Lock in your Chadwell Heath date with just a £50 deposit.
            </p>
          </div>
          <Link href="/booking" className="btn-primary">
            <span>Book Your Build</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
