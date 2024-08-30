import { Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import { router } from "expo-router";

const AppLayout = () => {
  const { currentUser } = useAuth();
  const [isReady,setIsReady] = useState(false)
  useEffect(()=>{
setIsReady(true)
  },[])

  useEffect(() => {
    if (isReady && !currentUser ) {
        router.replace("/login");
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
