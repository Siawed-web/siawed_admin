import React from "react";
import styles from "./sticky_cta.module.scss";
import { ArrowRightCircleFill } from "react-bootstrap-icons";

const StickyCTA = () => {
  return (
    <a 
      href="https://www.wenba.in" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.StickyCTA}
    >
      <span className={styles.text}>Join WENBA</span>
      <ArrowRightCircleFill className={styles.icon} />
    </a>
  );
};

export default StickyCTA;
