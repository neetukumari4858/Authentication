import axios from "axios";
import { useReducer } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { FormReducers } from "../../hooks/Reducer";
import { useAddUser } from "../SignUp/useSignup-Controller";

const useLogin = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(FormReducers, initialState);
  const { userName,email, password } = state;

  const history = useHistory();
  console.log(history);

  const { mutate: addUser } = useAddUser();
  const onResolveHandler = ({ data }: any) => {
    let { name, email, id } = data;
    id = name;
    const userType = "google_login";
    const username = name;

    fetch("http://localhost:8000/user/" + username)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (Object.keys(res).length === 0) {
          const user = { name, id, email, userType };
          addUser(user);
        }
        history.push("/");
        localStorage.setItem("username", id);
      });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "LOGIN_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const onSuccess = (data: any) => {
    const response = data.data;

    if (Object.keys(response).length === 0) {
      alert("Please Enter the valid username name");
    } else {
      if (password === response.password) {
        console.log("success");
        alert("you are Loggeg in successfuly");
        if (userName) {
          localStorage.setItem("username", userName);
        }
        history.push("/");
      } else {
        alert("Please Enter the valid credentials");
      }
    }
  };
  const onError = (error: any) => {
    alert("Please Enter the valid username");
    console.log(`Login Failed due to ${error.message}`);
  };

  const fetchLoginData = () => {
    return axios.get("http://localhost:8000/user/" + userName);
  };
  const { refetch } = useQuery("login-user", fetchLoginData, {
    enabled: false,
    onSuccess,
    onError,
  });

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return { onResolveHandler, handleTextChange, onFinishFailed, refetch, userName, email, password };
};

export default useLogin;
