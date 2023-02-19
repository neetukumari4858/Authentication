import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import { Button } from "antd";

function Home() {
  const userName = localStorage.getItem("username");
  const history = useHistory();

  useEffect(() => {
    if (userName === "" || userName === null) {
      history.push("/login");
    }
  }, [history, userName]);

  useEffect(() => {
    window.addEventListener("storage", function (event) {
      if (event.key === "logout-event") {
        history.push("/login");
      }
    });
  }, [history]);

  const logout = () => {
    window.localStorage.setItem("logout-event", "logout" + Math.random());
    localStorage.removeItem("username");
    history.push("/login");
  };

  return (
    <div className="home_container">
      <h1>Welcome to Home Page !</h1>
      <div className="btn_container">
        <Button>
          <Link to="/">Home</Link>
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Home;
