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
  const checkUser = useSelector(selectCurrentUser);
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
      if (!checkUser) {
        router.replace("/login");
      }
    }
  }, [checkUser, isReady]);

  if (!isReady) {
    return null; // Or a loading indicator
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {checkUser ? (
        checkUser && <Stack.Screen name="(app)" />
      ) : (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </>
      )}

      <Stack.Screen name="admin" />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default AppStack;
