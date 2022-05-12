export const INITIAL_STATE = {
  name: "",
  location: "",
  type: "",
  price: "",
  description: "",
};

export const restaurantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DATA_FETCH":
      // console.log("Data masuk Reducer dari resturantAction :", action);
      // return data yang didapat dari action
      // console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
