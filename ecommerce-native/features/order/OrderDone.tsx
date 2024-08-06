import { HStack, Heading } from "@gluestack-ui/themed";
import React from "react";
import OrderCard from "./OrderCard";
import { useGetUserOrdersQuery } from "@/redux/reducer/ordersApiSlice";

interface OrderProps {
  currentUser: {
    id: number;
    username: string;
    location: string;
    email: string;
  };
}
const OrderDone: React.FC<OrderProps> = ({ currentUser }) => {
  const {
    data: ordersData,
    isLoading,
    isSuccess,
  } = useGetUserOrdersQuery({ userId: currentUser.id, status: "done" });
  let orders: any[] = [];
  if (isSuccess) {
    orders = Object.values(ordersData?.entities);
  }

  return (
    <>
      <Heading size="lg">Done </Heading>
      <HStack flexWrap="wrap" space="lg">
        {isSuccess &&
          orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </HStack>
    </>
  );
};

export default OrderDone;
