import { Link } from "react-router-dom";
import { Button } from "antd";
import useHome from "./useHome-Controller";

const Home = () => {
  const { logout } = useHome();

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
};

export default Home;
