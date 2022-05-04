import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
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
  const regex = new RegExp(/[^0-9]/, "g");
  const nameValidation = (name) => name.trim() !== "" && name.length >= 3;
  const typeValidation = (type) => type.trim() !== "" && type.length >= 3;
  const priceValidation = (price) => !price.match(regex);
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
    value: enteredType,
    isValid: enteredTypeIsValid,
    hasError: typeInputHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetTypeInput,
    isTouched: isTypeTouched,
  } = useInput(typeValidation);

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

  // Pengecekan form validity
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredTypeIsValid &&
    enteredPriceIsValid &&
    enteredDescriptionIsValid
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
        type: enteredType,
        price: enteredPrice,
        description: enteredDescription,
      })
      .then((res) => {
        console.log(res.data);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
        resetNameInput();
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
  } else if (typeInputHasError && isTypeTouched) {
    errorMessage = " Please provide a valid type!";
  } else if (priceInputHasError && isPriceTouched) {
    errorMessage = "Price is a number!";
  } else if (descriptionInputHasError && isDescriptionTouched) {
    errorMessage = " The price confirmation doesn't match!";
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
      <div className={styles["login-form"]}>
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
          <label for="type">Type</label>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Restaurant type..."
            className={`${styles.input} ${typeInputClasses}`}
            onChange={typeChangeHandler}
            onBlur={typeBlurHandler}
            value={enteredType}
          />
          <label for="price">Price</label>
          <input
            type="text"
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
