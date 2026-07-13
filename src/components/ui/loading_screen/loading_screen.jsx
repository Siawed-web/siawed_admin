import React from "react";
import styles from "./loading_screen.module.scss";
import { Image } from "react-bootstrap";

const LoadingScreen = (noBg) => {
  return (
    <div className={`${styles.LoadingScreen} ${noBg ? styles.noBg : ""}`}>
      <Image className={styles.loader} src="loading.gif" alt="Amigos" width={170} />
      <Image className={styles.logo} src="/logo/logo_circle.png" alt="Amigos" width={100} />
    </div>
  );
};

export default LoadingScreen;
