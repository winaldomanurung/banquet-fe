import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../helpers";
import styles from "./RestaurantDetail.module.css";
import { Link } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

function RestaurantDetail() {
  const params = useParams();
  console.log(params);
  const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    axios
      .get(URL_API + `/restaurants/${params.restaurantId}`)
      .then((res) => {
        console.log(res.data);
        setRestaurant(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(restaurant);

  return (
    <div className={styles.container}>
      <div className={styles["data-render"]}>
        <div className={styles.title}>{restaurant.name}</div>
        <div className="content-container">
          <div className={styles["restaurant-container"]}>
            <div className={styles["restaurant-media"]}>
              <img
                src="https://source.unsplash.com/random/500x500/?restaurant"
                alt=""
                className={styles["restaurant-image"]}
              />
              <div className={styles.creator}>
                <div className={styles["creator-title"]}>Created by</div>
                <div className={styles["creator-content"]}>Aldo</div>
              </div>
            </div>
            <div className={styles["restaurant-text"]}>
              <div className={styles.description}>
                <div className={styles["description-title"]}>
                  <div className={styles.logo}>
                    <MdOutlineDescription size={"1.5em"} color="white" />
                  </div>
                  Description
                </div>
                <div className={styles["description-content"]}>
                  {restaurant.description} Suasananya enak, kecil tapi adem
                  banget. Nyobain bingsoo disini juga enak dan worth it sama
                  harganya. Menu-menu lainnya juga ngga bikin kantong bolong.
                  Cocok buat mahasiswa yang pengen jajan jajan aja. Satu porsi
                  bingsoo diisi kacang merah, es krim, lychee, koko crunch,
                  jelly, poping boba dan mochi
                </div>
              </div>
              <div className={styles.price}>
                <div className={styles["price-title"]}>
                  <div className={styles.logo}>
                    <FaRegMoneyBillAlt size={"1.5em"} color="white" />
                  </div>
                  Average Cost
                </div>
                <div className={styles["price-content"]}>
                  Rp {restaurant.price} for a person (approx.)
                </div>
              </div>
              <div className={styles.location}>
                <div className={styles["location-title"]}>
                  <div className={styles.logo}>
                    <GoLocation size={"1.5em"} color="white" />{" "}
                  </div>
                  Location
                </div>
                <div className={styles["location-address"]}>
                  {restaurant.location} Balubur Town Square, Lantai 3, Food
                  Court, Jl. Taman Sari, Bandung Wetan, Bandung
                </div>
              </div>
            </div>
          </div>

          <div className={styles["location-map"]}>
            <img
              className={styles["location-map"]}
              src="https://www.researchgate.net/profile/Muhammad-Farda/publication/335429107/figure/fig1/AS:796503257911300@1566912583809/Bandung-City-map-and-bus-terminal-location_Q640.jpg"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <div className={styles.operation}>
          <Link to={`/my-restaurants/`}>
            <button className={styles.edit}>Edit</button>
          </Link>

          <Link to={`/my-restaurants/`}>
            <button className={styles.delete}>Delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
