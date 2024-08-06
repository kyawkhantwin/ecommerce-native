import { VStack, HStack, Heading } from "@gluestack-ui/themed";

import React from "react";
import OrderCard from "./OrderCard";
import {
  selectAllOrders,
  useGetUserOrdersQuery,
} from "@/redux/reducer/ordersApiSlice";

interface OrderProps {
  currentUser: {
    id: number;
    username: string;
    location: string;
    email: string;
  };
}
const OrderPending: React<OrderProps> = ({ currentUser }) => {
  const {
    data: ordersData,
    isLoading,
    isSuccess,
  } = useGetUserOrdersQuery({ userId: currentUser.id, status: "pending" });
  let orders: any[] = [];
  if (isSuccess) {
    orders = Object.values(ordersData?.entities);
  }

  return (
    <>
      <Heading size="lg">Pending </Heading>
      <HStack flexWrap="wrap" space="lg">
        {isSuccess &&
          orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </HStack>
    </>
  );
};

export default OrderPending;
