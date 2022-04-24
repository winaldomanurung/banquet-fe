import React from "react";
import banner from "../img/banner.png";
import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.blob}>
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 310 350"
        >
          <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
        </svg>
      </div> */}
      <div className={styles["text-container"]}>
        <p className={styles.text}>
          Best Culinary Destinations Around Indonesia
        </p>
        <h1 className={styles.text}>
          Find the Place to Enjoy and Live a New Experience of Eating
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
