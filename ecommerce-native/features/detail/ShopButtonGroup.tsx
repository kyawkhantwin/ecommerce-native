import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonGroup,
  Spinner,
} from "@gluestack-ui/themed";
import { CreditCard, ShoppingCart } from "lucide-react-native";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { useCreateCartMutation } from "@/redux/reducer/cartsApiSlice";
import useShowToast from "@/components/toast/ShowToast";

interface ShopButtonGroupProps {
  productId: number;
  price: number;
  quantity: number;
}

const ShopButtonGroup: React.FC<ShopButtonGroupProps> = ({
  productId,
  price,
  quantity,
}) => {
  const showToast = useShowToast();
  const user = useSelector(selectCurrentUser);
  const [createCart, { isError, isSuccess, isLoading, error }] =
    useCreateCartMutation();

  const handleCart = async () => {
    await createCart({
      productId,
      price: quantity * price,
      quantity,
      userId: user.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("success", "Cart created success");
    }

    if (isError) {
      console.log(error);
      showToast("error", error?.data?.message || "Cart created fail");
    }
  }, [isSuccess, isError, error]);

  return (
    <ButtonGroup marginTop="$2">
      {/* <Button>
        <ButtonIcon as={CreditCard} marginRight="$2" />
        <ButtonText>Buy Now</ButtonText>
      </Button> */}
      <Button isDisabled={!quantity && true} onPress={handleCart}>
        <ButtonIcon as={isLoading ? Spinner : ShoppingCart} marginRight="$2" />
        <ButtonText>Add To Cart</ButtonText>
      </Button>
    </ButtonGroup>
  );
};

export default ShopButtonGroup;
