import { useState, createContext, useEffect } from "react";

//create a context to store the auth state
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [auth]);

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
