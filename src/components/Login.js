import { useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { UseAddSignupData, FormReducers } from "./../hooks/index";
import { Card } from "antd";

function Login() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(FormReducers, initialState);
  const { userName, email, password } = state;

  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const { mutate: addUser } = UseAddSignupData();
  const onResolveHandler = ({ data }) => {
    let { name, email, id } = data;
    id = name;
    const username = name;

    fetch("http://localhost:8000/user/" + username)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (Object.keys(res).length === 0) {
          const user = { name, id, email };
          addUser(user);
        }
        history.push("/");
        localStorage.setItem("username", id);
      });
  };
  const ProceedLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/user/" + userName)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (Object.keys(res).length === 0) {
          alert("Please Enter the valid username");
        } else {
          if (password === res.password) {
            alert("you are Logged in successfuly");
            localStorage.setItem("username", userName);
            console.log(localStorage, "local");

            history.push("/");
          } else {
            alert("Please Enter the valid credentials");
          }
        }
      })
      .catch((error) => {
        console.log(`Login Failed due to ${error.message}`);
      });
  };
  const handleTextChange = (e) => {
    dispatch({
      type: "LOGIN_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  return (
    <div className="signup_container">
      <Card
        hoverable
        style={{
          width: 300,
        }}
      >
        <h1>Login</h1>
        <form onSubmit={ProceedLogin}>
          <div>
            <label>User Name</label>
            <input
              value={userName}
              name="userName"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter user name"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              value={email}
              name="email"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              value={password}
              name="password"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter password"
            />
          </div>
          <div className="button_container">
            <button type="submit">Login</button>
            <button>
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </form>
        <LoginSocialGoogle
          client_id={
            "591350337896-1l1gjhd6heqnm7d36181ihnq25uls2m4.apps.googleusercontent.com"
          }
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={onResolveHandler}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
      </Card>
    </div>
  );
}

export default Login;

