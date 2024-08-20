import CenterSpinner from "@/components/CenterSpinner";
import useShowToast from "@/components/toast/ShowToast";
import AdminNavBar from "@/features/navBar/AdminNavBar.web";
import AdminSideBar from "@/features/navBar/AdminSideBar";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { Divider, HStack, View } from "@gluestack-ui/themed";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const currentUser = useSelector(selectCurrentUser);
  const showToast = useShowToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!currentUser?.admin) {
        showToast("error", "Unauthorized access");
        router.replace("/");
      }
    }
  }, [isMounted, currentUser]);

  if (!isMounted) {
    return <CenterSpinner />;
  }

  return (
    <View position="relative" height="$full" flex={1}>
      <AdminNavBar />
      <HStack space="2xl" height="$full">
        <AdminSideBar />
        <Slot />
      </HStack>
    </View>
  );
}
