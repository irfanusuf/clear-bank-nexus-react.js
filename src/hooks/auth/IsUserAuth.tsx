import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";

const IsUserAuth = ({ children }) => {
  const navigate = useNavigate();


  const [auth, setAuth] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token === null || token === undefined || token === "" || !token) {
          navigate("/login");
        }
        const res = await axiosInstance.get(`/auth/verify-user`);
        if (res.status === 200) {
          setAuth(true)
        }

      } catch (error) {
        if (error.response.status === 403 || error.response.status === 401) {
          navigate("/login");
        }
      }
    })();
  });


  if (auth) {
    return children;
  }

};

export default IsUserAuth;
