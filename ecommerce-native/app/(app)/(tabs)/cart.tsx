import React from "react";
import { Heading, VStack, ScrollView } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { useGetUserCartsQuery } from "@/redux/reducer/cartsApiSlice";
import CartCard from "@/features/cart/CartCard";
import CenterSpinner from "@/components/CenterSpinner";
import CheckOutBar from "@/features/cart/CheckOutBar";
import PlaceHolder from "@/components/PlaceHolder";
import { Dimensions, Platform } from "react-native";

const Cart: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const DimeHeight = Dimensions.get("window").height;

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: userCartResult,
  } = useGetUserCartsQuery(currentUser.id);

  const userCart = Object.values(userCartResult?.entities || {})[0];
  console.log(userCart);
  const totalPrice = (items: []) => {
    return items?.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        height={Platform.OS === "web" ? DimeHeight - 200 : "$full"}
        marginStart={10}
      >
        <Heading>Cart</Heading>
        <VStack marginTop="$2" marginBottom={120} space="sm">
          {isLoading && <CenterSpinner />}

          {isError && (
            <>
              <PlaceHolder
                message={`Error: ${
                  error?.data?.message || "Failed to load cart"
                }`}
              />
            </>
          )}

          {isSuccess &&
            (userCart ? (
              userCart.productCarts.map((productCart) => (
                <CartCard
                  key={productCart.product.id}
                  price={productCart.product.price}
                  image={productCart.product.images[0]}
                  name={productCart.product.title}
                  totalQty={productCart.quantity}
                  productId={productCart.productId}
                  cartId={productCart.cartId}
                />
              ))
            ) : (
              <>
                <PlaceHolder message={"No Cart Yet! Add Items to your cart"} />
              </>
            ))}
        </VStack>
      </ScrollView>

      <CheckOutBar
        totalPrice={totalPrice(userCart?.productCarts)}
        totalItem={userCart?.productCarts?.length || 0}
      />
    </SafeAreaView>
  );
};

export default Cart;
