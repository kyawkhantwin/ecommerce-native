import React from "react";
import { MoveLeft } from "lucide-react-native";
import { Box, Button, Heading, ButtonIcon } from "@gluestack-ui/themed";
import { router } from "expo-router";

const HeaderWithGoback = ({ header }) => {
  return (
    <Box flexDirection="row" justifyContent="flex-start" alignItems="center">
      <Button variant="link" onPress={() => router.back()}>
        <ButtonIcon
          as={MoveLeft}
          mr={5}
          $dark-color="$textLight0"
          $light-color="$textDark900"
        />
      </Button>
      <Heading>{header}</Heading>
    </Box>
  );
};

export default HeaderWithGoback;
