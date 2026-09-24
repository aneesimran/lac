'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <a
        href="https://wa.me/447538963090?text=Hi%20LAC%20team,%20I'm%20interested%20in%20booking%20an%20install%20for%20my%20car."
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label="Chat with London Automotive Customs on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={styles.pulse}></span>
        <svg
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16c0 2.657.742 5.14 2.03 7.26L2.3 29.28a.75.75 0 00.92.92l6.02-1.73A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.45 11.45 0 01-5.748-1.545.75.75 0 00-.592-.073l-4.234 1.218 1.218-4.234a.75.75 0 00-.073-.592A11.45 11.45 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.545-8.232c-.36-.18-2.128-1.05-2.457-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.896-1.79-1.07-.954-1.793-2.133-2.003-2.493-.21-.36-.022-.555.158-.734.162-.162.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.293-.703-.59-.608-.81-.619-.21-.01-.45-.013-.69-.013-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.155 5.44.86.37 1.532.59 2.056.76.864.275 1.65.236 2.27.143.693-.104 2.128-.87 2.428-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z"
            fill="#FFFFFF"
          />
        </svg>

        <span className={`${styles.tooltip} ${hovered ? styles.tooltipVisible : ''}`}>
          Chat with LAC on WhatsApp
        </span>
      </a>
    </div>
  );
}
