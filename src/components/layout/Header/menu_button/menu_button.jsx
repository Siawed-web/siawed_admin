import React, { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  EnvelopeAtFill,
  GeoAlt,
  GeoAltFill,
  HeartPulse,
  List,
  Telephone,
  TelephoneFill,
} from "react-bootstrap-icons";
import styles from "./menu_button.module.scss";
import { Offcanvas } from "react-bootstrap";

import Link from "next/link";
import { CONTACT_DETAILS } from "@/constants/conatct";
import Logo from "@/components/common/logo/logo";
import FONTS from "@/styles/fonts";
import CustomButton from "@/components/ui/custom_button/custom_button";

const NavItem = ({ item, setShowDrawer }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  if (item.dropdown) {
    return (
      <div>
        <p
          onClick={() => {
            setShowDropDown((prev) => !prev);
          }}
          className={showDropDown ? styles.activeDropdownParent : ""}
        >
          {item.title}{" "}
          <ChevronDown
            style={{
              transform: showDropDown ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </p>

        {showDropDown && (
          <div className={styles.dropdown}>
            {item.dropdown.map((dd) => {
              return (
                <NavItem
                  key={dd.title}
                  item={dd}
                  setShowDrawer={setShowDrawer}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Link
        href={item.href || "#"}
        onClick={() => {
          setShowDrawer(false);
        }}
      >
        {item.title}
      </Link>
    </div>
  );
};

const MOBILE_PAGES = [
  {
    title: "About Us",
    href: "/about",
    dropdown: [
      { title: "Who we are", href: "/about#who-we-are" },
      { title: "What we do", href: "/about#what-we-do" },
      { title: "Our services UX", href: "/services" },
      { title: "Why choose us", href: "/about#why-choose-us" },
      { title: "Vision & Mission", href: "/about#vision-mission" },
      { title: "Our Founder President", href: "/about#founder" },
    ]
  },
  {
    title: "Programs",
    href: "/programs",
    dropdown: [
      { title: "Entrepreneurship Development", href: "/programs/edp" },
      { title: "Capacity Building & Training", href: "/programs/training" },
      { title: "Digital Marketing Training", href: "/programs/digital-marketing" },
      { title: "Business Growth Programs", href: "/programs/business-growth" },
      { title: "Mentorship programs", href: "/programs/mentorship" },
      { title: "Internship opportunities", href: "/programs/internships" },
      { title: "Certification courses", href: "/programs/certifications" },
    ]
  },
  {
    title: "WENBA",
    href: "/wenba",
    dropdown: [
      { title: "What is WENBA and its offerings to native MSMEs.", href: "/wenba#about" },
      { title: "Register as a vendor", href: "/wenba/vendor-registration" },
      { title: "Product categories available", href: "/wenba/categories" },
      { title: "Raise a procurement request", href: "/wenba/procurement" },
    ]
  },
  {
    title: "Memberships",
    href: "/memberships",
    dropdown: [
      { title: "Member benefits", href: "/memberships#benefits" },
      { title: "Membership plans", href: "/memberships#plans" },
      { title: "Become a member", href: "/memberships/apply" },
    ]
  },
  {
    title: "Corporate",
    href: "/corporate",
    dropdown: [
      { title: "Corporate catalogue", href: "/corporate/catalogue" },
      { title: "Impact reports at a glance", href: "/corporate/impact" },
      { title: "Request a consultation", href: "/corporate/consultation" },
    ]
  },
  {
    title: "Events",
    href: "/events",
    dropdown: [
      { title: "Upcoming Events", href: "/events/upcoming" },
      { title: "Past Events", href: "/events/past" },
      { title: "Gallery", href: "/events/gallery" },
    ]
  },
  {
    title: "Contact",
    href: "/contact",
    dropdown: [
      { title: "Get in touch", href: "/contact" },
      { title: "Volunteer with us", href: "/volunteer" },
      { title: "Careers", href: "/careers" },
    ]
  },
  {
    title: "sponsor Now",
    href: "/sponsor",
    dropdown: [
      { title: "Educate a girl child", href: "/sponsor/educate" },
      { title: "Go green initiatives", href: "/sponsor/green" },
      { title: "Social cause", href: "/sponsor/social" },
    ]
  }
];

const RightMenu = ({ pages }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className={styles.RightMenu}>
      <Link
        href={`tel:+${CONTACT_DETAILS.phone1.number}`}
        className={styles.callBtn}
      >
        <CustomButton><HeartPulse/> Donate Us</CustomButton>
        
      </Link>

      <div className={styles.MenuButton}>
        <List
          onClick={() => {
            setShowDrawer(true);
          }}
        />

        <Offcanvas
          show={showDrawer}
          onHide={() => {
            setShowDrawer(false);
          }}
          placement="start"
          className={styles.drawer}
        >
          <Offcanvas.Header closeButton className={styles.drawerHeader}>
            <Logo />
          </Offcanvas.Header>

          <Offcanvas.Body className={styles.drawerBody}>
            
            <div>
              <nav className={styles.navSm}>
                <ul>
                  {MOBILE_PAGES.map((page) => {
                    return (
                      <NavItem
                        key={page.title}
                        item={page}
                        setShowDrawer={setShowDrawer}
                      />
                    );
                  })}
                </ul>
              </nav>

              <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
                <CustomButton variant={2} href="/donate" style={{ width: "100%", textAlign: "center", justifyContent: "center" }}>
                  <HeartPulse className="me-2" /> Donate Now
                </CustomButton>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default RightMenu;
