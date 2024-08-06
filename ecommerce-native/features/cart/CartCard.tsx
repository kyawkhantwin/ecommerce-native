import React, { useEffect, useState, useCallback } from "react";

import {
  HStack,
  Pressable,
  Card,
  VStack,
  Button,
  Text,
  Image,
  Heading,
  ButtonSpinner,
  ButtonIcon,
  TrashIcon,
} from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import {
  useDeleteProductFromCartMutation,
  useUpdateCartMutation,
} from "@/redux/reducer/cartsApiSlice";
import useShowToast from "@/components/toast/ShowToast";
import { Minus, Plus, Trash } from "lucide-react-native";
import { useNavigation } from "expo-router";

interface CartCardProps {
  productId: number;
  image: string;
  name: string;
  totalQty: number;
  price: number;
  cartId: string;
}

const CartCard: React.FC<CartCardProps> = ({
  cartId,
  image,
  name,
  totalQty: initialQty,
  price,
  productId,
}) => {
  const navigation = useNavigation();
  const currentUser = useSelector(selectCurrentUser);
  const [totalQty, setTotalQty] = useState(initialQty);
  const [deleteProductFromCart, { isSuccess, isError, isLoading, error }] =
    useDeleteProductFromCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const showToast = useShowToast();

  // Update cart quantity handler
  const handleUpdateQty = useCallback(
    async (newQty: number) => {
      try {
        await updateCart({
          id: cartId,
          productId,
          quantity: newQty,
          price: newQty * price,
          userId: currentUser.id,
        });
      } catch (e) {
        showToast("error", "Failed to update cart quantity");
        setTotalQty(initialQty); // Reset to initialQty on error
      }
    },
    [
      cartId,
      currentUser.id,
      price,
      productId,
      updateCart,
      initialQty,
      showToast,
    ]
  );

  // Debounced handler to update cart quantity
  const debounceUpdateQty = useCallback(
    (newQty: number) => {
      const handler = setTimeout(() => {
        handleUpdateQty(newQty);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    },
    [handleUpdateQty]
  );

  const addQty = () => {
    const newQty = totalQty + 1;
    setTotalQty(newQty);
    debounceUpdateQty(newQty);
  };

  const minusQty = () => {
    if (totalQty > 1) {
      const newQty = totalQty - 1;
      setTotalQty(newQty);
      debounceUpdateQty(newQty);
    }
  };

  const handleDelete = async () => {
    await deleteProductFromCart({ productId, cartId });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("success", "Product deleted from cart");
    }
    if (isError) {
      showToast(
        "error",
        error?.data?.message || "Failed to delete product from cart"
      );
    }
  }, [isSuccess, isError, error, showToast]);

  return (
    <Pressable onPress={() => navigation.navigate("Detail", { productId })}>
      <Card size="md" variant="elevated" m="$1" p={0} paddingEnd="$2">
        <HStack space="md">
          <Image
            alt="cart"
            borderTopLeftRadius="$lg"
            borderBottomLeftRadius="$lg"
            h="$full"
            source={{ uri: image }}
          />
          <VStack space="sm" flex={1} alignSelf="center">
            <Heading size="sm">{name}</Heading>
            <Text>
              Unit Price :
              <Text
                size="sm"
                $light-color="$yellow600"
                $dark-color="$yellow400"
              >
                {price} MMK
              </Text>
            </Text>
            <Text>
              Total Price :
              <Text
                size="sm"
                $light-color="$yellow600"
                $dark-color="$yellow400"
              >
                {totalQty * price} MMK
              </Text>
            </Text>

            <HStack alignItems="center">
              <Text>Qty : </Text>
              <Button variant="link" onPress={minusQty}>
                <ButtonIcon size="sm" as={Minus} />
              </Button>
              <Text marginHorizontal="$3" size="sm">
                {totalQty}
              </Text>
              <Button variant="link" onPress={addQty}>
                <ButtonIcon size="sm" as={Plus} />
              </Button>
            </HStack>
          </VStack>
          <Button onPress={handleDelete} variant="link" alignSelf="center">
            {isLoading ? (
              <ButtonSpinner size="small" color="$red500" />
            ) : (
              <ButtonIcon
                size="xl"
                color="$red500"
                as={Trash}
                marginRight={5}
                $md-marginRight={10}
              />
            )}
          </Button>
        </HStack>
      </Card>
    </Pressable>
  );
};

export default CartCard;
