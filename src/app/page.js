'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
  Star,
  ChevronDown,
  Wrench,
  Car,
  Play,
  Layers,
} from 'lucide-react';
import BrandVideoModal from '@/components/BrandVideoModal';
import RegLookup from '@/components/RegLookup';
import TikTokFeed from '@/components/TikTokFeed';
import styles from './page.module.css';

/* ──────────────────────────────────────────
   Data
   ────────────────────────────────────────── */

const services = [
  {
    id: 'starlights',
    icon: Sparkles,
    title: 'Starlights',
    subtitle: '500 → 1000 star packages',
    price: 'from £400',
    description:
      'Hand-fitted fibre-optic headliners with shooting stars, twinkle effects & full constellation patterns. Transform your roof into a private sky.',
    features: [
      '500 to 1000 hand-laid fibre points',
      'Shooting star & twinkle animation modes',
      'Roof, pillar & sun-visor integration',
      'Custom constellation & galaxy layouts',
    ],
    cta: 'Book Starlights',
    param: 'Starlights',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/h5lng0fn_IMG_0282.PNG',
  },
  {
    id: 'ambient',
    icon: Zap,
    title: 'Ambient Lights',
    subtitle: 'Enquire for full packages',
    price: 'from £350',
    description:
      'Multi-zone RGB ambient lighting integrated through doors, dash, footwells & air vents. App-controlled or coded directly to your OEM display.',
    features: [
      'Dual LED dash strips + 4 doors + bins',
      'Illuminated door handles & footwells',
      'OEM screen-coding option (Mercedes, BMW, Audi)',
      '64-colour palettes · Factory-spec finish',
    ],
    cta: 'Book Ambient Lights',
    param: 'Ambient Lights',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/s7meftz2_Screenshot%202026-05-15%20at%2016.31.29.png',
  },
  {
    id: 'custom',
    icon: Wrench,
    title: 'Custom Parts',
    subtitle: 'Tailored per build',
    price: 'Contact for consultation',
    description:
      'BMW digital cockpit retrofits, bespoke trim, illuminated badges, and custom fabrications — every build is one-of-one.',
    features: [
      'BMW digital cockpit retrofits',
      'Illuminated front/rear badges & trim',
      'Bespoke interior carbon & leather',
      'One-of-one custom fabrications',
    ],
    cta: 'Book Custom Parts',
    param: 'Custom Parts',
    image:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/izqcl26x_IMG_0427.jpeg',
  },
];

