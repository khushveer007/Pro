document.addEventListener('DOMContentLoaded', () => {
    // Set the date we're counting down to: Jan 1, 2026
    const countDownDate = new Date("Jan 1, 2026 00:00:00").getTime();
    let timerInterval;

    function updateTimer() {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            if (timerInterval) clearInterval(timerInterval);
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
        }
    }

    // Run immediately then every second
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    // Scroll Reveal Logic
    // Unified Scroll Animation Logic
    const handleScrollAnimations = () => {
        const scrollY = window.scrollY;
        const screenHeight = window.innerHeight;

        // Thresholds
        const entranceThreshold = 20; // px
        const exitThreshold = screenHeight * 0.7; // 70% of viewport - Exits after scrolling down content

        // Elements
        const decorations = document.querySelectorAll('.decoration-corner');
        const frameGroup = document.querySelector('.frame-group');
        const backgrounds = document.querySelectorAll('.bg-image, .bg-bottom, .bg-bottom-layer-3');
        const nav = document.querySelector('.sticky-nav');
        const contentWrapper = document.querySelector('.content-wrapper');

        // Logic for Decorations
        if (scrollY < entranceThreshold) {
            // State: Hidden (Bottom)
            decorations.forEach(el => {
                el.classList.remove('state-visible', 'state-exited');
            });
        } else if (scrollY >= entranceThreshold && scrollY < exitThreshold) {
            // State: Visible (Active)
            decorations.forEach(el => {
                el.classList.add('state-visible');
                el.classList.remove('state-exited');
            });
        } else if (scrollY >= exitThreshold) {
            // State: Exited (Side)
            decorations.forEach(el => {
                el.classList.remove('state-visible');
                el.classList.add('state-exited');
            });
        }

        // Logic for Other Elements (Frame, BG, Nav, Content) - Triggered on Entrance
        if (scrollY > entranceThreshold) {
            if (frameGroup) frameGroup.classList.add('frame-zoomed');
            backgrounds.forEach(bg => bg.classList.add('bg-zoomed-out'));
            if (nav) nav.classList.add('nav-visible');
        }
        // Note: We don't revert these as per original implementation preference ("Stays...").

        // Logic for Content Shift (Linked to Exit)
        if (contentWrapper) {
            if (scrollY >= exitThreshold) {
                contentWrapper.classList.add('content-shift-up');
            } else {
                contentWrapper.classList.remove('content-shift-up');
            }
        }
    };

    // Attach Listener
    window.addEventListener('scroll', handleScrollAnimations);

    // Initial Check
    handleScrollAnimations();



    // Force scroll to top on reload
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    // Attempt to enable sound immediately, with interaction fallback
    // Audio Control Logic
    const video = document.querySelector('.bg-image');

    if (video) {
        // Ensure volume is up
        video.volume = 1.0;

        /**
         * Tries to unmute and play the video.
         * Returns a promise that resolves if successful, rejects if blocked.
         */
        const tryAudio = () => {
            video.muted = false;
            return video.play();
        };

        // 1. Attempt immediately on load (will likely fail on modern browsers)
        tryAudio().then(() => {
            console.log('Audio playing immediately');
        }).catch(() => {
            console.log('Autoplay blocking audio. Waiting for interaction.');
            // Ensure it keeps playing visually (muted)
            video.muted = true;
            video.play();

            // 2. Add "Unlock" listeners for user interaction
            const unlockAudio = () => {
                tryAudio().then(() => {
                    console.log('Audio unlocked by user interaction');
                    // Remove listeners once successful
                    document.removeEventListener('click', unlockAudio);
                    document.removeEventListener('keydown', unlockAudio);
                    document.removeEventListener('touchstart', unlockAudio);
                }).catch((e) => {
                    console.error('Audio unlock failed even after interaction:', e);
                });
            };

            document.addEventListener('click', unlockAudio);
            document.addEventListener('keydown', unlockAudio);
            document.addEventListener('touchstart', unlockAudio);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');

    if (mobileMenuBtn && mobileMenuDropdown) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close if using document click listener
            mobileMenuDropdown.classList.toggle('active');
        });

        // Optional: Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenuDropdown.contains(e.target)) {
                mobileMenuDropdown.classList.remove('active');
            }
        });
    }
});
