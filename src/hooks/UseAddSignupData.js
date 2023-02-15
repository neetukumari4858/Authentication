import axios from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const UseAddSignupData = () => {
  const history = useHistory();
  const AddSignupData = (user) => {
    const userType = user?.userType;
    const response = axios.post("http://localhost:8000/user", user, {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    try {
      if (userType === "isSignedUser") {
        alert("Ragistered Successfully");
        history.push("/login");
      }
    } catch (error) {
      alert("Failed :" + error.message);
    }
    return response;
  };
  return useMutation(AddSignupData);
};

export default UseAddSignupData;

// const fetchLoginData = () => {
//   const response = axios
//     .get("http://localhost:8000/user/" +userName)
//     .then((response) => {
//       return response.json();
//     })
//     .then((response) => {
//       if (Object.keys(response).length === 0) {
//         alert("Please Enter the valid username");
//       } else {
//         if (password === response.password) {
//           alert("you are Loggeg in successfuly");
//           sessionStorage.setItem("username", userName);
//            history.push("/");
//         } else {
//           alert("Please Enter the valid credentials");
//         }
//       }
//     })
//     .catch((erroror) => {
//       console.log(`Login Failed due to ${erroror.message}`);
//     });
//   return response;
// };

// export const UseLoginData = () => {
//   return useQuery("login-user", fetchLoginData)
// };
