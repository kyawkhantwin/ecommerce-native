import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ButtonIcon,
  HStack,
  Heading,
  VStack,
  Card,
  Text,
  Button,
} from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { useGetLatestOrderQuery } from "@/redux/reducer/ordersApiSlice";
import { router } from "expo-router";

interface OrderTabProps {
  currentUser: {
    id: number;
    username: string;
    location: string;
    email: string;
  };
}
const OrdersTabSetting: React.FC<OrderTabProps> = ({ currentUser }) => {
  const { data: orderData, isSuccess } = useGetLatestOrderQuery({
    userId: currentUser.id,
    latest: 2,
  });
  let orders: any[] = [];
  if (isSuccess) {
    orders = Object.values(orderData?.entities);
  }

  const totalSum = (productOrders) => {
    return productOrders.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder.price * currentOrder.quantity;
    }, 0);
  };
  return (
    <VStack space="md">
      <HStack>
        <Heading flex={1}>Orders </Heading>
        <Button variant="link" onPress={() => router.push("order")}>
          <ButtonIcon alignSelf="center" size="xl" as={ChevronRight} />
        </Button>
      </HStack>
      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        space="lg"
        width="$full"
      >
        {/* Loop orders */}
        {isSuccess &&
          orders.map((order) => {
            return (
              <Card
                width={160}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack>
                  <Text>{new Date(order?.createdAt).toLocaleDateString()}</Text>
                  <Text size="lg" color="$yellow400">
                    {totalSum(order.productOrders)} MMK
                  </Text>
                </VStack>
              </Card>
            );
          })}
      </HStack>
    </VStack>
  );
};

export default OrdersTabSetting;
