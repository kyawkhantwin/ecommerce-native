import React from "react";
import { VStack, HStack, Heading, ScrollView } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import HeaderWithGoback from "@/components/HeaderWithGoback";
import OrderPending from "@/features/order/OrderPending";
import OrderDone from "@/features/order/OrderDone";

const Order = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderWithGoback  header={"Order"} />
        <VStack padding={20} space="lg">
          <OrderPending currentUser={currentUser} />
          <OrderDone currentUser={currentUser} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
