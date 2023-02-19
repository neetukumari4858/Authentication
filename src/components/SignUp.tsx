import React from "react";
import { useReducer } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { UseAddSignupData, FormReducers } from "./../hooks/index";

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
  return (
    <div className="signup_container">
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>Sign up</h1>

        <Form.Item
          label="Username"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            value={id}
            name="id"
            placeholder="Enter your Username"
            onChange={(e) => handleTextChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <Input
            value={name}
            name="name"
            placeholder="Enter your Fullname"
            onChange={(e) => handleTextChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            value={email}
            name="email"
            placeholder="Enter your E-mail"
            onChange={(e) => handleTextChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            value={password}
            name="password"
            placeholder="Enter your Password"
            onChange={(e) => handleTextChange(e)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="btn_signup">
          Sign up
        </Button>
      </Form>
      <div className="footer">
        <p>Already have Account ?</p>
        <Link to="/login" className="login_text">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
