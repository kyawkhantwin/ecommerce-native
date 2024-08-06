import { Button, ButtonIcon, ButtonText, HStack } from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";

const AdminSideBarIcon = ({ icon, name, navigate }) => {
  const handleClick = () => {
    router.push("/admin/" + navigate);
  };

  return (
    <Button
      onPress={handleClick}
      paddingVertical={25}
      marginVertical={1}
      variant="link"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      paddingHorizontal={20}
      marginRight={5}
      $hover-bgColor="$trueGray100"
      borderTopLeftRadius={0}
      borderBottomLeftRadius={0}
    >
      <ButtonIcon marginRight={10} as={icon} size="xl" $hover-color="$white" />
      <ButtonText $hover-color="$white">{name}</ButtonText>
    </Button>
  );
};

export default AdminSideBarIcon;
