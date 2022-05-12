import React, { useRef, useCallback, useState, useContext } from "react";
import styles from "./MyRestaurants.module.css";

import axios from "axios";
import { URL_API } from "../helpers";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";

import usePagination from "../hooks/usePagination";
import RestaurantCard from "../components/RestaurantCard";
import Spinner from "../components/Spinner";
import AuthContext from "../store/auth-context";

function MyRestaurants() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const params = useParams();
  const userId = params.userId;
  const [pageNumber, setPageNumber] = useState(1);
  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const goToLogin = () => {
    if (redirect) {
      // console.log("Redirect");
      return navigate("/login", { replace: true });
    }
  };

  const { dataRestaurants, hasMore, loading, error } = usePagination(
    pageNumber,
    `/restaurants/${userId}/my-restaurants`
  );

  const observer = useRef();
  const lastDataElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log("visible");
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  goToLogin();

  return (
    <div className={styles.container}>
      {loading ? <Spinner /> : ""}
      {error || !isLoggedIn ? (
        <ErrorModal
          title="User ID is not registered"
          message="Please login with your credential and password"
          onConfirm={() => setRedirect(true)}
        />
      ) : (
        ""
      )}
      <div className={styles["data-render"]}>
        <div className={styles.title}>My Restaurants</div>
        <div className={styles["cards-container"]}>
          {dataRestaurants.length == 0 || !isLoggedIn ? (
            <div>You don't have any restaurants</div>
          ) : (
            dataRestaurants.map((restaurant, index) => {
              if (dataRestaurants.length === index + 1) {
                return (
                  <div ref={lastDataElementRef}>
                    <RestaurantCard
                      name={restaurant.name}
                      image={URL_API + restaurant.restaurantImageUrl}
                      description={restaurant.description}
                      key={restaurant.restaurantId}
                      id={restaurant.restaurantId}
                      createdDate={restaurant.createdDate}
                      username={restaurant.username}
                      userId={restaurant.userId}
                      userImage={URL_API + restaurant.userImageUrl}
                      likes={restaurant.totalLikes}
                      dislikes={restaurant.totalDislikes}
                      reviews={restaurant.totalReviews}
                    />
                  </div>
                );
              } else {
                return (
                  <div>
                    <RestaurantCard
                      name={restaurant.name}
                      image={URL_API + restaurant.restaurantImageUrl}
                      description={restaurant.description}
                      key={restaurant.restaurantId}
                      id={restaurant.restaurantId}
                      createdDate={restaurant.createdDate}
                      username={restaurant.username}
                      userId={restaurant.userId}
                      userImage={URL_API + restaurant.userImageUrl}
                      likes={restaurant.totalLikes}
                      dislikes={restaurant.totalDislikes}
                      reviews={restaurant.totalReviews}
                    />
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MyRestaurants;
