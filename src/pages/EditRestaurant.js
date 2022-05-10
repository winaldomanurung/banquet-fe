import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styles from "./EditRestaurant.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { URL_API } from "../helpers";
import useInput from "../hooks/useInput";
import { connect } from "react-redux";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import Spinner from "../components/Spinner";
import { FormCheck } from "react-bootstrap";
import AuthContext from "../store/auth-context";

function AddRestaurant(props) {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const params = useParams();
  const userId = params.userId;
  const restaurantId = params.restaurantId;
  const [restaurant, setRestaurant] = useState("");

  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const goToLogin = () => {
    if (redirect) {
      console.log("Redirect");
      return navigate("/login", { replace: true });
    }
  };

  // Ambil data restaurant
  useEffect(() => {
    axios
      .get(URL_API + `/restaurants/${restaurantId}`)
      .then((res) => {
        console.log(res.data);
        setRestaurant(res.data.dataUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(restaurant.name);

  goToLogin();

  console.log(userId);
  const [addFile, setAddFile] = useState(null);
  const [typeIsClicked, setTypeIsClicked] = useState(null);
  const [inputFileIsClicked, setInputFileIsClicked] = useState(null);
  const [typeIsFocused, setTypeIsFocused] = useState(null);

  const nameValidation = (name) => name.trim() !== "" && name.length >= 3;
  const locationValidation = (location) =>
    location.trim() !== "" && location.length >= 3;
  const typeValidation = (type) => type;
  const priceValidation = (price) => true;
  const descriptionValidation = (description) =>
    description.trim() !== "" && description.length >= 3;

  // Handling field dengan custom hook useInput
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    isTouched: isNameTouched,
    initialValue: initialName,
  } = useInput(nameValidation, restaurant.name);

  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
    isTouched: isLocationTouched,
    initialValue: initialLocation,
  } = useInput(locationValidation, restaurant.location);

  const {
    value: enteredType,
    valueChangeHandler: typeChangeHandler,
    reset: resetTypeInput,
  } = useInput(typeValidation);

  console.log(enteredType, restaurant.type);

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
    isTouched: isPriceTouched,
    initialValue: initialPrice,
  } = useInput(priceValidation, restaurant.price);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
    isTouched: isDescriptionTouched,
    initialValue: initialDescription,
  } = useInput(descriptionValidation, restaurant.description);

  let preview = document.getElementById("imgpreview");
  const onBtnAddFile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    setAddFile(e.target.files);
    if (e.target.files[0]) {
      function createImageItem(i) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(e.target.files[i]);
        image.classList.add(`${styles["img-preview"]}`);
        return image;
      }

      preview.replaceChildren();
      for (var j = 0; j < e.target.files.length; j++) {
        preview.appendChild(createImageItem(j));
      }
    }
  };

  console.log(enteredName);
  console.log(enteredLocation);
  console.log(enteredType);
  console.log(enteredPrice);
  console.log(enteredDescription);
  console.log(enteredNameIsValid);
  console.log(enteredLocationIsValid);
  // console.log(enteredTypeIsValid);
  console.log(enteredPriceIsValid);
  console.log(enteredDescriptionIsValid);

  // Pengecekan form validity
  let formIsValid = false;

  // Custom error
  // let enteredTypeIsValid;
  // let typeInputHasError;
  // if (typeIsClicked == true && typeIsFocused == false && enteredType == "") {
  //   enteredTypeIsValid = false;
  //   typeInputHasError = true;
  // } else {
  //   enteredTypeIsValid = true;
  //   typeInputHasError = false;
  // }

  // let enteredFileIsValid;
  // let fileInputHasError;
  // if (inputFileIsClicked == true && !addFile) {
  //   enteredFileIsValid = false;
  //   fileInputHasError = true;
  // } else {
  //   enteredFileIsValid = true;
  //   fileInputHasError = false;
  // }

  if (
    enteredNameIsValid &&
    enteredLocationIsValid &&
    enteredPriceIsValid &&
    enteredDescriptionIsValid
  ) {
    formIsValid = true;
  }

  console.log(addFile);

  // Handler untuk form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log(formIsValid);
    setTypeIsClicked(false);
    setInputFileIsClicked(false);
    preview.replaceChildren();

    if (!formIsValid) {
      return;
    }
    props.getLoading(true);

    // Buat form data, agar bisa menampung file
    let formData = new FormData();

    // Buat body nya
    let obj = {
      userId: userId,
      name: enteredName ? enteredName : restaurant.name,
      location: enteredLocation ? enteredLocation : restaurant.location,
      type: enteredType ? enteredType : restaurant.type,
      price: enteredPrice ? enteredPrice : restaurant.price,
      description: enteredDescription
        ? enteredDescription
        : restaurant.description,
    };

    console.log(obj);
    // // Masukkan body nya
    // formData.append("data", JSON.stringify(obj));
    // // Masukkan file nya
    // for (let i = 0; i < addFile.length; i++) {
    //   let file = addFile.item(i);
    //   formData.append("file", file);
    // }

    // console.log(addFile);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    //buat requestnya
    axios
      .patch(URL_API + `/restaurants/${restaurantId}`, obj)
      .then((res) => {
        console.log("Masok");
        // console.log(res.data);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
        resetNameInput();
        resetLocationInput();
        resetTypeInput();
        resetPriceInput();
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

  // Pembuatan class untuk error case
  const nameInputClasses = nameInputHasError ? styles.invalid : "";
  const locationInputClasses = locationInputHasError ? styles.invalid : "";
  const priceInputClasses = priceInputHasError ? styles.invalid : "";
  const descriptionInputClasses = descriptionInputHasError
    ? styles.invalid
    : "";

  // Pembuatan message untuk error case
  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (nameInputHasError && isNameTouched) {
    errorMessage = " Please provide restaurant name with atleast 3 characters!";
  } else if (locationInputHasError && isLocationTouched) {
    errorMessage = " Please provide a valid location!";
  } else if (priceInputHasError && isPriceTouched) {
    errorMessage = " Please provide approximate price per person!";
  } else if (descriptionInputHasError && isDescriptionTouched) {
    errorMessage = " Please provide the description of the restaurant!";
  } else {
    errorMessage = "";
  }

  console.log(formIsValid);
  console.log(
    enteredNameIsValid,
    enteredLocationIsValid,
    enteredPriceIsValid,
    enteredDescriptionIsValid
  );

  return (
    <div className={styles.container}>
      {props.isLoading ? <Spinner /> : ""}
      {!isLoggedIn ? (
        <ErrorModal
          title="Please login!"
          message="You have to login to edit restaurant."
          onConfirm={() => setRedirect(true)}
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
          }}
        />
      ) : (
        ""
      )}
      <div className={styles["add-form"]}>
        <div className={styles.logo}>
          <IoRestaurantOutline size={"2.5em"} color="#2175f3" />
        </div>
        <h1 className={styles.title}>Edit Restaurant</h1>
        <form className={styles.form} onSubmit={formSubmissionHandler}>
          <p className={errorMessage ? styles.error : styles.errorHide}>
            {errorMessage == "" ? "" : errorLogo}
            {errorMessage}
          </p>
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Restaurant name..."
            className={`${styles.input} ${nameInputClasses}`}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName ? enteredName : initialName}
          />
          <label for="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Restaurant location..."
            className={`${styles.input} ${locationInputClasses}`}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            value={enteredLocation ? enteredLocation : initialLocation}
          />
          <label for="type">Type</label>
          <select
            id="type"
            className={styles.input}
            onChange={typeChangeHandler}
            onClick={() => setTypeIsClicked(true)}
            onFocus={() => setTypeIsFocused(true)}
            onBlur={() => setTypeIsFocused(false)}
            value={enteredType}
          >
            <option value="" disabled selected hidden>
              {restaurant.type}
            </option>
            <option value="Fine Dining">Fine Dining</option>
            <option value="Family Restaurant">Family Restaurant</option>
            <option value="Traditional Food">Traditional Food</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Cafe">Cafe</option>
            <option value="Buffet">Buffet</option>
            <option value="Food Trucks/Stands">Food Trucks/Stands</option>
            <option value="Online Only">Online Only</option>
          </select>

          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            min="0"
            step="1000"
            // max="1000"
            placeholder="Price range for one person..."
            className={`${styles.input} ${priceInputClasses}`}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
            value={enteredPrice ? enteredPrice : initialPrice}
          />
          <label for="description">Description</label>
          <textarea
            id="textarea"
            name="textarea"
            rows="4"
            cols="50"
            placeholder="Restaurant description..."
            className={`${styles.input} ${descriptionInputClasses}`}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            value={enteredDescription ? enteredDescription : initialDescription}
          />
          <div>
            <label htmlFor="img" onClick={() => setInputFileIsClicked(true)}>
              Image(s)
            </label>
            <label
              htmlFor="img"
              className={styles.change}
              onClick={() => setInputFileIsClicked(true)}
            >
              Browse...
            </label>
            <input
              className={styles.change}
              type="file"
              id="img"
              onChange={onBtnAddFile}
              multiple="multiple"
              style={{
                display: "none",
              }}
            />
          </div>

          <div id="imgpreview" className={styles["img-container"]}></div>
          <button
            type="submit"
            className={
              formIsValid ? styles.register : styles["register-disabled"]
            }
            disabled={!formIsValid}
          >
            Add Restaurant{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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
    getError: (status, errorSubject, errorMessage) =>
      dispatch(getError(status, errorSubject, errorMessage)),
    getSuccess: (status, successSubject, successMessage) =>
      dispatch(getSuccess(status, successSubject, successMessage)),
    getLoading: (status) => dispatch(getLoading(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);
