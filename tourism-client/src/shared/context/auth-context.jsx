import { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: (userId, token) => {},
  logout: () => {},
});

const getUserData = () => {
  let userData = {
    token: null,
    userId: null,
  };

  try {
    const localStorageResult = JSON.parse(localStorage.getItem('userData__monu'));

    if (localStorageResult) {
      userData = localStorageResult;
    }
  } catch (error) {
    console.log(error);
  }

  return userData;
};

const AuthContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(getUserData());
  const { token, userId } = userSession;

  const login = useCallback((userId, token) => {
    setUserSession({
      token,
      userId,
    });
    localStorage.setItem(
      'userData__monu',
      JSON.stringify({
        userId,
        token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserSession({
      token: null,
      userId: null,
    });
    localStorage.removeItem('userData__monu');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData__monu'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  const value = {
    isLoggedIn: !!token,
    token,
    userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
