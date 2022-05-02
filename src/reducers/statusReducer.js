const INITIAL_STATE = {
  isError: false,
  errorSubject: "",
  errorMessage: "",
  isSuccess: false,
  successSubject: "",
  successMessage: "",
  isLoading: false,
};

export const statusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ERROR":
      return {
        ...state,
        isError: action.status,
        errorSubject: action.errorSubject,
        errorMessage: action.errorMessage,
      };
    case "GET_SUCCESS":
      return {
        ...state,
        isSuccess: action.status,
        successSubject: action.successSubject,
        successMessage: action.successMessage,
      };
    case "GET_LOADING":
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};
