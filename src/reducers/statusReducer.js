const INITIAL_STATE = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const statusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ERROR":
      return { ...state, isError: action.status };
    case "GET_SUCCESS":
      return { ...state, isSuccess: action.status };
    case "GET_LOADING":
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};
