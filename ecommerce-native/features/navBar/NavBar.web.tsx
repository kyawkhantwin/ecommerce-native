import SearchBar from "@/components/navigation/SearchBar";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { useGetUserCartsQuery } from "@/redux/reducer/cartsApiSlice";
import {
  Button,
  ButtonIcon,
  HStack,
  Image,
  Text,
  ButtonText,
  View,
} from "@gluestack-ui/themed";
import { Link, router } from "expo-router";
import { Cog, ShoppingCartIcon } from "lucide-react-native";
import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { data: shoppingCartData, isSuccess } = useGetUserCartsQuery(
    currentUser?.id
  );

  const shoppingCart = shoppingCartData
    ? Object.values(shoppingCartData.entities)
    : [];


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
          alignItems="center"
          justifyContent="center"
          paddingVertical={10}
        >
          <HStack flex={1} space="md" alignItems="center">
            <Link href="/">
              <Image
                width={50}
                height={50}
                source={{
                  uri: "/logo.png",
                }}
                alt="ecommero-logo"

              />
            </Link>
            {currentUser?.isAdmin && (
              <Button
                variant="outline"
                size="md"
                action="positive"
                $light-action="negative"
                alignItems="center"
                justifyContent="center"
                onPress={() => router.push("admin")}
              >
                <ButtonText>Switch To Admin</ButtonText>
              </Button>
            )}
          </HStack>
          <HStack space="lg">
            <SearchBar />
            <Button
              variant="link"
              size="md"
              alignItems="center"
              justifyContent="center"
              onPress={() => router.push("settings")}
            >
              <ButtonIcon
                size="xl"
                as={Cog}
                $light-color={"rgb(242, 242, 242)"}
                $dark-color={"rgb(1, 1, 1)"}
              />
            </Button>
            <Button
              variant="link"
              size="md"
              alignItems="center"
              justifyContent="center"
              onPress={() => router.push("cart")}
              position="relative"
            >
              <ButtonIcon
                size="xl"
                as={ShoppingCartIcon}
                $light-color={"rgb(242, 242, 242)"}
                $dark-color={"rgb(1, 1, 1)"}
              />
              {isSuccess && (
                <View
                  p={4}
                  rounded="$full"
                  bgColor="$red700"
                  position="absolute"
                  top={-7}
                  right={-20}
                  min-width="$6"
                >
                  <Text color="$white" textAlign="center">
                    {shoppingCart[0]?.productCarts?.length}
                  </Text>
                </View>
              )}
            </Button>
          </HStack>
        </HStack>
      </View>
    </div>
  );
};

export default NavBar;
