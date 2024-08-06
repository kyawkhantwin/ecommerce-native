import AdminSideBarIcon from "@/components/admin/AdminSideBarIcon";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  View,
} from "@gluestack-ui/themed";
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

const AdminSideBar = () => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      w="$1/5"
      height={windowHeight}
      bgColor="$trueGray200"
      paddingTop={15}
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

      <Button marginTop={200} variant="outline" action="negative">
        <ButtonIcon as={LogOut} color="$negative" marginRight={10} />
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
};

export default AdminSideBar;
