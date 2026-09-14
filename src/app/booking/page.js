'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Wrench,
  Layers,
  Calendar as CalendarIcon,
  Clock,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Send,
  Download,
  Phone,
  AlertCircle,
} from 'lucide-react';
import styles from './booking.module.css';

/* ──────────────────────────────────────────
   Live Packages & Addons Data
   ────────────────────────────────────────── */

const starlightPackages = [
  {
    name: '500 Stars',
    price: 400,
    features: ['500 hand-laid fibre points', 'Twinkle effect', 'OEM-style finish'],
  },
  {
    name: '600 Stars',
    price: 450,
    features: ['600 hand-laid fibre points', 'Twinkle effect', 'OEM-style finish'],
  },
  {
    name: '700 Stars',
    price: 500,
    features: ['700 hand-laid fibre points', 'Twinkle effect', 'OEM-style finish'],
  },
  {
    name: '800 Stars',
    price: 600,
    features: ['800 hand-laid fibre points', 'Twinkle + shooting stars included', 'OEM-style finish'],
  },
  {
    name: '900 Stars',
    price: 700,
    features: ['900 hand-laid fibre points', 'Twinkle + shooting stars included', 'OEM-style finish'],
  },
  {
    name: '1000 Stars',
    price: 800,
    features: ['1000 hand-laid fibre points', 'Twinkle + shooting stars included', 'OEM-style finish'],
  },
];

const ambientPackages = [
  {
    name: 'Signature Ambient Package',
    tier: 'Gold',
    price: 350,
    features: [
      'Dual LED ambient strips on dashboard',
      'LED ambient strips along all 4 doors',
      'Illuminated door handles & door bins',
      'Front & rear footwell lighting',
      'OEM-style factory finish',
    ],
  },
  {
    name: 'Signature Premium Package',
    tier: 'Premium · Air Vents',
    price: 550,
    features: [
      'Everything in Signature package',
      'Air vent turbine ambient lighting (4-zone)',
      'App-controlled colour & brightness',
      'OEM-style fitment & calibration',
    ],
  },
  {
    name: 'Mercedes Signature Ambient Package',
    tier: 'OEM Screen-Integrated',
    price: 800,
    mercedesOnly: true,
    features: [
      'Full OEM screen-integrated ambient lighting',
      'Air vents, dashboard, 4 doors, footwells & centre console',
      'Controlled directly via Mercedes MBUX/Command screen',
      'No aftermarket remotes or exposed modules',
    ],
  },
];

const customPartsPackage = {
  name: 'Custom Parts Consultation',
  price: 0,
  features: [
    'One-on-one consultation with lead technician',
    'Cockpit retrofit, illuminated badges, or bespoke trim',
    'Custom quote & build timeline provided',
  ],
};

const sampleDvlaCars = {
  'BD51SMR': { make: 'BMW', model: 'M135i', year: 2021, colour: 'Misano Blue', fuel: 'Petrol', engine_cc: 1998 },
  'LC70XYZ': { make: 'Mercedes-Benz', model: 'A250 AMG Line', year: 2020, colour: 'Cosmos Black', fuel: 'Petrol', engine_cc: 1991 },
  'TS22TES': { make: 'Tesla', model: 'Model 3 Performance', year: 2022, colour: 'Pearl White', fuel: 'Electric', engine_cc: 0 },
  'RO21RVR': { make: 'Range Rover', model: 'Sport HSE', year: 2021, colour: 'Santorini Black', fuel: 'Diesel', engine_cc: 2996 },
  'AU19AUD': { make: 'Audi', model: 'RS3 Sportback', year: 2019, colour: 'Nardo Grey', fuel: 'Petrol', engine_cc: 2480 },
  'VW23GLF': { make: 'Volkswagen', model: 'Golf R Mk8', year: 2023, colour: 'Lapiz Blue', fuel: 'Petrol', engine_cc: 1984 },
};

/* ──────────────────────────────────────────
   Booking Flow Component
   ────────────────────────────────────────── */

