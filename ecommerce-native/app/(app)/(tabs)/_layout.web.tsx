import NavBar from "@/features/navBar/NavBar.web";
import { View } from "@gluestack-ui/themed";
import { Slot } from "expo-router";

export default function TabLayout() {
  return (
    <View flex={1} position="relative">
      <Slot />;
    </View>
  );
}