const carBrands = [
  {
    name: 'Tesla',
    direct: true,
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/citjybw1_IMG_9910.MOV',
    poster:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/jktv5bxu_IMG_0450.jpeg',
    videos: [
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/citjybw1_IMG_9910.MOV',
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/eb0as2le_IMG_9909.MOV',
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/dhdw0m24_IMG_9906.MOV',
    ],
  },
  {
    name: 'Range Rover',
    direct: true,
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/b9xziq2f_IMG_6218.MOV',
    poster:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/izqcl26x_IMG_0427.jpeg',
    videos: [
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/b9xziq2f_IMG_6218.MOV',
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/vfqvrh7i_IMG_6225.MOV',
    ],
  },
  {
    name: 'Mercedes',
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/s7meftz2_Screenshot%202026-05-15%20at%2016.31.29.png',
    videos: [
      'https://vm.tiktok.com/ZNRpCdmsq/',
      'https://vm.tiktok.com/ZNRpQoEqd/',
      'https://vm.tiktok.com/ZNRpCfVBF/',
      'https://vm.tiktok.com/ZNRpCBonj/',
      'https://vm.tiktok.com/ZNRpCfD23/',
      'https://vm.tiktok.com/ZNRpCf4sY/',
      'https://vm.tiktok.com/ZNRpCNpqQ/',
    ],
  },
  {
    name: 'BMW',
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/h5lng0fn_IMG_0282.PNG',
    videos: [
      'https://vm.tiktok.com/ZNRpCDpnV/',
      'https://vm.tiktok.com/ZNRpCf7Lw/',
      'https://vm.tiktok.com/ZNRpCkRTu/',
      'https://vm.tiktok.com/ZNRpCrbmN/',
      'https://vm.tiktok.com/ZNRpC2Q5f/',
      'https://vm.tiktok.com/ZNRpCJP9H/',
      'https://vm.tiktok.com/ZNRpC1s4G/',
    ],
  },
  {
    name: 'Audi',
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/izqcl26x_IMG_0427.jpeg',
    videos: [
      'https://vm.tiktok.com/ZNRpC2uuX/',
      'https://vm.tiktok.com/ZNRpCR7GP/',
      'https://vm.tiktok.com/ZNRpC2E59/',
      'https://vm.tiktok.com/ZNRpCDYaw/',
      'https://vm.tiktok.com/ZNRpCDsSU/',
      'https://vm.tiktok.com/ZNRpC1ypQ/',
      'https://vm.tiktok.com/ZNRpChtn1/',
    ],
  },
  {
    name: 'Volkswagen',
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/zj8tp4v7_IMG_0409.jpeg',
    videos: [
      'https://vm.tiktok.com/ZNRpCkBbH/',
      'https://vm.tiktok.com/ZNRpCD4pC/',
      'https://vm.tiktok.com/ZNRpC1wtk/',
      'https://vm.tiktok.com/ZNRpCJbU1/',
      'https://vm.tiktok.com/ZNRpCMGW1/',
      'https://vm.tiktok.com/ZNRpCRE8u/',
    ],
  },
  {
    name: 'Porsche',
    thumbnail:
      'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/jktv5bxu_IMG_0450.jpeg',
    videos: [
      'https://vm.tiktok.com/ZNRpCFxLv/',
      'https://vm.tiktok.com/ZNRpC1unc/',
    ],
  },
  {
    name: 'Ford',
    thumbnail:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?fm=jpg&q=80&w=800&auto=format&fit=crop',
    videos: [
      'https://vm.tiktok.com/ZNRpC69XQ/',
      'https://vm.tiktok.com/ZNRpC8Swo/',
      'https://vm.tiktok.com/ZNRpCUgra/',
    ],
  },
  {
    name: 'Vauxhall',
    thumbnail:
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?fm=jpg&q=80&w=800&auto=format&fit=crop',
    videos: [
      'https://vm.tiktok.com/ZNRpC6go3/',
      'https://vm.tiktok.com/ZNRpCPdJR/',
    ],
  },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: 'OEM-Grade Quality',
    description:
      'Premium fibres, automotive-rated wiring, and finishes that survive every season without fading or failure.',
  },
  {
    icon: Zap,
    title: 'Plug & Play Install',
    description:
      'No wire splicing, no compromise. Your factory warranty stays intact, your interior stays factory-tight.',
  },
  {
    icon: Sparkles,
    title: 'Designed in London',
    description:
      'Hand-built by enthusiasts with hundreds of documented installs on TikTok @lac.ltd right here in Rainham.',
  },
  {
    icon: Check,
    title: 'Lifetime Support',
    description:
      "Every install is backed by aftercare. If something's not right, we'll fix it — no questions asked.",
  },
];

const timeline = [
  {
    step: '01',
    label: 'The beginning',
    title: 'Kicked out, kit in hand',
    description:
      'LAC started from a boy who got kicked out of secondary school. No workshop, no funding — just a starter kit, an A-Class, and a stubborn refusal to give up.',
  },
  {
    step: '02',
    label: 'Year one',
    title: 'Self-taught, car by car',
    description:
      'Every install was a lesson. Every TikTok was a portfolio entry. Friends became customers, customers became referrals, and the quality kept climbing.',
  },
  {
    step: '03',
    label: 'Today',
    title: 'OEM-grade craft',
    description:
      'From single fibre strips to full constellation roofs and Mercedes screen-integrated ambient — the standard keeps rising. Every car better than the last.',
  },
  {
    step: '04',
    label: "What's next",
    title: 'A new chapter',
    description:
      'Same hands, more space. A second LAC workshop is on the way — same obsession, more cars, zero shortcuts.',
  },
];

