'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

const NAVIGATION_LINKS = [
    { name: 'Home', href: '/', alwaysVisible: true },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* Desktop Navigation */}
                <ul className={styles.navListDesktop}>
                    {NAVIGATION_LINKS.map((link, index) => (
                        <li key={link.name} className={styles.navItem}>
                            {index > 0 && (
                                <span className={styles.navSeparator} aria-hidden="true">|</span>
                            )}
                            <Link href={link.href} className={styles.navLink}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Navigation */}
                <div className={styles.mobileNav}>
                    {/* Always visible: Home link with touch target */}
                    <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                        Home
                    </Link>

                    {/* Hamburger Icon */}
                    <button
                        className={styles.menuIconCircle}
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle navigation menu"
                    >
                        <span aria-hidden="true">{isMobileMenuOpen ? '✕' : '☰'}</span>
                    </button>
                </div>

                {/* Mobile Menu Items (Collapsible) */}
                <ul
                    id="mobile-menu"
                    className={`${styles.mobileMenuItems} ${isMobileMenuOpen ? styles.active : ''}`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    {NAVIGATION_LINKS.filter(link => !link.alwaysVisible).map((link) => (
                        <li key={link.name} className={styles.mobileItem}>
                            <Link
                                href={link.href}
                                className={styles.mobileNavLink}
                                onClick={closeMobileMenu}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
