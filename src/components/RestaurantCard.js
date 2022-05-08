import React from "react";

import styles from "./RestaurantCard.module.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ ...props }) => {
  // console.log(props);
  return (
    <div className={styles.card}>
      <Link to={`/my-restaurants/${props.id}`} className={styles.link}>
        <img src={props.image} alt="" className={styles["card-image"]} />
        <div className={styles["card-body"]}>
          <h5 className={styles["card-title"]}>{props.name}</h5>
          <p className={styles["card-text"]}>{props.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;

// Reserve
{
  /* <div className={styles.card}>
<img src={props.image} alt="" className={styles["card-image"]} />
<div className={styles["card-body"]}>
  <h5 className={styles["card-title"]}>{props.name}</h5>
  <p className={styles["card-text"]}>{props.description}</p>
  <Link to={`/my-restaurants/${props.id}`} role="button">

    <button className={styles["card-button"]}>View</button>
  </Link>
</div>
</div> */
}