const reviews = [
  {
    name: 'Jack Bosher',
    time: 'a year ago',
    rating: 5,
    car: 'BMW M135i',
    text: "I have recently had the full ambient lighting kit installed on my m135i and couldn't be happier with it. From the communication telling me how it all works & the different options I could've opted for to the customer service, everything was perfect. I'd highly recommend LAC Ltd to anyone I know and believe the quality of the work speaks for itself. Thanks again!",
  },
  {
    name: 'Antonio Teti',
    time: 'a year ago',
    rating: 5,
    car: 'Audi A3',
    text: "Had LED lights fitted on my car and they did an amazing job! The lights are perfectly installed and add just the right touch to my car's look. Very professional, cheap, quick, and clearly knew what they were doing. They have also found a blown fuse for my cigarette lighter, and replaced it with no extra charge. Highly recommend for anyone looking to add a special touch to their vehicle!",
  },
  {
    name: 'Jamilah Aktar',
    time: 'a year ago',
    rating: 5,
    car: 'Mercedes A-Class',
    text: '"LAC completely transformed my car! Looks really professional and they provide amazing service. Very helpful and friendly, will definitely recommend them and will come back for other services."',
  },
  {
    name: 'Anja Hasanaj',
    time: '8 months ago',
    rating: 5,
    car: 'Volkswagen Golf',
    text: "I couldn't be happier with the ambient lighting installed by LAC LTD! It looks incredible and adds such a great look to the car's interior. Everything is of great quality and great price; the team was very helpful, quick, and provided excellent customer service. Highly recommend for anyone looking to upgrade their interior!!",
  },
  {
    name: 'Jimmy Finnan',
    time: '8 months ago',
    rating: 5,
    car: 'Tesla Model 3',
    text: 'Amazing job by LAC LTD. All round great experience — he made sure to run me through everything beforehand and did exactly as he said he would. Very friendly and talented, would highly recommend.',
  },
];

const faqs = [
  {
    q: 'How long does a starlight headliner take?',
    a: "Most starlight installs are completed in a single day (6–8 hours). Larger builds with shooting stars, sun-visor integration, or custom constellations may take up to 2 days. We'll confirm the timeline when you book.",
  },
  {
    q: 'Will this void my car manufacturer warranty?',
    a: "No. All our installs are plug-and-play and properly fused into OEM-rated accessory slots. We don't cut factory wiring looms or alter powertrain electronics. Everything can be removed and restored to factory spec if needed.",
  },
  {
    q: 'Do I need to leave my car overnight?',
    a: "It depends on your selected build. Single-service installs (like ambient lighting only) are usually same-day. Combined combo builds or complex 1000-star roofs may require an overnight stay. We'll confirm everything before your appointment.",
  },
  {
    q: "What's the £50 deposit for?",
    a: 'The £50 deposit secures your workshop slot on the calendar and is deducted from your final balance on the day of install. It is refundable or transferable up to 48 hours before your booking.',
  },
  {
    q: 'Can I combine Starlights and Ambient Lighting?',
    a: 'Yes! In fact, most customers book our Combo package, which automatically grants a 15% discount across both services when booked together on the same day.',
  },
  {
    q: 'Which car makes and models do you work on?',
    a: 'We work on all vehicles! We frequently work on Teslas, Range Rovers, BMWs, Mercedes-Benz, Audis, VWs, Porsches, Fords, and more. If you have a specific vehicle in mind, get in touch or type your registration on the booking page.',
  },
];

