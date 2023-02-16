const FormReducers = (state, action) => {
  switch (action.type) {
    case "SIGNUP_INPUT_TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "LOGIN_INPUT_TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };

    default:
      return state;
  }
};

export default FormReducers;
