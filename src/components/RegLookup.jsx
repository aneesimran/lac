'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Search, ArrowRight, Loader2 } from 'lucide-react';
import styles from './RegLookup.module.css';

const sampleDvlaCars = {
  'BD51SMR': { make: 'BMW', model: 'M135i', year: 2021, colour: 'Misano Blue', fuel: 'Petrol', engine_cc: 1998, mot_status: 'Valid' },
  'LC70XYZ': { make: 'Mercedes-Benz', model: 'A250 AMG Line', year: 2020, colour: 'Cosmos Black', fuel: 'Petrol', engine_cc: 1991, mot_status: 'Valid' },
  'TS22TES': { make: 'Tesla', model: 'Model 3 Performance', year: 2022, colour: 'Pearl White', fuel: 'Electric', engine_cc: null, mot_status: 'Valid' },
  'RO21RVR': { make: 'Range Rover', model: 'Sport HSE', year: 2021, colour: 'Santorini Black', fuel: 'Diesel', engine_cc: 2996, mot_status: 'Valid' },
  'AU19AUD': { make: 'Audi', model: 'RS3 Sportback', year: 2019, colour: 'Nardo Grey', fuel: 'Petrol', engine_cc: 2480, mot_status: 'Valid' },
  'VW23GLF': { make: 'Volkswagen', model: 'Golf R Mk8', year: 2023, colour: 'Lapiz Blue', fuel: 'Petrol', engine_cc: 1984, mot_status: 'Valid' },
};

export default function RegLookup() {
  const router = useRouter();
  const [reg, setReg] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const navigateToBooking = (veh) => {
    const cleanReg = reg.trim().replace(/\s+/g, '').toUpperCase();
    const params = new URLSearchParams({ reg: cleanReg });
    if (veh) {
      if (veh.summary) params.set('summary', veh.summary);
      if (veh.make) params.set('make', veh.make);
      if (veh.year) params.set('year', String(veh.year));
      if (veh.colour) params.set('colour', veh.colour);
      if (veh.fuel) params.set('fuel', veh.fuel);
      if (veh.engine_cc) params.set('engine_cc', String(veh.engine_cc));
      if (veh.mot_status) params.set('mot_status', veh.mot_status);
    }
    router.push(`/booking?${params.toString()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanReg = reg.trim().replace(/\s+/g, '').toUpperCase();
    if (!cleanReg) return;

    setLoading(true);
    setErrorMsg('');
    setVehicle(null);

    try {
      const res = await fetch('/api/vehicle/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reg: cleanReg }),
      });

      const data = await res.json();

      if (res.ok && data) {
        setVehicle(data);
      } else {
        const detail = data?.detail;
        if (res.status === 404 || detail === 'vehicle_not_found') {
          setErrorMsg("Couldn't find that reg on DVLA. Continue with the booking anyway?");
        } else {
          setErrorMsg("Lookup unavailable. Continue with the booking anyway?");
        }
      }
    } catch (err) {
      console.error('DVLA lookup error:', err);
      setErrorMsg("Lookup unavailable. Continue with the booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} data-testid="reg-lookup-section">
      <div className="container">
        <div className={styles.lookupCard}>
          <div className={styles.cardFlex}>
            {/* Left Info Column */}
            <div className={styles.infoCol}>
              <div className={styles.topBadgeRow}>
                <span className={styles.startBadge}>START HERE</span>
                <span className={styles.quoteLabel}>/ INSTANT QUOTE</span>
              </div>

              <h2 className={styles.title}>
                Drop your reg.
                <br />
                See <span className={styles.titleGlow}>your car&apos;s packages.</span>
              </h2>

              <p className={styles.subtitle}>
                Type your number plate and we&apos;ll auto-match your make/model, surface the{' '}
                <strong className={styles.subtitleHighlight}>
                  exact packages your car supports
                </strong>{' '}
                (Signature Premium for Mercedes, Screen Code for compatible BMWs, Audis &amp; VWs),
                and prep the right kit before you arrive.
              </p>
            </div>

            {/* Right Registration Input Form */}
            <form
              onSubmit={handleSubmit}
              className={styles.form}
              data-testid="reg-lookup-form"
            >
              <div className={styles.plateContainer}>
                {/* UK Euro Band */}
                <div className={styles.euroBand}>
                  <div className={styles.euroStars}>★★★</div>
                  <div className={styles.euroCode}>GB</div>
                </div>

                {/* UK Registration Yellow Input */}
                <input
                  type="text"
                  value={reg}
                  onChange={(e) => {
                    const formatted = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9 ]/g, '')
                      .slice(0, 8);
                    setReg(formatted);
                    setVehicle(null);
                    setErrorMsg('');
                  }}
                  placeholder="YOUR REG"
                  aria-label="Vehicle registration"
                  spellCheck="false"
                  autoComplete="off"
                  data-testid="reg-input"
                  className={styles.plateInput}
                />
              </div>

              <button
                type="submit"
                disabled={!reg.trim() || loading}
                data-testid="reg-submit-btn"
                className={styles.submitBtn}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} />
                    <span>Checking…</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Continue booking</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Vehicle Match Preview Card */}
          {vehicle && (
            <div className={styles.matchPreview} data-testid="vehicle-preview">
              <div className={styles.matchLeft}>
                <div className={styles.matchIconWrapper}>
                  <Car size={24} />
                </div>
                <div>
                  <div className={styles.matchTag}>DVLA MATCH</div>
                  <div className={styles.matchTitle}>
                    {vehicle.make}{' '}
                    {vehicle.year ? `· ${vehicle.year}` : ''}{' '}
                    {vehicle.colour ? `· ${vehicle.colour}` : ''}
                  </div>
                  <div className={styles.matchMeta}>
                    {[
                      vehicle.fuel,
                      vehicle.engine_cc ? `${vehicle.engine_cc}cc` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
              </div>

              <button
                type="button"
                data-testid="vehicle-preview-continue"
                onClick={() => navigateToBooking(vehicle)}
                className={styles.continueBtn}
              >
                <span>Continue with this vehicle</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Fallback Banner if not found */}
          {errorMsg && !vehicle && (
            <div className={styles.fallbackBanner}>
              <div className={styles.fallbackText}>{errorMsg}</div>
              <button
                type="button"
                data-testid="lookup-fallback-continue"
                onClick={() => navigateToBooking(null, null, null)}
                className={styles.fallbackContinueBtn}
              >
                <span>Continue anyway</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Privacy Disclaimer */}
          <p className={styles.disclaimer}>
            We use your reg only to confirm fitment for your booking. We don&apos;t store or share it.
          </p>
        </div>
      </div>
    </section>
  );
}
