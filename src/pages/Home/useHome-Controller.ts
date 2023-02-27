import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useHome = () => {
  const userName = localStorage.getItem("username");
  const history = useHistory();

  const logout = () => {
    window.localStorage.setItem("logout-event", "logout" + Math.random());
    localStorage.removeItem("username");
    history.push("/login");
  };

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
  return {logout}
};

export default useHome;
