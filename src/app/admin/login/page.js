'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Lock, Mail } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      // Store auth session
      if (typeof window !== 'undefined') {
        localStorage.setItem('lac_admin_token', data.token);
        localStorage.setItem('lac_admin_user', JSON.stringify(data.user));
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.glow} />

      <Link href="/" className={styles.homeLink} data-testid="back-to-home">
        <ArrowLeft size={16} /> Home
      </Link>

      <div className={styles.card} data-testid="admin-login-card">
        <div className={styles.logoBox}>
          <Image
            src="https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/33963u68_Lac%20logo.JPG"
            alt="LAC Logo"
            width={72}
            height={72}
            className={styles.logoImg}
            priority
          />
        </div>

        <div className={styles.portalTag}>ADMIN PORTAL</div>
        <h1 className={styles.title}>Sign in to LAC</h1>
        <p className={styles.subtitle}>Manage incoming bookings and customers.</p>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              data-testid="login-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lac.ltd"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              data-testid="login-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
            data-testid="login-submit-btn"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign in'}
          </button>
        </form>

        <div className={styles.demoHint}>
          Default demo access: <strong>admin@lac.ltd</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}
