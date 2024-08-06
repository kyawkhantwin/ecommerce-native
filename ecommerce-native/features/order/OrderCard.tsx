import React from "react";
import {
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Image,
  Heading,
  ButtonText,
} from "@gluestack-ui/themed";
import { Card } from "@gluestack-ui/themed";

interface Order {
  id: number;
  date: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
}

interface OrderCardProps {
  order: Order;
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const totalSum = (productOrders) => {
    return productOrders.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder.price * currentOrder.quantity;
    }, 0);
  };
  return (
    <Card key={order.id}>
      <VStack padding={10} space="md">
        <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
        {order.productOrders.map((order) => (
          <HStack key={order.product.id} alignItems="center" space="md">
            <Image
              alt={order.product.name}
              source={{ uri: order.product.images[0] }}
              width={50}
              height={50}
            />
            <Text>{order.product.name}</Text>
            <Text>Quantity: {order.quantity}</Text>
            <Text>Price: ${order.price}</Text>
          </HStack>
        ))}
        <Divider />
        <HStack justifyContent="space-between">
          <Text fontSize="$lg">Total:</Text>
          <Text fontSize="$lg">${totalSum(order.productOrders)}</Text>
        </HStack>
        <Button variant="outline">
          <ButtonText> Reorder</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export default OrderCard;
