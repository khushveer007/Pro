'use client';

import Image from 'next/image';
import styles from './Countdown.module.css';
import timerElement from '@/../public/assets/Timer Element.svg';
import loadingContainer from '@/../public/assets/Loading container.svg';
import loadingLogo from '@/../public/assets/Loading logo.svg';
import { useCountdown } from '@/hooks/useCountdown';

// Hardcoded target date - extracted for visibility, ideally moved to config
const TARGET_DATE = '2026-01-01T00:00:00';

export default function Countdown() {
    const { timeLeft, isClient } = useCountdown(TARGET_DATE);

    if (!isClient) {
        return <div className={styles.countdownContainer}>Loading...</div>;
    }

    return (
        <div className={styles.countdownContainer}>
            {/* Loading Badge Section */}
            <div className={styles.loadingBadge}>
                <Image
                    src={loadingContainer}
                    alt="Loading Frame"
                    className={styles.loadingBg}
                />
                <div className={styles.loadingContent}>
                    <Image
                        src={loadingLogo}
                        alt="Loading Logo"
                        className={styles.loadingLogo}
                    />
                </div>
            </div>

            {/* Main Timer Section */}
            <div className={styles.timerWrapper}>
                <Image
                    src={timerElement}
                    alt="Timer Frame"
                    className={styles.timerBg}
                    priority
                />

                <div className={styles.timerValues}>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className={styles.label}>Days</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className={styles.label}>Hours</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className={styles.label}>Minutes</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className={styles.label}>Seconds</span>
                    </div>
                </div>
            </div>

            <div className={styles.heartsContainer}>
                <span className={styles.heart}>♥</span>
                <span className={styles.heart}>♥</span>
                <span className={styles.heart}>♥</span>
            </div>
        </div>
    );
}
