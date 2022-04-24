import React from "react";
import banner from "../img/banner.png";
import styles from "./HeroSection.module.css";

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
        <button className={styles.button}>Find Out More!</button>
      </div>
      <div className={styles["image-container"]}>
        <img className={styles.image} src={banner} />
      </div>
    </div>
    // <div
    //   id="carouselExampleFade"
    //   className="carousel slide carousel-fade"
    //   data-bs-ride="carousel"
    // >
    //   <div className="carousel-inner">
    //     <div className="carousel-item active">
    //       <img
    //         src="https://images.unsplash.com/photo-1644982649363-fae51da44eac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //         className="d-block w-100"
    //       />
    //     </div>
    //     <div className="carousel-item">
    //       <img
    //         src="https://images.unsplash.com/photo-1650651929908-2b26c9289b80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //         className="d-block w-100"
    //       />
    //     </div>
    //     <div className="carousel-item">
    //       <img
    //         src="https://images.unsplash.com/photo-1650547236597-9a37d5093f22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
    //         className="d-block w-100"
    //       />
    //     </div>
    //   </div>
    //   <button
    //     className="carousel-control-prev"
    //     type="button"
    //     data-bs-target="#carouselExampleFade"
    //     data-bs-slide="prev"
    //   >
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    //   <button
    //     className="carousel-control-next"
    //     type="button"
    //     data-bs-target="#carouselExampleFade"
    //     data-bs-slide="next"
    //   >
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // </div>
  );
}

export default HeroSection;
