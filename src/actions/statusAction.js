export const getError = (status, errorSubject = "", errorMessage = "") => {
  console.log("Operation error");
  return {
    type: "GET_ERROR",
    status,
    errorSubject,
    errorMessage,
  };
};

export const getSuccess = (
  status,
  successSubject = "",
  successMessage = ""
) => {
  console.log("Operation success");
  return {
    type: "GET_SUCCESS",
    status,
    successSubject,
    successMessage,
  };
};

export const getLoading = (status) => {
  console.log("Loading...");
  return {
    type: "GET_LOADING",
    status,
  };
};
