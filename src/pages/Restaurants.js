import React, { useEffect, useState } from "react";
import styles from "./Restaurants.module.css";

import axios from "axios";
import { URL_API } from "../helpers";
import { Link } from "react-router-dom";

import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const [restaurants, setRestaurants] = useState("");

  useEffect(() => {
    axios
      .get(URL_API + "/restaurants")
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(restaurants);

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
          image={URL_API + restaurant.restaurantImageUrl}
          description={restaurant.description}
          key={restaurant.restaurantId}
          id={restaurant.restaurantId}
        />
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles["data-render"]}>
        <div className={styles.title}>All Restaurants</div>
        <div className={styles["cards-container"]}>
          {generateRestaurantsCard()}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
