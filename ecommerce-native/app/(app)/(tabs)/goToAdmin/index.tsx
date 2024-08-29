import { Text, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        flex={1}
        width={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/admin">
          <Text style={{ fontSize: 18, color: "blue" }}>Go to admin</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Index;
