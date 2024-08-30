import { useAuth } from "@/context/AuthContext";
import NavBar from "@/features/navBar/NavBar.web";
import { View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { router } from "expo-router";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const { currentUser } = useAuth();
  const [isReady,setIsReady] = useState(false)
  useEffect(()=>{
setIsReady(true)
  },[])

  useEffect(() => {
    console.log(isReady && !currentUser)
    if (isReady && !currentUser ) {
        router.replace("/login");
    }
  }, [currentUser, isReady]);
  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View
        style={{ flex: 1 }}
        marginHorizontal={20}
        $md-marginHorizontal={50}
        $lg-marginHorizontal={100}
        $xl-marginHorizontal={200}
      >
        <Slot />
      </View>
    </View>
  );
}
