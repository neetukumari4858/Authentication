import { useReducer } from "react";
import { Button, Form, Input, Space } from "antd";
import React from "react";
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

  const handleTextChange = (e) => {
    dispatch({
      type: "SIGNUP_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const onFinish = () => {
    const userType = "isSignedUser";
    const signupObj = { id, name, password, email, userType };
    addUser(signupObj);
  };
  const onFinishFailed = (errorInfo) => {
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
          value={id}
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
          value={name}
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
          value={email}
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
          value={password}
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
        <Space>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
          <Button type="button">
            <Link to="/login">Login</Link>
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default SignUp;
