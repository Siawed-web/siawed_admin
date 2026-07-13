import React from "react";
import styles from "./section_wrapper.module.scss";
import CustomContainer from "../custom_container/custom_container";

const SectionWrapper = ({
  id,
  bgColor = "white", // 'white', 'ivory', 'parchment', 'charcoal', 'transparent'
  containerSize = "lg", // 'sm', 'md', 'lg', 'xl', 'fluid'
  aos = "fade-up",
  className = "",
  children,
}) => {
  // Map bgColor string to the SCSS module class
  const bgClass =
    bgColor === "ivory"
      ? styles.bgIvory
      : bgColor === "parchment"
      ? styles.bgParchment
      : bgColor === "charcoal"
      ? styles.bgCharcoal
      : bgColor === "transparent"
      ? ""
      : styles.bgWhite;

  return (
    <section
      id={id}
      className={`${styles.section} ${bgClass} ${className}`.trim()}
    >
      <CustomContainer lg={containerSize === "lg"}>
        <div data-aos={aos}>{children}</div>
      </CustomContainer>
    </section>
  );
};

export default SectionWrapper;
