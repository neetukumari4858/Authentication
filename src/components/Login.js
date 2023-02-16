import { useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { UseAddSignupData, FormReducers } from "./../hooks/index";
import { Button, Form, Input, Space } from "antd";

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

  const handleTextChange = (e) => {
    dispatch({
      type: "LOGIN_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const onFinish = () => {
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Space direction="vertical" size={12} className="login_container">
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
        <h1>Login</h1>

        <Form.Item
          label="Username"
          value={userName}
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
          value={email}
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
            onChange={(e) => handleTextChange(e)}
            placeholder="Enter Password"
          />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="button">
            <Link to="/signup">Sign up</Link>
          </Button>
        </Space>
      </Form>
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
    </Space>
  );
}

export default Login;
