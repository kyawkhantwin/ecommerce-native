import NavBar from "@/features/navBar/NavBar.web";
import { View } from "@gluestack-ui/themed";
import { Slot } from "expo-router";

export default function TabLayout() {
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
        <Slot />;
      </View>
    </View>
  );
}
