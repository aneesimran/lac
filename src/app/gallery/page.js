'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera, Play, ExternalLink, Sparkles, Film } from 'lucide-react';
import styles from './gallery.module.css';

const workshopItems = [
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
  const [activeTab, setActiveTab] = useState('pov'); // 'pov' | 'workshop'
  const [customerItems, setCustomerItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomerItems(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const isImage = (url) => /\.(jpe?g|png|webp|gif|heic)(?:\?.*)?$/i.test(url);

  return (
    <div className={styles.galleryPage}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink} data-testid="gallery-back">
          <ArrowLeft size={16} /> Back home
        </Link>

        {/* Header Grid */}
        <div className={styles.headerGrid}>
          <div>
            <div className={styles.sectionTag}>CUSTOMER GALLERY</div>
            <h1 className={styles.title}>
              Built by LAC.
              <br />
              <span className={styles.neonViolet}>Filmed by customers.</span>
            </h1>
            <p className={styles.subtitle}>
              Real cars, real customers. Every clip and photo below was sent in by someone who came
              through the workshop. Want yours up here? Send it in.
            </p>
          </div>

          <div className={styles.headerCtaWrapper}>
            <Link
              href="/gallery/submit"
              data-testid="gallery-submit-cta"
              className={styles.submitCtaBtn}
            >
              Submit yours <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className={styles.tabsRow}>
          <button
            type="button"
            onClick={() => setActiveTab('pov')}
            className={`${styles.tabBtn} ${activeTab === 'pov' ? styles.tabActive : ''}`}
          >
            <Camera size={15} /> Customer POVs ({customerItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('workshop')}
            className={`${styles.tabBtn} ${activeTab === 'workshop' ? styles.tabActive : ''}`}
          >
            <Sparkles size={15} /> Workshop Builds ({workshopItems.length})
          </button>
        </div>

        {/* Customer POV Tab */}
        {activeTab === 'pov' && (
          <>
            {loading ? (
              <div style={{ color: '#71717a', fontSize: '0.9rem', padding: '30px 0' }}>
                Loading gallery…
              </div>
            ) : customerItems.length === 0 ? (
              <div className={styles.emptyState} data-testid="gallery-empty">
                <Camera size={44} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>Gallery&apos;s just opened.</h3>
                <p className={styles.emptyText}>
                  Be the first customer to send us your install — we&apos;ll feature you right here.
                </p>
                <Link href="/gallery/submit" className={styles.emptyBtn}>
                  Send my POV <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className={styles.customerGrid} data-testid="gallery-grid">
                {customerItems.map((item) => {
                  const hasImage = isImage(item.media_url);
                  return (
                    <a
                      key={item.id}
                      href={item.media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`gallery-item-${item.id}`}
                      className={styles.povCard}
                    >
                      <div className={styles.povMedia}>
                        {hasImage ? (
                          <img
                            src={item.media_url}
                            alt={`${item.name}'s LAC install`}
                            loading="lazy"
                            className={styles.povImg}
                          />
                        ) : (
                          <div className={styles.videoPlaceholder}>
                            <div className={styles.videoPlayIcon}>
                              <Play size={20} fill="#d946ef" />
                            </div>
                            <div className={styles.videoLabel}>TAP TO WATCH</div>
                          </div>
                        )}
                      </div>

                      <div className={styles.povInfo}>
                        <div className={styles.povName}>{item.name}</div>
                        {item.vehicle && <div className={styles.povVehicle}>{item.vehicle}</div>}
                        {item.note && <p className={styles.povNote}>{item.note}</p>}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Workshop Builds Tab */}
        {activeTab === 'workshop' && (
          <div className={styles.workshopGrid}>
            {workshopItems.map((item) => (
              <div key={item.id} className={styles.workshopCard}>
                <div className={styles.workshopImgBox}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className={styles.workshopBadge}>{item.service}</span>
                </div>
                <div className={styles.workshopInfo}>
                  <h3 className={styles.workshopTitle}>{item.title}</h3>
                  <p className={styles.workshopSpecs}>{item.specs}</p>
                  <a
                    href={item.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workshopAction}
                  >
                    Watch video on TikTok <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
