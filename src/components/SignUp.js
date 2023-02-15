import { useReducer } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { UseAddSignupData, FormReducers } from "./../hooks/index";
import { Card } from "antd";

function SignUp() {
  const initialState = {
    id: "",
    name: "",
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(FormReducers, initialState);
  const { id, name, email, password } = state;

  const { mutate: addUser } = UseAddSignupData();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userType = "isSignedUser";

    const signupObj = { id, name, password, email, userType };
    addUser(signupObj);
  };

  const handleTextChange = (e) => {
    dispatch({
      type: "SIGNUP_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  return (
    <div className="signup_container">
      <Card
        hoverable
        className="card"
      >
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>User Name</label>
            <input
              required
              value={id}
              name="id"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter username"
            />
          </div>  
          <div>
            <label>Full Name</label>
            <input
              required
              value={name}
              name="name"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter fullName"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              required
              value={email}
              name="email"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              required
              value={password}
              name="password"
              onChange={(e) => handleTextChange(e)}
              placeholder="enter password"
            />
          </div>
          <div className="button_container">
            <button type="submit">Signup</button>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SignUp;
