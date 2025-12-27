import Image from 'next/image';
import styles from './Countdown.module.css';
import timerElement from '@/../public/assets/Timer Element.svg';
import loadingContainer from '@/../public/assets/Loading container.svg';
import loadingLogo from '@/../public/assets/Loading logo.svg';

export default function CountdownSkeleton() {
    return (
        <div className={styles.countdownContainer} data-testid="countdown-skeleton">
            {/* Loading Badge Section */}
            <div className={styles.loadingBadge}>
                <Image
                    src={loadingContainer}
                    alt=""
                    aria-hidden="true"
                    className={styles.loadingBg}
                />
                <div className={styles.loadingContent}>
                    <Image
                        src={loadingLogo}
                        alt=""
                        aria-hidden="true"
                        className={styles.loadingLogo}
                    />
                </div>
            </div>

            {/* Main Timer Section */}
            <div className={styles.timerWrapper}>
                <Image
                    src={timerElement}
                    alt=""
                    aria-hidden="true"
                    className={styles.timerBg}
                    priority
                />

                <div className={styles.timerValues}>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>00</span>
                        <span className={styles.label}>Days</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>00</span>
                        <span className={styles.label}>Hours</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>00</span>
                        <span className={styles.label}>Minutes</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBlock}>
                        <span className={styles.number}>00</span>
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
