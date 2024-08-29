import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthData, selectAuthStatus, selectCurrentUser } from '@/redux/auth/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const authStatus = useSelector(selectAuthStatus);

  useEffect(() => {
    const fetchAuthData = async () => {
      await dispatch(loadAuthData()).unwrap();
      setIsReady(true);
    };

    if (authStatus === 'idle') {
      fetchAuthData();
    } else {
      setIsReady(true);
    }
  }, [dispatch, authStatus]);

  return (
    <AuthContext.Provider value={{ currentUser, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
