import { ButtonText, View } from "@gluestack-ui/themed";
import { Button, ButtonIcon, HStack, Image } from "@gluestack-ui/themed";
import { Link, router, useNavigation } from "expo-router";
import React from "react";

const AdminNavBar = () => {
  const navigation = useNavigation();
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <View
        $dark-bgColor={"rgb(242, 242, 242)"}
        $light-bgColor={"rgb(1, 1, 1)"}
      >
        <HStack
          marginHorizontal={20}
          $md-marginHorizontal={50}
          $lg-marginHorizontal={100}
          $2xl-marginHorizontal={200}
          paddingVertical={10}
        >
          <HStack flex={1} alignItems="center" space="md">
            <Link href="/">
              <Image
                width={50}
                height={50}
                source={{
                  uri: "https://cdn-icons-png.freepik.com/512/49/49075.png",
                }}
              />
            </Link>
            <View flex={1}></View>
            <Button
              variant="outline"
              size="md"
              action="positive"
              alignItems="center"
              justifyContent="center"
              onPress={() => router.push("/")}
            >
              <ButtonText>Switch To User</ButtonText>
            </Button>
          </HStack>
        </HStack>
      </View>
    </div>
  );
};

export default AdminNavBar;
