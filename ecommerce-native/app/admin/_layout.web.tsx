import CenterSpinner from "@/components/CenterSpinner";
import useShowToast from "@/components/toast/ShowToast";
import AdminNavBar from "@/features/navBar/AdminNavBar.web";
import AdminSideBar from "@/features/navBar/AdminSideBar";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { Divider, HStack, View } from "@gluestack-ui/themed";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";

export default function TabLayout() {
  const currentUser = useSelector(selectCurrentUser);
  const showToast = useShowToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!currentUser?.isAdmin) {
        showToast("error", "Unauthorized access");
        router.replace("/");
      }
    }
  }, [isMounted, currentUser]);

  if (!isMounted) {
    return <CenterSpinner />;
  }

  return (
    <View flex={1} position="relative">
      <AdminNavBar />
      <HStack flex={1} space="2xl">
        <AdminSideBar />
        <View
          flex={1}
          w="$full"
          $md-w={"$4/5"}
          p={10}
          $md-paddingRight={20}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Slot />
          </ScrollView>
        </View>
      </HStack>
    </View>
  );
}
