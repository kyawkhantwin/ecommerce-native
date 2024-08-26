import React from "react";
import { VStack, Heading } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUserCartsQuery } from "@/redux/reducer/cartsApiSlice";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import CartTable from "@/features/checkout/CartTable";
import Payment from "@/features/checkout/Payment";
import Location from "@/features/checkout/Location";
import HeaderWithGoback from "@/components/HeaderWithGoback";
import { router } from "expo-router";

const Checkout: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {
    isSuccess,
    data: userCartResult,
  } = useGetUserCartsQuery(currentUser.id);

  // Get user cart
  const userCart = Object.values(userCartResult?.entities || {})[0];

  if (!userCart) {
    setTimeout(() => {
      router.replace("cart");
    }, 500);
  }
  return (
    <SafeAreaView>
      <VStack space="lg">
        <HeaderWithGoback header={"Order Summary"}  />
        {isSuccess && (
          <>
            <CartTable userCart={userCart} />
            <Location currentUser={currentUser} />
            <Payment
              cartId={userCart.id}
              userId={currentUser.id}
            />
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
};

export default Checkout;
