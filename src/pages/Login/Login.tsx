import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { Form, Input } from "antd";
import useLogin from "./useLogin-Controller";
import { UseButton } from "../../Components/Button";

function Login() {
  const {
    onResolveHandler,
    handleTextChange,
    onFinishFailed,
    refetch,
    userName,
    email,
    password,
  } = useLogin();
  return (
    <div className="login_container">
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 17,
        }}
        onFinish={refetch}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>Login</h1>

        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please enter your username!",
            },
          ]}
        >
          <Input
            value={userName}
            name="userName"
            onChange={(e) => handleTextChange(e)}
            placeholder="Enter user name"
          />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input
            value={email}
            name="email"
            onChange={(e) => handleTextChange(e)}
            placeholder="Enter E-mail"
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
            onChange={(e) => handleTextChange(e)}
            placeholder="Enter Password"
          />
        </Form.Item>
        <div className="btn_container">
          <UseButton btn_Class="btn_login" text="Login" />
        </div>
      </Form>
      <h4>OR</h4>
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
        className="btn_LoginWithGoogle"
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
      <div className="footer">
        <p>Don't have Account ?</p>
        <Link to="/signup" className="signup_text">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
