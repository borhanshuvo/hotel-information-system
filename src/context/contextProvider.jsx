import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    setAccessToken(JSON.parse(localStorage.getItem("token")));
  }, []);

  console.log(user, accessToken);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
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
