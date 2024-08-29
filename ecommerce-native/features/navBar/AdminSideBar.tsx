import AdminSideBarIcon from "@/components/admin/AdminSideBarIcon";
import useShowToast from "@/components/toast/ShowToast";
import { logout } from "@/redux/auth/authSlice";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  View,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Link } from "expo-router";
import {
  BarChart,
  FileCheck,
  Layers,
  LogOut,
  Package,
  Watch,
} from "lucide-react-native";
import React from "react";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const showToast = useShowToast();
  const handleLogout = () => {
    dispatch(logout());
    showToast("warning", "Logout success");
    router.replace("/login");
  };
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      w="$1/5"
      paddingTop={50}
      height={windowHeight}
      bgColor="$trueGray200"
      display="none"
      $md-display="flex"
    >
      <Heading
        marginBottom={10}
        textAlign="center"
        marginHorizontal={"auto"}
        size="2xl"
        color="$black"
      >
        <Link href="/admin">Admin</Link>
      </Heading>
      <AdminSideBarIcon icon={BarChart} name={"Dashboard"} navigate={""} />
      <AdminSideBarIcon icon={Layers} name={"Category"} navigate={"category"} />
      <AdminSideBarIcon icon={Watch} name={"Product"} navigate={"product"} />
      <AdminSideBarIcon icon={Package} name={"Order"} navigate={"order"} />
      <AdminSideBarIcon
        icon={FileCheck}
        name={"Transaction"}
        navigate={"transaction"}
      />

      <Button
        onPress={handleLogout}
        marginTop={200}
        variant="outline"
        action="negative"
      >
        <ButtonIcon as={LogOut} color="$negative" marginRight={10} />
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
};

export default AdminSideBar;
