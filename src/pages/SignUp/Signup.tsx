import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { UseButton } from "../../Components/Button/index";
import { useSignup } from "./useSignup-Controller";

const SignUp = () => {
  const {
    handleTextChange,
    onFinish,
    onFinishFailed,
    id,
    name,
    email,
    password,
  } = useSignup();

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
        <UseButton btn_Class="btn_signup" text="Sign up" />
      </Form>
      <div className="footer">
        <p>Already have Account ?</p>
        <Link to="/login" className="login_text">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
