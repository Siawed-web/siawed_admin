import React, { useState, useEffect } from "react";
import Link from "next/link";


import styles from "./Header.module.scss";
import { 
  GeoAltFill, TelephoneFill, EnvelopeFill, Globe, 
  ChevronDown, HeartFill, House, Gear, Briefcase, People, List, Whatsapp, Download
} from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { NAV_ITEMS } from "@/constants/constants";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);
  
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.topbar} role="banner">
        <span><GeoAltFill /> 601 &#8220;DEEPA&#8221;, Choolaimedu High Road, Chennai &#8211; 600094</span>
        <div className={styles.topbarRight}>
          <a href="tel:+914443514334"><TelephoneFill /> 044 4351 4334</a>
          <a href="https://wa.me/916381814441" target="_blank" rel="noopener noreferrer"><Whatsapp /> +91 63818 14441</a>
          <a href="mailto:info@siawed.org"><EnvelopeFill /> info@siawed.org</a>
         
        </div>
      </div>

      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <Link href="/" className={styles.navLogo} aria-label="SIAWED Home">
          <Image src="/logo/logo4.png" alt="SIAWED" width={200} />
          <div className={styles.floatingRibbon}>14 Years of Excellence</div>
        </Link>

        <ul className={styles.navMenu}>
          {NAV_ITEMS.map((item, index) => {
            if (!item.dropdown) {
              return (
                <li key={index} className={styles.navItem}>
                  <Link href={item.href} className={styles.navLink}>{item.title}</Link>
                </li>
              );
            }

            return (
              <li key={index} className={`${styles.navItem} ${item.isMega ? styles.navItemWenba : ''}`}>
                <Link href={item.href} className={styles.navLink}>
                  {item.title} <span className={styles.navLinkArrow}><ChevronDown /></span>
                </Link>
                <div className={`${styles.dropdown} ${item.isMega ? styles.dropdownMega : ''}`}>
                  {item.dropdown.map((section, sIndex) => (
                    <React.Fragment key={sIndex}>
                      {item.isMega ? (
                        <div className={styles.dropdownCol}>
                          {section.label && <span className={styles.dropdownLabel}>{section.label}</span>}
                          {section.links.map((link, lIndex) => (
                            <Link key={lIndex} href={link.href} className={styles.dropdownLink}>{link.title}</Link>
                          ))}
                        </div>
                      ) : (
                        <>
                          {sIndex > 0 && section.label && <hr className={styles.dropdownDivider} />}
                          {section.label && <span className={styles.dropdownLabel}>{section.label}</span>}
                          {section.links.map((link, lIndex) => (
                            <Link key={lIndex} href={link.href} className={styles.dropdownLink}>{link.title}</Link>
                          ))}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.navCtas}>
          <CustomButton href="/SIAWED Brochure.pdf" variant="outline-blue" size="sm" style={{ marginRight: '10px' }} target="_blank">
            <Download /> Download Brochure
          </CustomButton>
          <CustomButton href="/donate" variant="orange" size="sm"><HeartFill /> Donate</CustomButton>
        </div>

        <button 
          className={`${styles.hamburger} ${drawerOpen ? styles.isOpen : ''}`} 
          id="hamburger" 
          aria-label="Toggle menu" 
          aria-expanded={drawerOpen}
          onClick={toggleDrawer}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.isOpen : ''}`} id="drawer" aria-hidden={!drawerOpen}>
        <div className={styles.drawerOverlay} id="drawer-overlay" onClick={closeDrawer}></div>
        <div className={styles.drawerPanel}>
          <div className={styles.drawerHeader}>
            <Image src="/logo/logo4.png" alt="SIAWED"/>
            <button className={styles.drawerClose} id="drawer-close" onClick={closeDrawer} aria-label="Close menu">&times;</button>
          </div>
          <div className={styles.drawerBody}>
            {NAV_ITEMS.map((item, index) => {
              if (!item.dropdown) {
                return (
                  <div key={index} className={styles.drawerItem}>
                    <Link href={item.href} className={styles.drawerTrigger} onClick={closeDrawer}>{item.title}</Link>
                  </div>
                );
              }

              return (
                <div key={index} className={styles.drawerItem}>
                  <button 
                    className={`${styles.drawerTrigger} ${item.isMega ? styles.drawerTriggerWenba : ''} ${openSubmenu === item.id ? styles.isOpen : ''}`} 
                    onClick={() => toggleSubmenu(item.id)}
                  >
                    {item.title} <span className={styles.drawerTriggerChevron}><ChevronDown /></span>
                  </button>
                  <div className={`${styles.drawerSub} ${openSubmenu === item.id ? styles.isOpen : ''}`}>
                    {item.dropdown.map((section, sIndex) => (
                      <React.Fragment key={sIndex}>
                        {section.label && <span className={styles.drawerSubLabel}>{section.label}</span>}
                        {section.links.map((link, lIndex) => (
                          <Link key={lIndex} href={link.href} onClick={closeDrawer}>{link.title}</Link>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.drawerFooter} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CustomButton href="/SIAWED Brochure.pdf" variant="outline-blue" className={styles.btn} onClick={closeDrawer} target="_blank">
              <Download /> Download Brochure
            </CustomButton>
            <CustomButton href="/donate" variant="orange" className={styles.btn} onClick={closeDrawer}>
              <HeartFill /> Donate
            </CustomButton>
          </div>
        </div>
      </div>

      {/* BOTTOM TABS FOR MOBILE */}
      <nav className={styles.bottomTabs}>
        <ul className={styles.bottomTabsList}>
          <li className={styles.bottomTabsItem}>
            <Link href="/" className={`${styles.bottomTab} ${styles.isActive}`}>
              <span className={styles.bottomTabIcon}><House /></span>
              Home
            </Link>
          </li>
          <li className={styles.bottomTabsItem}>
            <Link href="/programs" className={styles.bottomTab}>
              <span className={styles.bottomTabIcon}><Gear /></span>
              Programs
            </Link>
          </li>
          <li className={styles.bottomTabsItem}>
            <Link href="/wenba" className={`${styles.bottomTab} ${styles.bottomTabWenba}`}>
              <span className={styles.bottomTabIcon}><Briefcase /></span>
              WENBA
            </Link>
          </li>
          <li className={styles.bottomTabsItem}>
            <Link href="/membership" className={styles.bottomTab}>
              <span className={styles.bottomTabIcon}><People /></span>
              Members
            </Link>
          </li>
          <li className={styles.bottomTabsItem}>
            <button className={styles.bottomTab} onClick={toggleDrawer}>
              <span className={styles.bottomTabIcon}><List /></span>
              More
            </button>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Header;
