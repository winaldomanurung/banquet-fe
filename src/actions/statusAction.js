export const getError = (status) => {
  console.log("Operation error");
  return {
    type: "GET_ERROR",
    status,
  };
};

export const getSuccess = (status) => {
  console.log("Operation success");
  return {
    type: "GET_SUCCESS",
    status,
  };
};

export const getLoading = (status) => {
  console.log("Loading...");
  return {
    type: "GET_LOADING",
    status,
  };
};
