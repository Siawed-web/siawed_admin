import React from "react";
import styles from "./section_heading.module.scss";
import FONTS from "@/styles/fonts";

const SectionHeading = ({
  title,
  head,
  variation = 1,
  caption,
  leftAllign,
}) => {
  return (
    <div
      className={`${styles.SectionHeading} ${styles[`v${variation}`]}`}
      style={{
        textAlign: leftAllign ? "left" : "center",
      }}
    >
      <p
        data-aos="fade-down"
        style={{
          margin: leftAllign ? "0" : "auto",
        }}
      >
        <span />
        {title}
      </p>
      <h2 className={FONTS.font2} data-aos="fade-up">
        {head}
      </h2>
      <small>{caption}</small>
    </div>
  );
};

export default SectionHeading;
