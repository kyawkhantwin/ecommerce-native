import {
  VStack,
  HStack,
  Icon,
  Heading,
  Button,
  ButtonIcon,
  ButtonText,
} from "@gluestack-ui/themed";
import React from "react";
import { LogOut } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import useShowToast from "@/components/toast/ShowToast";
import { router } from "expo-router";

const LogoutTabSetting: React.FC = () => {
  const dispatch = useDispatch();
  const showToast = useShowToast();
  const handleLogout = () => {
    dispatch(logout());
    showToast("warning", "Logout success");
    router.replace("login");
  };
  return (
    <VStack space="md">
      <Heading>Logout</Heading>
      <Button
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        variant="link"
        w="$full"
        onPress={handleLogout}
      >
        <ButtonIcon alignSelf="flex-start" as={LogOut} color="$red500" />
        <ButtonText alignSelf="flex-start" color="$red500">
          Logout
        </ButtonText>
      </Button>
      <Icon />
    </VStack>
  );
};

export default LogoutTabSetting;
