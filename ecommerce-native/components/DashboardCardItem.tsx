import React from "react";
import { Card, HStack, Icon, Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";

const DashboardCardItem = ({ name, number, icon }) => {
  return (
    <Card alignItems="center" bgColor="$primary500">
      <HStack space="lg" justifyContent="space-around" alignItems="center" >
        <Icon as={icon} size={43} color="$white"/>
        <VStack space="md">
          <Text color="$white">{name}</Text>
          <Text color="$white">{number}</Text>
        </VStack>
      </HStack>
    </Card>
  );
};

export default DashboardCardItem;
