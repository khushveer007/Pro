'use client';
import { useState, useEffect } from 'react';

import styles from './Hero.module.css';
import Countdown from '@/components/ui/Countdown';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Background Assets
import bgPoster from '../../../public/assets/Background1.png';
import bgLayer2 from '../../../public/assets/Background2.png';
import bgLayer3 from '../../../public/assets/Background3.png';

// Frame Assets
import cornerTL from '../../../public/assets/Group.png';
import cornerTR from '../../../public/assets/Group-2.png';
import cornerBL from '../../../public/assets/Group-1.png';
import cornerBR from '../../../public/assets/Group-3.png';
import boundaryTop from '../../../public/assets/Top.png';
import boundaryBottom from '../../../public/assets/Bottom.png';
import boundaryLeft from '../../../public/assets/Left.png';
import boundaryRight from '../../../public/assets/Right.png';

// Decoration Assets
import decoLeft from '../../../public/assets/10.svg';
import decoRight from '../../../public/assets/11.svg';

const VIDEO_PATH = '/assets/BG1.mp4';

export default function Hero() {
    const { hasScrolledPastEntrance, hasScrolledPastExit } = useScrollReveal();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [shouldMountVideo, setShouldMountVideo] = useState(false);

    useEffect(() => {
        setShouldMountVideo(true);
    }, []);

    return (
        <section className={styles.hero} data-testid="hero-section">
            {/* Background Container */}
            <div className={`${styles.bgContainer} ${hasScrolledPastEntrance ? styles.bgZoomedOut : ''}`}>
                <Image
                    src={bgPoster}
                    alt="Hero Background"
                    placeholder="blur"
                    fill
                    priority
                    className={styles.posterImage}
                />
                {shouldMountVideo && (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`${styles.bgVideo} ${isVideoLoaded ? styles.videoLoaded : ''}`}
                        onLoadedData={() => setIsVideoLoaded(true)}
                    >
                        <source src={VIDEO_PATH} type="video/mp4" />
                    </video>
                )}

                {/* Layered Background Elements */}
                <div className={styles.bgBottom}>
                    <Image src={bgLayer2} alt="" aria-hidden="true" />
                </div>
                <div className={styles.bgBottomLayer3}>
                    <Image src={bgLayer3} alt="" aria-hidden="true" />
                </div>

                <div className={styles.vignette}></div>
            </div>

            {/* Frame Group (Corners & Boundaries) */}
            <div className={`${styles.frameGroup} ${hasScrolledPastEntrance ? styles.frameZoomed : ''}`}>
                {/* Corners */}
                <div className={`${styles.corner} ${styles.cornerTopLeft}`}>
                    <Image src={cornerTL} alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.corner} ${styles.cornerTopRight}`}>
                    <Image src={cornerTR} alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.corner} ${styles.cornerBottomLeft}`}>
                    <Image src={cornerBL} alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.corner} ${styles.cornerBottomRight}`}>
                    <Image src={cornerBR} alt="" aria-hidden="true" />
                </div>

                {/* Boundaries */}
                <div className={`${styles.boundary} ${styles.boundaryTop}`}>
                    <Image src={boundaryTop} alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.boundary} ${styles.boundaryBottom}`}>
                    <Image src={boundaryBottom} alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.boundary} ${styles.boundaryLeft}`}>
                    <Image src={boundaryLeft} alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.boundary} ${styles.boundaryRight}`}>
                    <Image src={boundaryRight} alt="" aria-hidden="true" />
                </div>
            </div>

            {/* Interactive Decorations */}
            <div
                className={`${styles.decorationCorner} ${styles.decorationBottomLeft} ${hasScrolledPastEntrance ? styles.stateVisible : ''} ${hasScrolledPastExit ? styles.stateExited : ''}`}
                data-testid="decoration-left"
            >
                <Image src={decoLeft} alt="" aria-hidden="true" />
            </div>
            <div
                className={`${styles.decorationCorner} ${styles.decorationBottomRight} ${hasScrolledPastEntrance ? styles.stateVisible : ''} ${hasScrolledPastExit ? styles.stateExited : ''}`}
                data-testid="decoration-right"
            >
                <Image src={decoRight} alt="" aria-hidden="true" />
            </div>

            {/* Main Content */}
            <div className={`${styles.content} ${hasScrolledPastExit ? styles.contentShiftUp : ''}`}>
                <h1 className={styles.title}>PROJECTIONS</h1>
                <h2 className={styles.subtitle}>2026</h2>

                <Countdown />
            </div>
        </section>
    );
}