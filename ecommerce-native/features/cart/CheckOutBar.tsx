import { useCreateOrderMutation } from "@/redux/reducer/ordersApiSlice";
import {
  Fab,
  VStack,
  Button,
  ButtonIcon,
  Text,
  HStack,
  ButtonText,
} from "@gluestack-ui/themed";
import { useNavigation } from "expo-router";

import { ShoppingCart } from "lucide-react-native";

interface CheckOutProps {
  totalPrice: number;
  totalItem: number;
}
const CheckOutBar: React.FC<CheckOutProps> = ({ totalPrice, totalItem }) => {
  const navigation = useNavigation();
  const handleCheckOut = () => {
    navigation.navigate("checkout");
  };

  return (
    <Fab
      position="absolute"
      bottom={0}
      right={0}
      rounded={0}
      w="$full"
      bg="$backgroundLight50"
      $dark-bg="$backgroundDark900"
      placement="bottom right"
    >
      <VStack w="$full" space="md">
        <HStack w="$full" justifyContent="space-between">
          <Text>Total Item : {totalItem}</Text>

          <Text>Total Price : {totalPrice}</Text>
        </HStack>

        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={handleCheckOut}
        >
          <ButtonIcon as={ShoppingCart} marginRight="$3" />

          <ButtonText>CheckOut </ButtonText>
        </Button>
      </VStack>
    </Fab>
  );
};

export default CheckOutBar;
