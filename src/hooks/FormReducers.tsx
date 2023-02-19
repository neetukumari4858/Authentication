
type FormStateType = {
  id?: string;
  name?: string;
  email: string;
  password: string;
  userName?: string;
  userType?: string;
};

type FormActionType = { type: string; field: string; payload: string };

const FormReducers = (state: FormStateType, action: FormActionType) => {
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
