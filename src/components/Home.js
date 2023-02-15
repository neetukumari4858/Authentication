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
  });

  return (
    <div className="button_container">
      <Button>
        <Link to="/">Home</Link>
      </Button>
      <Button>
        <Link to="/login">Logout</Link>
      </Button>
    </div>
  );
}

export default Home;
