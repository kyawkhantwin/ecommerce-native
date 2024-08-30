// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthData, selectAuthStatus, selectCurrentUser } from '@/redux/auth/authSlice';
import { Spinner } from '@gluestack-ui/themed';

const AuthContext = createContext(null); // Explicitly set initial value to null for debugging clarity

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const currentUser = useSelector(selectCurrentUser) || null;
  const authStatus = useSelector(selectAuthStatus) || 'idle';



  useEffect(() => {
    const fetchAuthData = async () => {
      try {

        await dispatch(loadAuthData()).unwrap();
        setIsReady(true);

      } catch (error) {
        console.error('Error loading auth data:', error);
      } 
    };

    if (authStatus === 'idle') {
      fetchAuthData();
    } else {
      setIsReady(true);
    }
  }, [dispatch, authStatus]);

  if (!isReady) {
    return <Spinner/>
  }

  return (
    <AuthContext.Provider value={{ currentUser, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
