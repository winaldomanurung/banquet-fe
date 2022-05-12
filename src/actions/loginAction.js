// fungsi action untuk mengarahkan data dari component ke reducer
export const authLogin = (data) => {
  // console.log("Data masuk Action dari component :", data);
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

// export const editUser = (data) => {
//   console.log("Data masuk Action dari component :", data);
//   return {
//     type: "EDIT_SUCCESS",
//     payload: data,
//   };
// };
