import { Text } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import React from "react";

const PlaceHolder = ({ message }) => {
  return (
    <View
      w="$full"
      h={250}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center">{message}</Text>
    </View>
  );
};

export default PlaceHolder;