/* ──────────────────────────────────────────
   Homepage Component
   ────────────────────────────────────────── */

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      {/* ────────────────── HERO SECTION ────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgOverlay}>
          <Image
            src="https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/jktv5bxu_IMG_0450.jpeg"
            alt="LAC Starlight Headliner and Ambient Lighting"
            fill
            priority
            className={styles.heroBgImg}
          />
          <div className={styles.heroVignette}></div>
        </div>

        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            {/* Pill Badge */}
            <div className={styles.heroBadge}>
              <span className="badge-dot"></span>
              <span>NOW BOOKING &bull; RAINHAM</span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.heroHeadline}>
              Get your car done right the first time,
              <br />
              <span className="neon-text">the LAC way.</span>
            </h1>

            {/* Subtext */}
            <p className={styles.heroSubtitle}>
              Ambient lighting specialists &bull; Rainham, East London. Bespoke starlight
              headliners, multi-zone ambient lighting, and custom parts — fitted by enthusiasts,
              finished like factory.
            </p>

            {/* CTAs */}
            <div className={styles.heroActions}>
              <Link href="/booking" className="btn-primary">
                <span>Book your install</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#services" className="btn-secondary">
                <span>Explore services</span>
              </a>
            </div>

            {/* Quick Hero Metrics */}
            <div className={styles.heroStatsBar}>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>1000+</div>
                <div className={styles.heroStatLabel}>installs</div>
              </div>
              <div className={styles.heroStatDivider}></div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>4.9★</div>
                <div className={styles.heroStatLabel}>customer rating</div>
              </div>
              <div className={styles.heroStatDivider}></div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNumber}>2–3h</div>
                <div className={styles.heroStatLabel}>turnaround</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── REG LOOKUP SECTION ────────────────── */}
      <RegLookup />

      {/* ────────────────── SERVICES SECTION ────────────────── */}
      <section className={styles.section} id="services">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">/ 01 — SERVICES</div>
            <h2 className={styles.sectionTitle}>Three signatures. Endless combinations.</h2>
            <p className={styles.sectionSubtitle}>
              Every build is bespoke, designed, and installed in-house. We do all three — so figure it
              as one cohesive transformation.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className={`glass-card ${styles.serviceCard}`}>
                  <div className={styles.serviceImgWrapper}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className={styles.serviceImg}
                    />
                    <div className={styles.priceBadge}>{service.price}</div>
                  </div>

                  <div className={styles.serviceBody}>
                    <div className={styles.serviceTitleRow}>
                      <div className={styles.serviceIcon}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className={styles.serviceTitle}>{service.title}</h3>
                        <div className={styles.serviceSubtitle}>{service.subtitle}</div>
                      </div>
                    </div>

                    <p className={styles.serviceDesc}>{service.description}</p>

                    <div className={styles.featureList}>
                      {service.features.map((feat, idx) => (
                        <div key={idx} className={styles.featureItem}>
                          <Check size={15} className={styles.featureCheck} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/booking?service=${encodeURIComponent(service.param)}`}
                      className={`btn-primary ${styles.serviceCta}`}
                    >
                      <span>{service.cta}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 15% Combo Callout Banner */}
          <div className={styles.comboBanner}>
            <div className={styles.comboLeft}>
              <div className={styles.comboBadge}>
                <Sparkles size={14} />
                <span>POPULAR CHOICE</span>
              </div>
              <h3 className={styles.comboTitle}>
                Combine Starlights + Ambient &amp; <span className="neon-text">Save 15%</span>
              </h3>
              <p className={styles.comboDesc}>
                Book a Starlight and Ambient lighting package on the same booking and get an automatic
                15% discount off your combined total. One day, one install, unmatched atmosphere.
              </p>
            </div>
            <Link href="/booking?service=Combo" className={`btn-primary ${styles.comboBtn}`}>
              <span>Build My Combo</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── BROWSE BY CAR (TIKTOK REEL) ────────────────── */}
      <section className={styles.sectionDarker} id="gallery">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">/ BROWSE BY CAR</div>
            <h2 className={styles.sectionTitle}>We&apos;ve worked on yours.</h2>
            <p className={styles.sectionSubtitle}>
              Tap a brand to watch real installs we&apos;ve done — straight from our portfolio on TikTok.
            </p>
          </div>

          <div className={styles.brandsGrid}>
            {carBrands.map((brand) => (
              <div
                key={brand.name}
                data-testid={`brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={styles.brandCard}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand.direct ? (
                  <video
                    src={brand.videos[0]}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    className={styles.brandMedia}
                  />
                ) : (
                  <img
                    src={brand.thumbnail}
                    alt={`${brand.name} install`}
                    loading="lazy"
                    className={styles.brandMedia}
                  />
                )}
                <div className={styles.brandOverlay} />
                <div className={styles.brandCardInner}>
                  <div className={styles.brandName}>{brand.name}</div>
                  <div className={styles.brandVideos}>
                    <span>{brand.videos.length} videos</span>
                    <Play size={10} fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── WHY LAC (TRUST SIGNALS) ────────────────── */}
      <section className={styles.section} id="why-lac">
        <div className="container">
          <div className={styles.whyWrapper}>
            <div className={styles.whyLeft}>
              <div className="section-label">/ 02 — WHY LAC</div>
              <h2 className={styles.whyTitle}>
                Built by people who <span className="neon-text">actually care.</span>
              </h2>
              <p className={styles.whyDesc}>
                We work with every car like it&apos;s our own — fibre by fibre, strip by strip. Years
                of installs across Teslas, Range Rovers, BMWs, Mercs and beyond means your car gets
                the experience, not a test run. Every customer walks away with the perfect set of lights.
              </p>
              <Link href="/booking" className={`btn-primary ${styles.whyCta}`}>
                <span>Start your build</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className={styles.whyGrid}>
              {trustCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className={`glass-card ${styles.trustCard}`}>
                    <div className={styles.trustIcon}>
                      <Icon size={22} />
                    </div>
                    <h3 className={styles.trustTitle}>{card.title}</h3>
                    <p className={styles.trustDesc}>{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── OUR STORY & TIMELINE ────────────────── */}
      <section className={styles.sectionDarker} id="about">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">/ 03 — OUR STORY</div>
            <h2 className={styles.sectionTitle}>
              From a driveway to East London&apos;s go-to custom shop.
            </h2>
            <p className={styles.sectionSubtitle}>
              Built on word-of-mouth, meticulous attention to detail, and a genuine obsession with car culture.
            </p>
          </div>

          <div className={styles.timelineGrid}>
            {timeline.map((item) => (
              <div key={item.step} className={styles.timelineCard}>
                <div className={styles.timelineStepHeader}>
                  <span className={styles.timelineStepNumber}>{item.step}</span>
                  <span className={styles.timelineLabel}>{item.label}</span>
                </div>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1,000+</div>
              <div className={styles.statLabel}>Vehicles Customized</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5.0 ★</div>
              <div className={styles.statLabel}>Google Reviews Rating</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>9,000+</div>
              <div className={styles.statLabel}>Followers on TikTok @lac.ltd</div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── RECENT WORK / TIKTOK FEED ────────────────── */}
      <TikTokFeed />

      {/* ────────────────── GOOGLE REVIEWS ────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeaderFlex}>
            <div>
              <div className="section-label">/ 04 — GOOGLE REVIEWS</div>
              <h2 className={styles.sectionTitle}>Real customers. Five stars.</h2>
              <p className={styles.sectionSubtitle}>
                Don&apos;t just take our word for it. Read verified reviews from drivers across London and Essex.
              </p>
            </div>
            <a
              href="https://share.google/LlicaWLghMbT2urbY"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="google-reviews-cta"
              className={styles.seeAllGoogleLink}
            >
              <span>See all on Google</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className={styles.reviewsGrid}>
            {reviews.map((rev, idx) => (
              <div key={idx} className={`glass-card ${styles.reviewCard}`}>
                <div className={styles.reviewTop}>
                  <div className={styles.starsRow}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FFD500" stroke="#FFD500" />
                    ))}
                  </div>
                  <span className={styles.googleBadge}>Google</span>
                </div>
                <p className={styles.reviewText}>{rev.text}</p>
                <div className={styles.reviewAuthor}>
                  <div className={styles.authorAvatar}>
                    {rev.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className={styles.authorName}>{rev.name}</div>
                    <div className={styles.authorMeta}>
                      {rev.car} &bull; {rev.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── FAQ ACCORDION ────────────────── */}
      <section className={styles.sectionDarker}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="section-label">/ 05 — FREQUENTLY ASKED QUESTIONS</div>
            <h2 className={styles.sectionTitle}>Got questions? We have answers.</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to know about our installations, warranty safety, and deposits.
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <div className={styles.faqQuestion}>
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`${styles.faqChevron} ${isOpen ? styles.chevronRotated : ''}`}
                    />
                  </div>
                  {isOpen && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────── FINAL CTA ────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaBadge}>
              <Sparkles size={14} />
              <span>TRANSFORM YOUR RIDE</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Your car. <span className="neon-text">Your sky.</span>
              <br />
              Pick a date.
            </h2>
            <p className={styles.ctaDesc}>
              Slots fill up fast every month. Secure your installation date at our new HQ — Unit 15,
              Rainham, RM13 8HZ with just a £50 deposit.
            </p>
            <div className={styles.ctaPromoPill}>
              <span className={styles.ctaPromoCode}>LACHQ10</span>
              <span>Grand opening &bull; Use code for 10% off</span>
            </div>
            <Link href="/booking" className={`btn-primary ${styles.ctaBtn}`}>
              <span>Book Your Install Online</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Video Modal */}
      <BrandVideoModal brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
    </div>
  );
}
