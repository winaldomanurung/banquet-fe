import React, { useEffect, useState } from "react";
import styles from "./MyRestaurants.module.css";

import axios from "axios";
import { URL_API } from "../helpers";
import { Link } from "react-router-dom";

import RestaurantCard from "../components/RestaurantCard";

function MyRestaurants() {
  const [restaurants, setRestaurants] = useState("");

  useEffect(() => {
    axios
      .get(URL_API + "/restaurants/get-my-restaurants")
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(restaurants);
  const generateRestaurantsCard = () => {
    let rawData = [...restaurants];

    // const dataPaginated = rawData.slice(
    //   beginningIndex,
    //   beginningIndex + itemPerPage
    // );

    return rawData.map((restaurant, index) => {
      return (
        <RestaurantCard
          name={restaurant.name}
          image={restaurant.image}
          description={restaurant.description}
          key={restaurant.restaurantId}
          id={restaurant.restaurantId}
        />
      );
    });
  };

  return (
    <div className={styles.container}>
      MyRestaurants
      <div className={styles["cards-container"]}>
        {generateRestaurantsCard()}
      </div>
    </div>
  );
}

export default MyRestaurants;
