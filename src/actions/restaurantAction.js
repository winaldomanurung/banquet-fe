// fungsi action untuk mengarahkan data dari component ke reducer
export const restaurantData = (data) => {
  // console.log("Data masuk Action dari component :", data);
  return {
    type: "DATA_FETCH",
    payload: data,
  };
};
