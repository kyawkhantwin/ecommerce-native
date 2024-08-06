import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, ScrollView } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import ThemeTabSetting from "@/features/settings/ThemeTabSetting";
import ThemeTabSettingWeb from "@/features/settings/ThemeTabSetting.web";
import OrdersTabSetting from "@/features/settings/OrdersTabSetting";
import UserTabsSetting from "@/features/settings/UserTabsSetting";
import LogoutTabSetting from "@/features/settings/LogoutTabSetting";
import { Platform } from "react-native";
import { View } from "@gluestack-ui/themed";

const Settings: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <SafeAreaView style={{ margin: 10, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack width="$full" space="4xl">
          <UserTabsSetting />
          <OrdersTabSetting currentUser={currentUser} />
          {Platform.OS === "web" ? <ThemeTabSettingWeb /> : <ThemeTabSetting />}
          <LogoutTabSetting />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
