import { Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from 'expo-router';

const AppLayout = () => {
  const { currentUser, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady) {
      if (!currentUser) {
        router.replace("/login");
      }
    }
  }, [currentUser, isReady]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="detail/[productId]" />
          <Stack.Screen name="search/category/[categoryId]" />
          <Stack.Screen name="search/product/[productName]" />
          <Stack.Screen name="order" />
          </Stack>
     
  );
};

export default AppLayout;
