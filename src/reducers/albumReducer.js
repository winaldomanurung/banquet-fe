const INITIAL_STATE = {
  dataAlbum: [],
};

export const albumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALBUM":
      console.log("INI DARI ALBUM REDUCER", {
        ...state,
        dataAlbum: action.payload,
      });
      return { ...state, dataAlbum: action.payload };
    default:
      return state;
  }
};
