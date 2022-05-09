import React from "react";

import styles from "./RestaurantCard.module.css";
import { Link } from "react-router-dom";

import { FaRegComments } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const RestaurantCard = (props) => {
  // console.log(props);
  return (
    <div className={styles.card}>
      <Link
        to={`/${props.userId}/restaurants/${props.id}`}
        className={styles.link}
      >
        <img src={props.image} alt="" className={styles["card-image"]} />
        <div className={styles["card-body"]}>
          <div className={styles["card-creator"]}>
            <img
              className={styles["creator-image"]}
              src={props.userImage}
              alt=""
            />
            <div className={styles["creator-text"]}>
              <div className={styles["creator-name"]}>{props.username}</div>
              <div className={styles["creator-date"]}>{props.createdDate}</div>
            </div>
          </div>
          <hr />
          <h5 className={styles["card-title"]}>{props.name}</h5>
          <p className={styles["card-text"]}>{props.description}</p>
          <div className={styles.reaction}>
            <div className={styles.like}>
              <AiOutlineLike
                className={styles["button-like"]}
                size={"1.2em"}
                color="#2175f3"
              />
              <div className={styles.counter}>{props.likes}</div>
            </div>
            <div className={styles.dislike}>
              <AiOutlineDislike
                className={styles["button-dislike"]}
                size={"1.2em"}
                color="#2175f3"
              />
              <div className={styles.counter}>{props.dislikes}</div>
            </div>
            <div className={styles.comment}>
              <FaRegComments
                size={"1.2em"}
                color="#2175f3"
                className={styles["button-dislike"]}
              />
              <div className={styles.counter}>{props.reviews}</div>
            </div>
          </div>
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