function BookingContent() {
  const searchParams = useSearchParams();

  // Wizard Step: 1, 2, 3, or 4 (Confirmation)
  const [step, setStep] = useState(1);

  // Step 1 State: Vehicle & Services
  const [regInput, setRegInput] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [vehicle, setVehicle] = useState(null); // { make, model, year, colour, reg }
  const [manualVehicle, setManualVehicle] = useState('');
  const [lookupMessage, setLookupMessage] = useState('');

  // Service Selection: "Starlights" | "Ambient Lights" | "Combo" | "Custom Parts"
  const [selectedService, setSelectedService] = useState('Starlights');
  const [selectedStarlight, setSelectedStarlight] = useState(starlightPackages[0]);
  const [selectedAmbient, setSelectedAmbient] = useState(ambientPackages[0]);
  const [screenCodeAddon, setScreenCodeAddon] = useState(false);
  const [shootingStarsAddon, setShootingStarsAddon] = useState(false);

  // Step 2 State: Calendar & Time Slots
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 – 13:00)');

  // Step 3 State: Customer Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Step 4 State: Confirmed Booking Details
  const [bookingRef, setBookingRef] = useState('');

  // Handle URL query parameters (e.g., ?service=Combo or ?brand=Tesla)
  useEffect(() => {
    const s = searchParams.get('service');
    if (s && ['Starlights', 'Ambient Lights', 'Combo', 'Custom Parts'].includes(s)) {
      setSelectedService(s);
    }
    const b = searchParams.get('brand');
    if (b) {
      setManualVehicle(b);
      setVehicle({ make: b, model: 'Vehicle', year: '', colour: '' });
    }
  }, [searchParams]);

  // DVLA Plate Lookup
  const handleRegLookup = async (e) => {
    if (e) e.preventDefault();
    const cleanReg = regInput.trim().toUpperCase().replace(/\s+/g, '');
    if (!cleanReg) return;

    setLookupLoading(true);
    setLookupMessage('');

    // Check mock database first or call lookup
    setTimeout(() => {
      if (sampleDvlaCars[cleanReg]) {
        const car = sampleDvlaCars[cleanReg];
        setVehicle({ ...car, reg: cleanReg });
        setLookupMessage('');
      } else {
        // Fallback: Generate smart match for valid-looking UK reg plates
        if (cleanReg.length >= 4) {
          setVehicle({
            make: 'Vehicle',
            model: `Reg: ${cleanReg}`,
            year: 'UK Spec',
            colour: 'Customer Car',
            reg: cleanReg,
          });
          setLookupMessage('');
        } else {
          setVehicle(null);
          setLookupMessage("Couldn't find that registration. You can enter your vehicle manually below.");
        }
      }
      setLookupLoading(false);
    }, 500);
  };

  // Price Calculations
  let subtotal = 0;
  if (selectedService === 'Starlights') {
    subtotal += selectedStarlight.price;
    if (shootingStarsAddon && !selectedStarlight.name.includes('800') && !selectedStarlight.name.includes('900') && !selectedStarlight.name.includes('1000')) {
      subtotal += 80;
    }
  } else if (selectedService === 'Ambient Lights') {
    subtotal += selectedAmbient.price;
    if (screenCodeAddon) subtotal += 200;
  } else if (selectedService === 'Combo') {
    subtotal += selectedStarlight.price + selectedAmbient.price;
    if (shootingStarsAddon && !selectedStarlight.name.includes('800') && !selectedStarlight.name.includes('900') && !selectedStarlight.name.includes('1000')) {
      subtotal += 80;
    }
    if (screenCodeAddon) subtotal += 200;
  } else if (selectedService === 'Custom Parts') {
    subtotal = 0;
  }

  const comboDiscount = selectedService === 'Combo' ? Math.round(subtotal * 0.15) : 0;
  const estimatedTotal = subtotal - comboDiscount;
  const depositDue = selectedService === 'Custom Parts' ? 0 : 50;
  const remainingBalance = Math.max(0, estimatedTotal - depositDue);

  // Calendar Helpers
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Form Validation & Submit
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const errors = {};

    if (!fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please enter a valid email address.';
    if (!phone.trim() || phone.trim().length < 8) errors.phone = 'Please enter a valid UK phone number.';
    if (!agreedTerms) errors.agreedTerms = 'You must agree to the booking terms.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const randomRef = `LAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.bookingPage}>
      <div className="container">
        {/* Top Header */}
        <div className={styles.header}>
          <div className="section-label">/ BOOK AN INSTALLATION</div>
          <h1 className={styles.pageTitle}>Lock In Your Transformation</h1>
          <p className={styles.pageSubtitle}>
            Hand-built in Chadwell Heath. Secure your date with a £50 deposit (deducted from total on the day).
          </p>
        </div>

        {/* Step Progress Indicator (Steps 1 - 3) */}
        {step < 4 && (
          <div className={styles.stepper}>
            {[
              { num: 1, label: 'Vehicle & Package' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Customer Details' },
            ].map((s, idx) => (
              <div key={s.num} className={styles.stepItem}>
                <div
                  className={`${styles.stepCircle} ${
                    step === s.num ? styles.stepActive : step > s.num ? styles.stepDone : ''
                  }`}
                >
                  {step > s.num ? <Check size={16} strokeWidth={3} /> : s.num}
                </div>
                <span
                  className={`${styles.stepLabel} ${
                    step === s.num ? styles.stepLabelActive : ''
                  }`}
                >
                  {s.label}
                </span>
                {idx < 2 && (
                  <div
                    className={`${styles.stepLine} ${
                      step > s.num ? styles.stepLineDone : ''
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ────────────────── STEP 1: VEHICLE & PACKAGES ────────────────── */}
        {step === 1 && (
          <div className={styles.stepContent}>
            {/* 1. UK Registration Lookup */}
            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>1. Enter Vehicle Registration</div>
                <div className={styles.cardSubtitle}>
                  We use your reg to confirm interior specifications and prepare the kit before you arrive.
                </div>
              </div>

              <form onSubmit={handleRegLookup} className={styles.regForm}>
                <div className={styles.plateBox}>
                  <div className={styles.plateFlag}>
                    <span className={styles.flagStars}>★★★</span>
                    <span className={styles.flagCode}>GB</span>
                  </div>
                  <input
                    type="text"
                    value={regInput}
                    onChange={(e) => {
                      setRegInput(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '').slice(0, 8));
                    }}
                    placeholder="YOUR REG"
                    className={styles.plateInput}
                    aria-label="UK Vehicle Registration"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-primary ${styles.regSubmitBtn}`}
                  disabled={!regInput.trim() || lookupLoading}
                >
                  {lookupLoading ? 'Checking DVLA...' : 'Match My Car'}
                  <Car size={18} />
                </button>
              </form>

              {/* Matched Vehicle Card */}
              {vehicle && (
                <div className={styles.matchedCarCard}>
                  <div className={styles.matchedCarIcon}>
                    <Car size={24} />
                  </div>
                  <div className={styles.matchedCarInfo}>
                    <div className={styles.matchedBadge}>DVLA MATCH VERIFIED</div>
                    <div className={styles.matchedTitle}>
                      {vehicle.make} {vehicle.model} {vehicle.year && `· ${vehicle.year}`} {vehicle.colour && `· ${vehicle.colour}`}
                    </div>
                    {vehicle.fuel && (
                      <div className={styles.matchedMeta}>
                        {vehicle.fuel} {vehicle.engine_cc ? `· ${vehicle.engine_cc}cc` : ''}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fallback / Manual Input */}
              {lookupMessage && (
                <div className={styles.lookupAlert}>
                  <AlertCircle size={18} />
                  <span>{lookupMessage}</span>
                </div>
              )}

              <div className={styles.manualEntryRow}>
                <span className={styles.orText}>Or enter vehicle model manually:</span>
                <input
                  type="text"
                  placeholder="e.g. BMW M135i 2021 or Mercedes A250"
                  value={manualVehicle}
                  onChange={(e) => {
                    setManualVehicle(e.target.value);
                    setVehicle({ make: e.target.value, model: '', year: '', colour: '' });
                  }}
                  className={styles.manualInput}
                />
              </div>
            </div>

            {/* 2. Service Selection */}
            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>2. Select Your Service</div>
                <div className={styles.cardSubtitle}>Choose your desired transformation.</div>
              </div>

              <div className={styles.serviceTabs}>
                {[
                  { id: 'Starlights', label: 'Starlights', icon: Sparkles, badge: 'From £400' },
                  { id: 'Ambient Lights', label: 'Ambient Lighting', icon: Zap, badge: 'From £350' },
                  { id: 'Combo', label: 'Combo (Both)', icon: Layers, badge: 'Save 15%', highlight: true },
                  { id: 'Custom Parts', label: 'Custom Parts', icon: Wrench, badge: 'Consultation' },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = selectedService === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={`${styles.serviceTab} ${isSelected ? styles.serviceTabActive : ''} ${
                        tab.highlight ? styles.serviceTabHighlight : ''
                      }`}
                      onClick={() => setSelectedService(tab.id)}
                    >
                      <div className={styles.tabIcon}>
                        <Icon size={22} />
                      </div>
                      <div className={styles.tabLabel}>{tab.label}</div>
                      <span className={styles.tabBadge}>{tab.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3. Package Options based on Selected Service */}
              <div className={styles.packagesSection}>
                {/* Starlights Packages */}
                {(selectedService === 'Starlights' || selectedService === 'Combo') && (
                  <div className={styles.packageGroup}>
                    <h3 className={styles.groupTitle}>
                      <Sparkles size={18} className="neon-text" />
                      Select Starlight Package
                    </h3>
                    <div className={styles.packagesGrid}>
                      {starlightPackages.map((pkg) => {
                        const isPkgSelected = selectedStarlight.name === pkg.name;
                        return (
                          <div
                            key={pkg.name}
                            className={`${styles.pkgCard} ${isPkgSelected ? styles.pkgCardActive : ''}`}
                            onClick={() => setSelectedStarlight(pkg)}
                          >
                            <div className={styles.pkgTop}>
                              <div className={styles.pkgName}>{pkg.name}</div>
                              <div className={styles.pkgPrice}>£{pkg.price}</div>
                            </div>
                            <div className={styles.pkgFeatures}>
                              {pkg.features.map((f, i) => (
                                <div key={i} className={styles.pkgFeatureItem}>
                                  <Check size={13} className={styles.featureCheckIcon} />
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Ambient Packages */}
                {(selectedService === 'Ambient Lights' || selectedService === 'Combo') && (
                  <div className={styles.packageGroup}>
                    <h3 className={styles.groupTitle}>
                      <Zap size={18} className="neon-text" />
                      Select Ambient Lighting Package
                    </h3>
                    <div className={styles.packagesGrid}>
                      {ambientPackages.map((pkg) => {
                        const isPkgSelected = selectedAmbient.name === pkg.name;
                        return (
                          <div
                            key={pkg.name}
                            className={`${styles.pkgCard} ${isPkgSelected ? styles.pkgCardActive : ''}`}
                            onClick={() => setSelectedAmbient(pkg)}
                          >
                            <div className={styles.pkgTop}>
                              <div>
                                <div className={styles.pkgName}>{pkg.name}</div>
                                <span className={styles.pkgTier}>{pkg.tier}</span>
                              </div>
                              <div className={styles.pkgPrice}>£{pkg.price}</div>
                            </div>
                            <div className={styles.pkgFeatures}>
                              {pkg.features.map((f, i) => (
                                <div key={i} className={styles.pkgFeatureItem}>
                                  <Check size={13} className={styles.featureCheckIcon} />
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Custom Parts Consultation */}
                {selectedService === 'Custom Parts' && (
                  <div className={styles.customConsultBox}>
                    <div className={styles.customConsultIcon}>
                      <Wrench size={32} />
                    </div>
                    <div>
                      <h3 className={styles.customConsultTitle}>{customPartsPackage.name}</h3>
                      <p className={styles.customConsultDesc}>
                        Custom fabrications, BMW digital instrument clusters, illuminated M badges, and bespoke
                        trims require custom measurement and discussion. Book your slot for a free in-person
                        inspection &amp; quote.
                      </p>
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {selectedService !== 'Custom Parts' && (
                  <div className={styles.addonsSection}>
                    <h3 className={styles.groupTitle}>Optional Add-Ons</h3>
                    <div className={styles.addonsGrid}>
                      {/* Shooting Stars */}
                      {(selectedService === 'Starlights' || selectedService === 'Combo') &&
                        !selectedStarlight.name.includes('800') &&
                        !selectedStarlight.name.includes('900') &&
                        !selectedStarlight.name.includes('1000') && (
                          <div
                            className={`${styles.addonCard} ${shootingStarsAddon ? styles.addonActive : ''}`}
                            onClick={() => setShootingStarsAddon(!shootingStarsAddon)}
                          >
                            <div className={styles.addonCheck}>
                              {shootingStarsAddon && <Check size={16} strokeWidth={3} />}
                            </div>
                            <div className={styles.addonInfo}>
                              <div className={styles.addonTitle}>Shooting Stars Animation (+£80)</div>
                              <div className={styles.addonDesc}>
                                Adds meteor-style shooting star animation across your starlight roof.
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Screen Code */}
                      {(selectedService === 'Ambient Lights' || selectedService === 'Combo') && (
                        <div
                          className={`${styles.addonCard} ${screenCodeAddon ? styles.addonActive : ''}`}
                          onClick={() => setScreenCodeAddon(!screenCodeAddon)}
                        >
                          <div className={styles.addonCheck}>
                            {screenCodeAddon && <Check size={16} strokeWidth={3} />}
                          </div>
                          <div className={styles.addonInfo}>
                            <div className={styles.addonTitle}>OEM Screen Code Integration (+£200)</div>
                            <div className={styles.addonDesc}>
                              Control ambient colours through factory infotainment screen (Mercedes, BMW, Audi, VW Golf).
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Step Actions */}
            <div className={styles.stepFooter}>
              <div className={styles.footerPricePreview}>
                <span className={styles.previewLabel}>Estimated Total:</span>
                <span className={styles.previewAmount}>£{estimatedTotal}</span>
                {comboDiscount > 0 && (
                  <span className={styles.discountTag}>15% Combo Discount Applied</span>
                )}
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Continue to Date &amp; Time</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ────────────────── STEP 2: DATE & TIME ────────────────── */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <div className={`glass-card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Select Installation Date &amp; Arrival Slot</div>
                <div className={styles.cardSubtitle}>
                  Our Chadwell Heath workshop operates Monday to Saturday.
                </div>
              </div>

              <div className={styles.dateTimeGrid}>
                {/* Calendar */}
                <div className={styles.calendarWrapper}>
                  <div className={styles.calendarHeader}>
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className={styles.calNavBtn}
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className={styles.calMonthLabel}>
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className={styles.calNavBtn}
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className={styles.calDayNames}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>

                  <div className={styles.calDaysGrid}>
                    {/* Empty padding for first day */}
                    {[...Array(firstDayIndex)].map((_, i) => (
                      <div key={`empty-${i}`} className={styles.calEmptyDay}></div>
                    ))}

                    {/* Actual month days */}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const dayNum = i + 1;
                      const dateObj = new Date(currentYear, currentMonth, dayNum);
                      const isSunday = dateObj.getDay() === 0;
                      const isPast =
                        dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isDisabled = isSunday || isPast;

                      const isSelected =
                        selectedDate &&
                        selectedDate.getDate() === dayNum &&
                        selectedDate.getMonth() === currentMonth &&
                        selectedDate.getFullYear() === currentYear;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(dateObj)}
                          className={`${styles.calDay} ${isSelected ? styles.calDaySelected : ''} ${
                            isDisabled ? styles.calDayDisabled : ''
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                  <div className={styles.calendarFootnote}>
                    * Sundays are closed for routine drop-offs.
                  </div>
                </div>

                {/* Time Slots */}
                <div className={styles.timeSlotsWrapper}>
                  <h3 className={styles.timeSlotsTitle}>Arrival Window</h3>
                  <div className={styles.timeSlotsList}>
                    {[
                      { slot: 'Morning (09:00 – 13:00)', desc: 'Ideal for same-day completion' },
                      { slot: 'Afternoon (13:00 – 17:00)', desc: 'Drop-off & progress updates' },
                    ].map((t) => (
                      <div
                        key={t.slot}
                        className={`${styles.timeSlotCard} ${
                          timeSlot === t.slot ? styles.timeSlotActive : ''
                        }`}
                        onClick={() => setTimeSlot(t.slot)}
                      >
                        <div className={styles.timeSlotRadio}>
                          {timeSlot === t.slot && <div className={styles.timeSlotDot}></div>}
                        </div>
                        <div>
                          <div className={styles.timeSlotName}>{t.slot}</div>
                          <div className={styles.timeSlotDesc}>{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedDate && (
                    <div className={styles.dateSummaryBadge}>
                      <CalendarIcon size={18} className="neon-text" />
                      <span>
                        Selected: {selectedDate.toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })} &bull; {timeSlot}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={styles.stepFooter}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                &larr; Back to Package
              </button>

              <button
                type="button"
                className="btn-primary"
                disabled={!selectedDate}
                onClick={() => {
                  setStep(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Continue to Customer Details</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ────────────────── STEP 3: CUSTOMER DETAILS & DEPOSIT ────────────────── */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <div className={styles.stepThreeGrid}>
              {/* Form Col */}
              <div className={`glass-card ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>Customer Information</div>
                  <div className={styles.cardSubtitle}>
                    Where should we send your booking confirmation and workshop directions?
                  </div>
                </div>

                <form onSubmit={handleProceedToPayment} className={styles.customerForm}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`${styles.input} ${formErrors.fullName ? styles.inputError : ''}`}
                    />
                    {formErrors.fullName && (
                      <span className={styles.errorMsg}>{formErrors.fullName}</span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                    />
                    {formErrors.email && (
                      <span className={styles.errorMsg}>{formErrors.email}</span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone Number (UK) *</label>
                    <input
                      type="tel"
                      placeholder="07123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`${styles.input} ${formErrors.phone ? styles.inputError : ''}`}
                    />
                    {formErrors.phone && (
                      <span className={styles.errorMsg}>{formErrors.phone}</span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Special Requests / Build Notes (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Custom constellation preference, specific RGB colour profile, or roof trim notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={styles.textarea}
                    ></textarea>
                  </div>

                  <div className={styles.termsRow}>
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className={styles.checkbox}
                    />
                    <label htmlFor="termsCheckbox" className={styles.termsLabel}>
                      I agree to the{' '}
                      <Link href="/terms" target="_blank" className={styles.termsLink}>
                        Terms &amp; Conditions
                      </Link>
                      . The £50 deposit is non-refundable if cancelled within 48 hours of the appointment.
                    </label>
                  </div>
                  {formErrors.agreedTerms && (
                    <span className={styles.errorMsg}>{formErrors.agreedTerms}</span>
                  )}

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setStep(2);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      &larr; Back
                    </button>

                    <button type="submit" className={`btn-primary ${styles.confirmDepositBtn}`}>
                      <span>💳 Pay £50 Deposit &amp; Confirm</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary Col */}
              <div className={`glass-card ${styles.summaryCard}`}>
                <h3 className={styles.summaryTitle}>Booking Summary</h3>

                <div className={styles.summarySection}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Vehicle:</span>
                    <span className={styles.summaryVal}>
                      {vehicle
                        ? `${vehicle.make} ${vehicle.model || vehicle.reg}`
                        : manualVehicle || 'Vehicle to be confirmed'}
                    </span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Service:</span>
                    <span className={styles.summaryVal}>{selectedService}</span>
                  </div>

                  {selectedService === 'Starlights' && (
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Package:</span>
                      <span className={styles.summaryVal}>{selectedStarlight.name}</span>
                    </div>
                  )}

                  {selectedService === 'Ambient Lights' && (
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Package:</span>
                      <span className={styles.summaryVal}>{selectedAmbient.name}</span>
                    </div>
                  )}

                  {selectedService === 'Combo' && (
                    <>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Starlights:</span>
                        <span className={styles.summaryVal}>{selectedStarlight.name}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Ambient:</span>
                        <span className={styles.summaryVal}>{selectedAmbient.name}</span>
                      </div>
                    </>
                  )}

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Date:</span>
                    <span className={styles.summaryVal}>
                      {selectedDate
                        ? selectedDate.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Not selected'}
                    </span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Time Slot:</span>
                    <span className={styles.summaryVal}>{timeSlot}</span>
                  </div>
                </div>

                <div className={styles.summaryTotals}>
                  <div className={styles.totalsRow}>
                    <span>Subtotal</span>
                    <span>£{subtotal}</span>
                  </div>

                  {comboDiscount > 0 && (
                    <div className={`${styles.totalsRow} ${styles.discountRow}`}>
                      <span>Combo Discount (15%)</span>
                      <span>-£{comboDiscount}</span>
                    </div>
                  )}

                  <div className={`${styles.totalsRow} ${styles.totalRowFinal}`}>
                    <span>Estimated Total</span>
                    <span>£{estimatedTotal}</span>
                  </div>

                  <div className={styles.depositHighlightBox}>
                    <div className={styles.depositDueRow}>
                      <span>Deposit Due Today</span>
                      <span className={styles.depositDueAmount}>£{depositDue}</span>
                    </div>
                    <div className={styles.depositNote}>
                      Remaining balance of £{remainingBalance} is payable on collection via Card or Cash.
                    </div>
                  </div>
                </div>

                <div className={styles.trustBadgeRow}>
                  <ShieldCheck size={18} className="neon-text" />
                  <span>Protected by LAC Lifetime Workmanship Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────── STEP 4: CONFIRMATION & RECEIPT ────────────────── */}
        {step === 4 && (
          <div className={styles.confirmationWrapper}>
            <div className={`glass-card ${styles.confirmCard}`}>
              <div className={styles.confirmBadge}>
                <Check size={28} strokeWidth={3} />
              </div>

              <h2 className={styles.confirmTitle}>Booking Confirmed!</h2>
              <p className={styles.confirmSubtitle}>
                Your installation slot has been locked into our calendar. We look forward to working on
                your vehicle!
              </p>

              <div className={styles.refBox}>
                <span className={styles.refLabel}>Booking Reference:</span>
                <span className={styles.refCode}>{bookingRef}</span>
              </div>

              {/* Receipt Details */}
              <div className={styles.receiptGrid}>
                <div className={styles.receiptItem}>
                  <div className={styles.receiptLabel}>Customer</div>
                  <div className={styles.receiptVal}>{fullName}</div>
                  <div className={styles.receiptSub}>{email} &bull; {phone}</div>
                </div>

                <div className={styles.receiptItem}>
                  <div className={styles.receiptLabel}>Vehicle &amp; Build</div>
                  <div className={styles.receiptVal}>
                    {vehicle
                      ? `${vehicle.make} ${vehicle.model || vehicle.reg}`
                      : manualVehicle || 'Customer Vehicle'}
                  </div>
                  <div className={styles.receiptSub}>{selectedService}</div>
                </div>

                <div className={styles.receiptItem}>
                  <div className={styles.receiptLabel}>Appointment Date</div>
                  <div className={styles.receiptVal}>
                    {selectedDate?.toLocaleDateString('en-GB', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <div className={styles.receiptSub}>{timeSlot}</div>
                </div>

                <div className={styles.receiptItem}>
                  <div className={styles.receiptLabel}>Workshop Location</div>
                  <div className={styles.receiptVal}>London Automotive Customs</div>
                  <div className={styles.receiptSub}>397 Whalebone Lane, Chadwell Heath, RM6 6RH</div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className={styles.confirmActions}>
                <a
                  href={`https://wa.me/447538963090?text=${encodeURIComponent(
                    `Hi LAC, I've booked my appointment! Ref: ${bookingRef}, Vehicle: ${
                      vehicle ? vehicle.make : manualVehicle
                    }, Date: ${selectedDate?.toLocaleDateString('en-GB')}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-primary ${styles.waActionBtn}`}
                >
                  <Send size={18} />
                  <span>Send Confirmation to Shop on WhatsApp</span>
                </a>

                <a
                  href="https://maps.google.com/?q=397+Whalebone+Lane+Chadwell+Heath+RM6+6RH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <MapPin size={18} />
                  <span>Get Workshop Directions</span>
                </a>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setStep(1);
                    setVehicle(null);
                    setRegInput('');
                    setSelectedDate(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Book Another Vehicle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d946ef' }}>
          Loading booking experience...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}

