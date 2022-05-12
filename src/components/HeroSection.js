import React from "react";
import banner from "../img/banner.png";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className={styles.container}>
      <div className={styles["text-container"]}>
        <p className={`${styles.text} ${styles.p1}`}>
          Best Culinary Destinations Around Indonesia
        </p>
        <h1 className={`${styles.headline} ${styles.unscrolled}`}>
          Find Places to <span>Enjoy</span> and <span>Live</span> a New
          Experience of
          <span> Eating</span>.
        </h1>
        <p className={styles.text}>
          Just like many things in Indonesia, the food is as diverse as it gets.
          Every ethnicity in the country holds unique recipes specific to their
          culture. Let's help our friends to find the best Indonesian food
          place, because it's definitely deserves some time in the limelight.
        </p>

        <Link to="/restaurants">
          <button className={styles.button}>Find Out More!</button>
        </Link>
      </div>
      <div className={styles["image-container"]}>
        <img className={styles.image} src={banner} />
      </div>
    </div>
  );
}

export default HeroSection;
