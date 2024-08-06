import React, { useState } from "react";
import {
  Heading,
  VStack,
  View,
  HStack,
  Icon,
  Text,
  ButtonGroup,
  Button,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { Minus, Plus, Truck } from "lucide-react-native";
import ShopButtonGroup from "./ShopButtonGroup";

interface ProductDetailProps {
  name: string;
  price: number;
  description: string;
  productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  name,
  price,
  description,
  productId,
}) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View>
      <VStack space="md" marginTop="$3">
        <VStack space="md">
          <Heading>{name}</Heading>
          <Text $light-color="$yellow600" $dark-color="$yellow400">
            {price} MMK
          </Text>
          <Text>{description}</Text>
          <HStack space="xs">
            <Icon size="xl" marginBottom={0} as={Truck} />
            <Text>1000 MMK</Text>
          </HStack>
          <HStack alignItems="center">
            <Text>Quantity : </Text>
            <ButtonGroup size="sm">
              <Button
                variant="outline"
                action="secondary"
                onPress={decreaseQuantity}
              >
                <ButtonIcon as={Minus} />
              </Button>
              <Text alignSelf="center">{quantity}</Text>
              <Button
                variant="outline"
                action="secondary"
                onPress={increaseQuantity}
              >
                <ButtonIcon as={Plus} />
              </Button>
            </ButtonGroup>
          </HStack>
          <ShopButtonGroup
            productId={productId}
            price={price}
            quantity={quantity}
          />
        </VStack>
      </VStack>
    </View>
  );
};

export default ProductDetail;
