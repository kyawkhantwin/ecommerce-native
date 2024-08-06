import React, { useState } from "react";
import { VStack, HStack, Text, Image } from "@gluestack-ui/themed";

import { useSelector } from "react-redux";

const CartTable: React.FC = ({ userCart }) => {
  return (
    <VStack borderWidth={1} paddingVertical={10}>
      <HStack borderBottomWidth={1} p={10}>
        <Text flex={1}>Image</Text>
        <Text flex={2}>Name</Text>
        <Text flex={1}>Quantity</Text>
        <Text flex={1}>Price</Text>
        <Text flex={1}>Total Price</Text>
      </HStack>
      {userCart.productCarts.map((cart, index) => (
        <HStack borderBottomWidth={1} p={10} key={index}>
          <Image
            paddingEnd={10}
            alt={cart.product.title}
            source={{ uri: cart.product.images[0] }}
            flex={1}
          />
          <Text flex={2}>{cart.product.title}</Text>
          <Text flex={1}>{cart.quantity}</Text>
          <Text flex={1}>${cart.product.price}</Text>
          <Text flex={1}>${cart.price.toFixed(2)}</Text>
        </HStack>
      ))}
      <HStack justifyContent="space-between"
      p={10}
      >
        <Text fontSize="$xl">Total Price:</Text>
        <Text fontSize="$xl">
          ${userCart?.productCarts[0]?.price.toFixed(2)}
        </Text>
      </HStack>
    </VStack>
  );
};

export default CartTable;
