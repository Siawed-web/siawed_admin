import React from "react";
import Link from "next/link";
import styles from "./custom_button.module.scss";

const CustomButton = ({
  href,
  children,
  disabled,
  type = "button",
  variant = "blue", // 'blue', 'orange', 'teal', 'outline-white', 'outline-blue', 'ghost'
  size = "md", // 'sm', 'md', 'lg'
  fullWidth = false,
  onClick,
  className = "",
  ...props
}) => {
  const variantMap = {
    'blue': styles.btnBlue,
    'orange': styles.btnOrange,
    'teal': styles.btnTeal,
    'outline-white': styles.btnOutlineWhite,
    'outline-blue': styles.btnOutlineBlue,
    'ghost': styles.btnGhost,
  };
  const variantClass = variantMap[variant] || styles.btnBlue;
  
  // Size classes
  const sizeClass = size === "lg" ? styles.btnLg : size === "sm" ? styles.btnSm : "";
  const fullClass = fullWidth ? styles.btnFull : "";

  const classes = `${styles.btn} ${variantClass} ${sizeClass} ${fullClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
