import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../helpers";
import styles from "./RestaurantDetail.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import {
  FaRegMoneyBillAlt,
  FaMapMarkerAlt,
  FaComments,
  FaRegComments,
} from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { GoDash } from "react-icons/go";
import { RiErrorWarningFill } from "react-icons/ri";
import { Carousel } from "react-bootstrap";
import Map, { Marker } from "react-map-gl";
import useInput from "../hooks/useInput";
import { connect } from "react-redux";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import Spinner from "../components/Spinner";
import AuthContext from "../store/auth-context";
import { authLogin } from "../actions";

function RestaurantDetail(props) {
  const params = useParams();
  console.log(params);
  const restaurantId = params.restaurantId;
  const userId = params.userId;
  const [onDelete, setOnDelete] = useState(false);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const goToRestaurants = () => {
    if (redirect) {
      console.log("Redirect");
      return navigate("/restaurants", { replace: true });
    }
  };

  goToRestaurants();

  const [restaurant, setRestaurant] = useState("");
  const [images, setImages] = useState([]);
  const [user, setUser] = useState("");
  const [lat, setLat] = useState(3);
  const [long, setLong] = useState(120);
  const [reviews, setReviews] = useState([]);

  // Ambil data restaurant
  useEffect(() => {
    axios
      .get(URL_API + `/restaurants/${restaurantId}`)
      .then((res) => {
        console.log(res.data);
        setRestaurant(res.data.dataUser);
        setLong(res.data.dataUser.coordinate.y);
        setLat(res.data.dataUser.coordinate.x);
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL_API + `/users/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  }, []);

  console.log(props.userId);

  // Ambil data user yang login
  axios
    .get(URL_API + "/users/retrieve-data", {
      headers: {
        "Auth-Token": authCtx.token,
      },
    })
    .then((res) => {
      console.log(res.data);
      props.authLogin(res.data.dataUser);
    })
    .catch((err) => {
      console.log(err);
      props.getLoading(false);
      props.getError(
        true,
        err.response.data.subject,
        err.response.data.message
      );
    });

  useEffect(() => {
    axios
      .get(URL_API + `/restaurants/${restaurantId}/images`)
      .then((res) => {
        console.log(res.data);
        setImages(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  }, []);

  // Fetch comments
  useEffect(() => {
    axios
      .get(URL_API + `/reactions/${restaurantId}/get-reviews`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  }, [props.isLoading]);

  console.log(restaurant);
  console.log(images);
  console.log(reviews);

  const mapImages = () => {
    return images.map((image, index) => {
      return (
        <Carousel.Item>
          <img
            // className="d-block w-100"
            src={URL_API + image.imageUrl}
            alt={`Resaturant image ${[index]}`}
            key={index}
            className={styles["restaurant-image"]}
          />
        </Carousel.Item>
      );
    });
  };

  const mapComments = () => {
    return reviews.map((review, index) => {
      return (
        <div className={styles.review}>
          <div className={styles["review-user"]}>
            <img
              className={styles["user-image"]}
              src={URL_API + review.imageUrl}
            />
            <div className={styles["user-name"]}>{review.username}</div>
          </div>
          <div className={styles["review-content"]}>
            <div className={styles["content-title"]}>{review.reviewTitle}</div>

            <div className={styles["content-text"]}>
              {review.reviewDescription}
            </div>
          </div>
          <div className={styles["content-reaction"]}>
            {
              // if(review.likes == 1){
              //   return <AiFillLike size={"2em"} color="#069A8E" />
              // } else {

              // }
              (review.likes && <AiFillLike size={"2em"} color="#069A8E" />) ||
                (review.dislikes && (
                  <AiFillDislike size={"2em"} color="#f47174" />
                )) ||
                (!review.dislikes && !review.likes && (
                  <GoDash size={"2em"} color="#808080" />
                ))
            }
          </div>
        </div>
      );
    });
  };

  const titleValidation = (name) => name.trim() !== "" && name.length >= 3;
  const descriptionValidation = (description) =>
    description.trim() !== "" && description.length >= 3;

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
    isTouched: isTitleTouched,
  } = useInput(titleValidation);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
    isTouched: isDescriptionTouched,
  } = useInput(descriptionValidation);

  let formIsValid = false;

  if (enteredTitleIsValid && enteredDescriptionIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log(formIsValid);

    if (!formIsValid) {
      return;
    }
    props.getLoading(true);

    //buat requestnya
    axios
      .post(URL_API + "/reactions/add-review", {
        restaurantId: restaurantId,
        userId: userId,
        reviewTitle: enteredTitle,
        reviewDescription: enteredDescription,
      })
      .then((res) => {
        console.log("Masok");
        // console.log(res.data);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
        resetTitleInput();
        resetDescriptionInput();
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    setOnDelete(false);
    props.getLoading(true);

    axios
      .delete(URL_API + `/restaurants/${restaurantId}`)
      .then((res) => {
        console.log("Masok");
        // console.log(res.data);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
        resetTitleInput();
        resetDescriptionInput();
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  };

  const titleInputClasses = titleInputHasError ? styles.invalid : "";
  const descriptionInputClasses = descriptionInputHasError
    ? styles.invalid
    : "";

  // Pembuatan message untuk error case
  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (titleInputHasError && isTitleTouched) {
    errorMessage = " Please provide review title with atleast 3 characters!";
  } else if (descriptionInputHasError && isDescriptionTouched) {
    errorMessage =
      " Please provide your review description with atleast 3 characters!";
  } else {
    errorMessage = "";
  }

  console.log(formIsValid);
  console.log(
    enteredTitleIsValid,

    enteredDescriptionIsValid
  );

  return (
    <div className={styles.container}>
      {props.isLoading ? <Spinner /> : ""}
      {onDelete ? (
        <ErrorModal
          title="Confirmation"
          message="Are you sure to delete this restaurant?"
          onConfirm={deleteHandler}
        />
      ) : (
        ""
      )}
      {props.isError ? (
        <ErrorModal
          title={props.errorSubject}
          message={props.errorMessage}
          onConfirm={() => props.getError(false)}
        />
      ) : (
        ""
      )}

      {props.isSuccess ? (
        <SuccessModal
          title={props.successSubject}
          message={props.successMessage}
          onConfirm={() => {
            props.getSuccess(false);
            setRedirect(true);
          }}
        />
      ) : (
        ""
      )}
      <div className={styles["data-render"]}>
        <div className={styles.title}>{restaurant.name}</div>
        <div className="content-container">
          <div className={styles["restaurant-container"]}>
            <div className={styles["restaurant-media"]}>
              <Carousel
                controls={images > 1 ? true : false}
                indicators={images > 1 ? true : false}
              >
                {mapImages()}
              </Carousel>
              <div className={styles.creator}>
                <img
                  className={styles["creator-image"]}
                  src={URL_API + user.imageUrl}
                  alt=""
                />
                <div className={styles["creator-text"]}>
                  <div className={styles["creator-name"]}>{user.username}</div>
                  <div className={styles["creator-date"]}>
                    {restaurant.createdDate}
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.reaction}>
                <div className={styles.like}>
                  {true ? (
                    <AiFillLike size={"2em"} color="#069A8E" />
                  ) : (
                    <AiOutlineLike
                      className={styles["button-like"]}
                      size={"2em"}
                      color="#069A8E"
                    />
                  )}

                  <div className={styles.counter}>23</div>
                </div>
                <div className={styles.dislike}>
                  <AiOutlineDislike
                    className={styles["button-dislike"]}
                    size={"2em"}
                    color="#f47174"
                    onMouseOver={({ target }) => {
                      target.style.color = "#c55354";
                    }}
                    onMouseOut={({ target }) => {
                      target.style.color = "#f47174";
                    }}
                  />
                  <div className={styles.counter}>56</div>
                </div>
                <div className={styles.comment}>
                  <FaRegComments
                    size={"2em"}
                    className={styles["button-dislike"]}
                    color="#2175f3"
                    onMouseOver={({ target }) => {
                      target.style.color = "#1e66d3";
                    }}
                    onMouseOut={({ target }) => {
                      target.style.color = "#2175f3";
                    }}
                  />
                  <div className={styles.counter}>12</div>
                </div>
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
                  {restaurant.description}
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
                  {restaurant.location}
                </div>
              </div>
            </div>
          </div>

          <div className={styles["location-map"]}>
            <Map
              initialViewState={{
                longitude: long,
                latitude: lat,
                zoom: 2.8,
              }}
              // style={{ width: "500px", height: "500px" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken="pk.eyJ1Ijoid2luYWxkb21hbnVydW5nIiwiYSI6ImNrb2h5Ymo5MDA1eWQydnFlZzh6bTJjaTYifQ.58ZziMs2G-MCmfCQUkLOTg"
            >
              <Marker longitude={long} latitude={lat} anchor="bottom">
                <FaMapMarkerAlt size={"3em"} color="#2175f3" />
              </Marker>
            </Map>
          </div>
        </div>
        {user.userId == props.userId ? (
          <div className={styles.operation}>
            <Link to={`/${userId}/restaurants/${restaurantId}/edit`}>
              <button className={styles.edit}>Edit</button>
            </Link>

            <button className={styles.delete} onClick={() => setOnDelete(true)}>
              Delete
            </button>
          </div>
        ) : (
          ""
        )}

        <hr />
        <div className={styles.title2}>Add Review</div>

        <form className={styles.form} onSubmit={formSubmissionHandler}>
          <p className={errorMessage ? styles.error : styles.errorHide}>
            {errorMessage == "" ? "" : errorLogo}
            {errorMessage}
          </p>
          <label for="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Review title..."
            className={`${styles.input} ${titleInputClasses}`}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            value={enteredTitle}
          />

          <label for="description">Description</label>
          <textarea
            id="textarea"
            name="textarea"
            rows="4"
            cols="50"
            placeholder="Review description..."
            className={`${styles.input} ${descriptionInputClasses}`}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            value={enteredDescription}
          />

          <button
            type="submit"
            className={formIsValid ? styles.submit : styles["submit-disabled"]}
            disabled={!formIsValid}
          >
            Submit Review{" "}
          </button>
        </form>
        {reviews.length ? <hr /> : ""}
        {reviews.length ? (
          <div className={styles["review-container"]}>
            <div className={styles.title}>Reviews</div>
            {mapComments()}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    fullname: state.authReducer.fullname,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
    bio: state.authReducer.bio,
    imageUrl: state.authReducer.imageUrl,
    isError: state.statusReducer.isError,
    isSuccess: state.statusReducer.isSuccess,
    isLoading: state.statusReducer.isLoading,
    errorSubject: state.statusReducer.errorSubject,
    successSubject: state.statusReducer.successSubject,
    errorMessage: state.statusReducer.errorMessage,
    successMessage: state.statusReducer.successMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataLogin) => dispatch(authLogin(dataLogin)),
    getError: (status, errorSubject, errorMessage) =>
      dispatch(getError(status, errorSubject, errorMessage)),
    getSuccess: (status, successSubject, successMessage) =>
      dispatch(getSuccess(status, successSubject, successMessage)),
    getLoading: (status) => dispatch(getLoading(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail);
