import axios from "axios";
import { useReducer } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { FormReducers } from "../../hooks/Reducer";

export const useAddUser = () => {
  const history = useHistory();
  const AddSignupData = (user:any) => {
    const userType = user?.userType;
    const response = axios.post("http://localhost:8000/user", user, {
      headers: { "content-type": "application/json" },
      data: JSON.stringify(user),
    });
    try {
      if (userType === "signup_user") {
        alert("Ragistered Successfully");
        history.push("/login");
      }
    } catch (error:any) {
      alert("Failed :" + error.message);
    }
    return response;
  };
  return useMutation(AddSignupData);
};

export const useSignup = () => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(FormReducers, initialState);
  const { id, name, email, password } = state;

  const { mutate: addUser } = useAddUser();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SIGNUP_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const onFinish = () => {
    const userType = "signup_user";
    const signupObj = { id, name, password, email, userType };
    addUser(signupObj);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return {handleTextChange,onFinish,onFinishFailed,id, name, email, password }
};


