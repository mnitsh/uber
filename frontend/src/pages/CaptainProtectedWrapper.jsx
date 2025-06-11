import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axiosInstance from "../lib/axios";

function CaptainProtectedWrapper({ children }) {
  const captainToken = localStorage.getItem("captainToken");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  console.log(captain);

  console.log("captainToken: ", captainToken);

  useEffect(() => {
    if (!captainToken) {
      navigate("/captain-login");
    }

    axiosInstance
      .get("/v1/captians/profile", {
        headers: {
          Authorization: `Bearer ${captainToken}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setCaptain(response.data.data.captian);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("captainToken");
        navigate("/captain-login");
      });
  }, [captainToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
}

export default CaptainProtectedWrapper;
