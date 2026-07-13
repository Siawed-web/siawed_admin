import React, { useEffect, useState } from "react";
import { CONTACT_DETAILS } from "@/constants/conatct";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import EnquiryModal from "../common/enquiry_modal/enquiry_modal";
import CustomButton from "../ui/custom_button/custom_button";
import styles from "./layout.module.scss";
import { Headphones, Headset, Whatsapp } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import Link from "next/link";

const EnquireButton = ({ setShow }) => {
  return (
    <div className={styles.enquireButton}>
      <CustomButton variant={2} onClick={() => setShow(true)}>
        <Headset /> <b>Enquire Now</b>
      </CustomButton>
    </div>
  );
};
const WhatsappButton = ({ setShow }) => {
  return (
    <Link
      href={`https://wa.me/${CONTACT_DETAILS.whatsapp1.number}?text=${CONTACT_DETAILS.whatsapp1.message}`}
      target="_blank"
      className={styles.WhatsappButton}
    >
      <Image src="/assets/whatsapp-icon.png" alt="whatsapp" width={50} />
    </Link>
  );
};

import StickyCTA from "../common/sticky_cta/sticky_cta";

const Layout = ({ children }) => {
  // const [show, setShow] = useState(false);

  // useEffect(() => {

  //   const isEnquiryPopupShown = localStorage.getItem("enquiryPopupShown")

  //   if (!isEnquiryPopupShown) {
  //     const timer = setTimeout(() => {
  //       setShow(true);
  //       localStorage.setItem("enquiryPopupShown", "true");
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [])

  return (
    <div className={styles.Layout}>
      <Header  />
      {children}
      {/* <EnquireButton setShow={setShow} />
      <WhatsappButton /> */}
      
      <StickyCTA />
      
      <Footer />
      {/* <EnquiryModal show={show} setShow={setShow} /> */}
    </div>
  );
};

export default Layout;
