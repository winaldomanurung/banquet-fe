import React, { useState, useRef, useCallback, useContext } from "react";
import styles from "./Restaurants.module.css";
import { URL_API } from "../helpers";
import { Link } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import RestaurantCard from "../components/RestaurantCard";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";

function Restaurants(props) {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [pageNumber, setPageNumber] = useState(1);

  const { dataRestaurants, hasMore, loading, error, isVerified } =
    usePagination(pageNumber, "/restaurants", props.userId);

  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const goRedirect = () => {
    if (redirect && !isLoggedIn) {
      // console.log("Redirect");
      return navigate("/login", { replace: true });
    } else if (redirect && !isVerified) {
      // console.log("Redirect");
      return navigate("/profile/verification", { replace: true });
    }
  };

  goRedirect();

  const observer = useRef();
  const lastDataElementRef = useCallback(
    (node) => {
      // Kalau kita sedang loading maka kita gamau trigger infinite scroll, makanya di return
      if (loading) return;
      // Jika kita sudah ketemu last element, maka disconnect attribute last elementnya
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log("visible");
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      });
      // Jika kita ketemu last element maka pastikan observer to observe it
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className={styles.container}>
      {loading ? <Spinner /> : ""}

      {!isLoggedIn ? (
        <ErrorModal
          title="Please login!"
          message="You have to login to view restaurant."
          onConfirm={() => setRedirect(true)}
        />
      ) : !isVerified ? (
        <ErrorModal
          title="Please verify your account!"
          message="You have to verify your account to view restaurants."
          onConfirm={() => setRedirect(true)}
        />
      ) : (
        ""
      )}
      <div className={styles["data-render"]}>
        <div className={styles.title}>All Restaurants</div>
        <div className={styles["cards-container"]}>
          {dataRestaurants.length ? (
            dataRestaurants.map((restaurant, index) => {
              if (dataRestaurants.length === index + 1) {
                return (
                  <div ref={lastDataElementRef} key={restaurant.restaurantId}>
                    <RestaurantCard
                      name={restaurant.name}
                      image={URL_API + restaurant.restaurantImageUrl}
                      description={restaurant.description}
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
                  <div key={restaurant.restaurantId}>
                    <RestaurantCard
                      name={restaurant.name}
                      image={URL_API + restaurant.restaurantImageUrl}
                      description={restaurant.description}
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
          ) : (
            <p>There isn't any restaurant yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    email: state.authReducer.email,
  };
};

export default connect(mapStateToProps)(Restaurants);
