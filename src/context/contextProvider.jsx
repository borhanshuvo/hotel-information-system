import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decode = jwt_decode(JSON.parse(localStorage.getItem("token")));
      if (decode?.exp * 1000 < Date.now()) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        setUser({});
      } else {
        setUser(JSON.parse(localStorage.getItem("userInfo")));
        setAccessToken(JSON.parse(localStorage.getItem("token")));
      }
    }
  }, [accessToken]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        number,
        setNumber,
        navigate,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextState = () => {
  return useContext(Context);
};

export default ContextProvider;
