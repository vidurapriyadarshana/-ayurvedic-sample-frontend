import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div className="text-center mt-20">Logging you in...</div>;
};

export default Callback;
