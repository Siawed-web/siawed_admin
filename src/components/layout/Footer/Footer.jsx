import React, { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { FONTS } from "@/styles/fonts";
import { NAV_ITEMS } from "@/constants/constants";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  GeoAltFill, 
  TelephoneFill, 
  EnvelopeFill, 
  Globe 
} from "react-bootstrap-icons";
import { Image } from "react-bootstrap";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <div className={styles.footerContainer}>
      <footer id="contact">
        <div className={styles.footerGrid}>
          {/* Col 1: Brand */}
          <div>
            <Image className={styles.footerBrandLogo} src="/logo/logo4.png" alt="SIAWED – Empower Elevate Enrich" />
            <p className={styles.footerBrandDesc}>
              Southern Industrial Academy for Women Entrepreneurs Development — creating pathways for women across India to build, grow, and scale successful enterprises through the SIAWED & WENBA ecosystem.
            </p>
            <div className={styles.footerSocial} aria-label="SIAWED social media links">
              <a href="https://facebook.com/siawed" title="Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a>
              <a href="https://instagram.com/siawed" title="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
              <a href="https://linkedin.com/company/siawed" title="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://youtube.com/@siawed" title="YouTube" target="_blank" rel="noopener noreferrer"><Youtube /></a>
            </div>
            {/* WENBA mini in footer */}
            <div className={styles.footerWenba}>
           <Image src="/logo/wenba_logo.png" width={80} alt="wenba_logo"/>
              <span className={styles.footerWenbaText}>Vendor & procurement marketplace<br/>powered by SIAWED</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className={styles.footerCol}>
            <h4 className={FONTS.font2}>Quick Links</h4>
            <nav className={styles.footerLinks} aria-label="Footer quick links">
              {NAV_ITEMS.map((item, index) => (
                <Link key={index} href={item.href}>{item.title}</Link>
              ))}
            </nav>
          </div>

          {/* Col 3: WENBA Links */}
          <div className={styles.footerCol}>
            <h4 className={FONTS.font2}>WENBA</h4>
            <nav className={styles.footerLinks} aria-label="WENBA links">
              {NAV_ITEMS.find(item => item.id === 'wenba')?.dropdown?.map((section) => 
                section.links.map((link, lIndex) => (
                  <Link key={`${section.label}-${lIndex}`} href={link.href}>{link.title}</Link>
                ))
              )}

            </nav>
          </div>

          {/* Col 4: Contact + Newsletter */}
          <div className={styles.footerCol}>
            <h4 className={FONTS.font2}>Get in Touch</h4>
            <address style={{ fontStyle: "normal" }}>
              <div className={styles.footerContactItem}>
                <span className={styles.footerContactIcon} aria-hidden="true"><GeoAltFill /></span>
                <span className={styles.footerContactText}>601 &#8220;DEEPA&#8221;, Chitra Avenue, Choolaimedu High Road, Chennai &#8211; 600094</span>
              </div>
              <div className={styles.footerContactItem}>
                <span className={styles.footerContactIcon} aria-hidden="true"><TelephoneFill /></span>
                <span className={styles.footerContactText}><a href="tel:+914443514334">044 4351 4334</a></span>
              </div>
              <div className={styles.footerContactItem}>
                <span className={styles.footerContactIcon} aria-hidden="true"><EnvelopeFill /></span>
                <span className={styles.footerContactText}><a href="mailto:info@siawed.org">info@siawed.org</a></span>
              </div>
            
            </address>

            <span className={styles.footerNewsletterLabel} id="newsletter-label">Newsletter</span>
            <div className={styles.footerNewsletter} role="form" aria-labelledby="newsletter-label">
              <input 
                type="email" 
                placeholder={isSubscribed ? "You're subscribed!" : "Your email address"} 
                aria-label="Email address for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="button" 
                onClick={handleSubscribe} 
                style={isSubscribed ? { background: '#0D7A6E' } : {}}
              >
                {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>&#169; 2026 SIAWED. All rights reserved.</span>
          <span>
            <Link href="/terms-conditions">Terms & Conditions</Link> &#183;
            <Link href="/privacy-policy">Privacy Policy</Link> &#183;
            <Link href="/refund-policy">Refund Policy</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
