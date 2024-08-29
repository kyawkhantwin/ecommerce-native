import React from "react";
import { Card, Icon, Text, View } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";

const DashboardCardItem = ({ name, number, icon }) => {
  return (
    <Card alignItems="center" $sm-width={200} $md-w={200} bgColor="$primary500">
      <View
        alignItems="center"
        display="flex"
        flexDirection="row"
        gap="$2"
        justifyContent="space-around"
      >
        <Icon as={icon} size={30}  color="$white" />
        <VStack space="md" 
        alignItems="center"
        jsutifyContent="center"
        >
          <Text color="$white">{name}</Text>
          <Text color="$white">{number}</Text>
        </VStack>
      </View>
    </Card>
  );
};

export default DashboardCardItem;
