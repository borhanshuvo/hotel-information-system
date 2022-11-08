import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    setAccessToken(JSON.parse(localStorage.getItem("token")));
  }, []);

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
