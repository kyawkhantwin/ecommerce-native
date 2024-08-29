import {
  loadAuthData,
  selectAuthStatus,
  selectCurrentUser,
} from "@/redux/auth/authSlice";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppStack = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const authStatus = useSelector(selectAuthStatus);

  useEffect(() => {
    const fetchAuthData = async () => {
      await dispatch(loadAuthData()).unwrap();
      setIsReady(true);
    };

    if (authStatus === "idle") {
      fetchAuthData();
    } else {
      setIsReady(true);
    }
  }, [dispatch, authStatus]);

  useEffect(() => {
    if (isReady) {
      if (!currentUser) {
        router.replace("/login");
      }
    }
  }, [currentUser, isReady]);

  

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {currentUser ? (
        <>
          <Stack.Screen name="(app)" />
          {currentUser.isAdmin && <Stack.Screen name="admin" />}
        </>
      ) : (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </>
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default AppStack;
