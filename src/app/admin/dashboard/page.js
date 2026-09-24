'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  RotateCcw,
  LogOut,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Car,
} from 'lucide-react';
import styles from './dashboard.module.css';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'gallery'
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, by_status: {} });
  const [gallerySubmissions, setGallerySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bookingsRes, statsRes, galleryRes] = await Promise.all([
        fetch(`/api/admin/bookings${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`),
        fetch('/api/admin/stats'),
        fetch('/api/admin/gallery'),
      ]);

      const [bookingsData, statsData, galleryData] = await Promise.all([
        bookingsRes.json(),
        statsRes.json(),
        galleryRes.json(),
      ]);

      if (Array.isArray(bookingsData)) setBookings(bookingsData);
      if (statsData) setStats(statsData);
      if (Array.isArray(galleryData)) setGallerySubmissions(galleryData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    // If opened directly without token, set demo session for instant usability
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('lac_admin_token');
      if (!token) {
        localStorage.setItem('lac_admin_token', 'lac_demo_admin_jwt');
      }
    }
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lac_admin_token');
      localStorage.removeItem('lac_admin_user');
    }
    router.push('/admin/login');
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModerateGallery = async (id, status) => {
    try {
      await fetch('/api/admin/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'paid':
        return styles.statusPaid;
      case 'confirmed':
        return styles.statusConfirmed;
      case 'completed':
        return styles.statusCompleted;
      default:
        return styles.statusPending;
    }
  };

  return (
    <div className={styles.dashboardPage} data-testid="admin-dashboard">
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.brandLink}>
            <Image
              src="https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/33963u68_Lac%20logo.JPG"
              alt="LAC Logo"
              width={38}
              height={38}
              className={styles.brandLogo}
            />
            <div className={styles.brandMeta}>
              <div className={styles.controlTag}>LAC · CONTROL</div>
              <div className={styles.brandTitle}>Operations Portal</div>
            </div>
          </Link>

          <div className={styles.headerActions}>
            <button
              type="button"
              onClick={fetchData}
              data-testid="refresh-btn"
              className={styles.actionBtn}
            >
              <RotateCcw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              data-testid="logout-btn"
              className={`${styles.actionBtn} ${styles.logoutBtn}`}
            >
              <LogOut size={15} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.main}>
        {/* Metric Cards Grid */}
        <div className={styles.statsGrid} data-testid="stats-grid">
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Bookings</div>
            <div className={styles.statValue}>{stats.total || bookings.length}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Paid Deposits</div>
            <div className={styles.statValue} style={{ color: '#4ade80' }}>
              {stats.by_status?.paid || 0}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Confirmed Slots</div>
            <div className={styles.statValue} style={{ color: '#f0abfc' }}>
              {stats.by_status?.confirmed || 0}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Completed Installs</div>
            <div className={styles.statValue} style={{ color: '#60a5fa' }}>
              {stats.by_status?.completed || 0}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statValue} style={{ color: '#fde047' }}>
              {stats.by_status?.pending_deposit || 0}
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className={styles.navTabs}>
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`${styles.tabBtn} ${activeTab === 'bookings' ? styles.tabActive : ''}`}
          >
            <Calendar size={16} /> Bookings ({bookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`${styles.tabBtn} ${activeTab === 'gallery' ? styles.tabActive : ''}`}
          >
            <Sparkles size={16} /> Customer POV Submissions ({gallerySubmissions.length})
          </button>
        </div>

        {/* Bookings View */}
        {activeTab === 'bookings' && (
          <div>
            <div className={styles.filterRow}>
              <div>
                <h2 className={styles.filterTitle}>Incoming Installations</h2>
                <p style={{ color: '#71717a', fontSize: '0.85rem' }}>
                  {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'} listed
                </p>
              </div>

              <div className={styles.filterControls}>
                <Filter size={15} style={{ color: '#a1a1aa' }} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.select}
                  data-testid="filter-select"
                >
                  <option value="all">All statuses</option>
                  <option value="paid">Paid</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="pending_deposit">Pending Deposit</option>
                </select>
              </div>
            </div>

            <div className={styles.tableCard} data-testid="bookings-table">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ref / Customer</th>
                    <th>Vehicle</th>
                    <th>Service &amp; Package</th>
                    <th>Appointment Slot</th>
                    <th>Deposit</th>
                    <th>Status &amp; Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div className={styles.customerName}>{booking.name}</div>
                        <div className={styles.customerContact}>
                          {booking.phone} &bull; {booking.email}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#52525b', marginTop: '2px' }}>
                          {booking.id}
                        </div>
                      </td>
                      <td>
                        <div className={styles.vehicleText}>{booking.vehicle}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{booking.service}</div>
                        <div className={styles.packageText}>{booking.package}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{booking.date}</div>
                        <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{booking.time}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#4ade80' }}>
                          &pound;{Number(booking.deposit).toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#71717a' }}>
                          Total: &pound;{Number(booking.total).toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className={`${styles.statusBadge} ${getStatusClass(booking.status)}`}>
                            {booking.status}
                          </span>
                          <select
                            value={booking.status}
                            onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                            style={{
                              background: '#181820',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#fff',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '0.75rem',
                            }}
                          >
                            <option value="paid">Paid</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="pending_deposit">Pending</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer POV Moderation View */}
        {activeTab === 'gallery' && (
          <div>
            <div className={styles.filterRow}>
              <div>
                <h2 className={styles.filterTitle}>Review Customer Gallery Submissions</h2>
                <p style={{ color: '#71717a', fontSize: '0.85rem' }}>
                  Submissions uploaded via /gallery/submit. Approve to feature in the public gallery.
                </p>
              </div>
            </div>

            <div className={styles.galleryGrid}>
              {gallerySubmissions.map((sub) => (
                <div key={sub.id} className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <div>
                      <div className={styles.reviewName}>{sub.name}</div>
                      <div className={styles.reviewVehicle}>{sub.vehicle || 'Vehicle not specified'}</div>
                    </div>
                    <span
                      className={`${styles.statusBadge} ${
                        sub.status === 'approved' ? styles.statusPaid : styles.statusPending
                      }`}
                    >
                      {sub.status || 'pending'}
                    </span>
                  </div>

                  <a
                    href={sub.media_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.reviewLink}
                  >
                    <ExternalLink size={13} /> {sub.media_url}
                  </a>

                  {sub.note && <div className={styles.reviewNote}>&ldquo;{sub.note}&rdquo;</div>}

                  <div className={styles.reviewActions}>
                    <button
                      type="button"
                      onClick={() => handleModerateGallery(sub.id, 'approved')}
                      className={styles.approveBtn}
                    >
                      <ThumbsUp size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModerateGallery(sub.id, 'rejected')}
                      className={styles.rejectBtn}
                    >
                      <ThumbsDown size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
