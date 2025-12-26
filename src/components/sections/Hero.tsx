import styles from './Hero.module.css';
import Countdown from '@/components/ui/Countdown';
import bgPoster from '@/../public/assets/Background1.png';

export default function Hero() {
    return (
        <section className={styles.hero} data-testid="hero-section">
            <div className={styles.bgContainer}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.bgVideo}
                    poster={bgPoster.src}
                >
                    <source src="/assets/BG1.mp4" type="video/mp4" />
                </video>
                <div className={styles.vignette}></div>
            </div>

            <div className={styles.content}>
                <h1 className={styles.title}>PROJECTIONS</h1>
                <h2 className={styles.subtitle}>2026</h2>

                <Countdown />
            </div>
        </section>
    );
}
