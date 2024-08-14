import React, { useState, useEffect } from "react";
import {
  ButtonText,
  Heading,
  VStack,
  Text,
  HStack,
  LinkText,
  Button,
  InputIcon,
  FormControl,
  View,
  Input,
  InputField,
  ButtonSpinner,
  useToast,
} from "@gluestack-ui/themed";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@gluestack-ui/themed";

import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useShowToast from "@/components/toast/ShowToast";
import {
  loadAuthData,
  selectAuthStatus,
  selectCurrentUser,
  setCredentials,
} from "@/redux/auth/authSlice";
import { useLoginMutation } from "@/redux/auth/authApiSlice";
import { router } from "expo-router";

const Login = () => {
  const showToast = useShowToast();
  const dispatch = useDispatch();

  const windowHeight = Dimensions.get("window").height;
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isSuccess, isError, error, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
    if (isError) {
      showToast("error", error?.status);
      console.error("Login error:", error);
    }
  }, [isSuccess, isError, error]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigateTo = () => {
    router.push("/signup");
  };

  const loginHandler = async () => {
    try {
      const userData = await login({
        emailOrUsername,
        password,
      }).unwrap();
      if (userData) showToast("success", "Login success");
      const { user, token } = Object.values(userData.entities)[0];
      dispatch(setCredentials({ user, token }));
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <SafeAreaView>
      <View
  
        style={{ height: windowHeight }}
        paddingHorizontal="$8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl
            $md-width={700}
          w="$full"
          p="$4"
          borderWidth="$1"
          borderRadius="$lg"
          borderColor="$borderLight300"
          $dark-borderWidth="$1"
          $dark-borderRadius="$lg"
          $dark-borderColor="$borderDark800"
        >
          <VStack space="xl">
            <Heading lineHeight="$md">Login</Heading>
            <VStack space="xs">
              <Text lineHeight="$xs">Email or Username</Text>
              <Input>
                <InputField
                  type="text"
                  value={emailOrUsername}
                  onChangeText={(text) => setEmailOrUsername(text)}
                  placeholder="Email or Username"
                />
              </Input>
            </VStack>
            <VStack space="xs">
              <Text lineHeight="$xs">Password</Text>
              <Input>
                <InputField
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChangeText={(text) => setPassword(text)}
                  style={{ paddingRight: 40 }}
                  placeholder="Password"
                />
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    justifyContent: "center",
                    paddingRight: 8,
                    zIndex: 12,
                  }}
                >
                  <Pressable
                    onPress={handleShowPassword}
                    style={{ padding: 10 }}
                  >
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </Pressable>
                </View>
              </Input>
            </VStack>
            <Button ml="auto" onPress={loginHandler}>
              {isLoading && <ButtonSpinner />}
              <ButtonText color="$white">Login</ButtonText>
            </Button>
          </VStack>
          <Divider my="$5" />
          <HStack>
            <Text>Don't Have an Account?</Text>
            <Pressable onPress={navigateTo}>
              <LinkText>Register</LinkText>
            </Pressable>
          </HStack>
        </FormControl>
      </View>
    </SafeAreaView>
  );
};

export default Login;
