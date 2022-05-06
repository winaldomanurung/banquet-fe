import React, { useState } from "react";
import axios from "axios";
import styles from "./AddRestaurant.module.css";
import { Link } from "react-router-dom";
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

function AddRestaurant(props) {
  const [addFile, setAddFile] = useState(null);
  const [typeIsClicked, setTypeIsClicked] = useState(null);
  const [inputFileIsClicked, setInputFileIsClicked] = useState(null);
  const [typeIsFocused, setTypeIsFocused] = useState(null);

  const nameValidation = (name) => name.trim() !== "" && name.length >= 3;
  const locationValidation = (location) =>
    location.trim() !== "" && location.length >= 3;
  const typeValidation = (type) => type;
  const priceValidation = (price) => price;
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
  } = useInput(nameValidation);

  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
    isTouched: isLocationTouched,
  } = useInput(locationValidation);

  const {
    value: enteredType,
    valueChangeHandler: typeChangeHandler,
    reset: resetTypeInput,
  } = useInput(typeValidation);

  console.log(enteredType);

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
    isTouched: isPriceTouched,
  } = useInput(priceValidation);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
    isTouched: isDescriptionTouched,
  } = useInput(descriptionValidation);

  const onBtnAddFile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imgpreview");

      function createImageItem(i) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(e.target.files[i]);
        image.classList.add("img-preview");
        return image;
      }

      for (var j = 0; j < e.target.files.length; j++) {
        preview.appendChild(createImageItem(j));
      }
    }
  };

  // Pengecekan form validity
  let formIsValid = false;

  // Custom error
  let enteredTypeIsValid;
  let typeInputHasError;
  if (typeIsClicked == true && typeIsFocused == false && enteredType == "") {
    enteredTypeIsValid = false;
    typeInputHasError = true;
  }

  let enteredFileIsValid;
  let fileInputHasError;
  if (inputFileIsClicked == true && !addFile) {
    enteredFileIsValid = false;
    fileInputHasError = true;
  }

  if (
    enteredNameIsValid &&
    enteredLocationIsValid &&
    enteredTypeIsValid &&
    enteredPriceIsValid &&
    enteredDescriptionIsValid &&
    enteredFileIsValid
  ) {
    formIsValid = true;
  }

  // Handler untuk form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    }
    props.getLoading(true);

    axios
      .post(URL_API + "/restaurants", {
        name: enteredName,
        location: enteredLocation,
        type: enteredType,
        price: enteredPrice,
        description: enteredDescription,
      })
      .then((res) => {
        console.log(res.data);
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
  const typeInputClasses = typeInputHasError ? styles.invalid : "";
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
  } else if (typeInputHasError) {
    errorMessage = " Please provide a restaurant type!";
  } else if (priceInputHasError && isPriceTouched) {
    errorMessage = " Please provide approximate price per person!";
  } else if (descriptionInputHasError && isDescriptionTouched) {
    errorMessage = " Please provide the description of the restaurant!";
  } else if (fileInputHasError) {
    errorMessage = " Please provide atleast one image!";
  } else {
    errorMessage = "";
  }

  return (
    <div className={styles.container}>
      {props.isLoading ? <Spinner /> : ""}
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
        <h1 className={styles.title}>Add a New Restaurant</h1>
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
            value={enteredName}
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
            value={enteredLocation}
          />
          <label for="type">Type</label>
          <select
            id="type"
            className={`${styles.input} ${typeInputClasses}`}
            onChange={typeChangeHandler}
            onClick={() => setTypeIsClicked(true)}
            onFocus={() => setTypeIsFocused(true)}
            onBlur={() => setTypeIsFocused(false)}
            value={enteredType}
          >
            <option value="" disabled selected hidden>
              Restaurant type...
            </option>
            <option value="fine-dining">Fine Dining</option>
            <option value="family-restaurant">Family Restaurant</option>
            <option value="traditional-food">Traditional Food</option>
            <option value="fast-food">Fast Food</option>
            <option value="cafe">Cafe</option>
            <option value="buffet">Buffet</option>
            <option value="food-trucks-stands">Food Trucks/Stands</option>
            <option value="online-only">Online only</option>
          </select>

          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price range for one person..."
            className={`${styles.input} ${priceInputClasses}`}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
            value={enteredPrice}
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
            value={enteredDescription}
          />
          <div>
            <label htmlFor="img">Image(s)</label>
            <input
              className={styles.change}
              type="file"
              id="img"
              onChange={onBtnAddFile}
              multiple="multiple"
              onClick={() => setInputFileIsClicked(true)}
            />
          </div>

          <div id="imgpreview" className={styles["img-container"]}></div>
          <button
            type="submit"
            className={
              formIsValid ? styles.register : styles["register-disabled"]
            }
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
