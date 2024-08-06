import SearchBar from "@/components/navigation/SearchBar";
import { View } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Button, ButtonIcon, HStack, Image } from "@gluestack-ui/themed";
import { Link, router, useNavigation } from "expo-router";
import { Cog, ShoppingCartIcon } from "lucide-react-native";
import React from "react";

const NavBar = () => {
  return (
    <View>
      <View $dark-bgColor={"rgb(242, 242, 242)"} $light-bgColor={"rgb(1, 1, 1)"}>
        <HStack
          paddingVertical={10}
          paddingHorizontal={20}
          space="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/">
            <Text>Home</Text>
          </Link>
          <HStack>
            <SearchBar />
          </HStack>
        </HStack>
      </View>
    </View>
  );
};

export default NavBar;
