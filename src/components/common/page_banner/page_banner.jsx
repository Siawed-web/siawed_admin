import React from "react";
import styles from "./page_banner.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import FONTS from "@/styles/fonts";
import Link from "next/link";

const PageBanner = ({ title, breadcrumbs, bgImage = "/impact-rally-1.png" }) => {
  return (
    <div
      className={styles.PageBanner}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.overlay}></div>
      <CustomContainer>
        <div className={styles.content}>
          <h1 className={`${`${styles.title} ${FONTS.font2}`} ${FONTS.font2}`}>{title}</h1>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className={styles.breadcrumbs}>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.href ? (
                    <Link href={crumb.href} className={styles.crumbLink}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={styles.crumbText}>{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className={styles.separator}>/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </CustomContainer>
    </div>
  );
};

export default PageBanner;