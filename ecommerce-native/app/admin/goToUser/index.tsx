import { Text, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView>
      <View>
        <Link href={"/"}>
          <Text>Go to user</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default index;
