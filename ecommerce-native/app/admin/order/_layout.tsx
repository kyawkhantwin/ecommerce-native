import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="order-list" />
      <Stack.Screen name="order-detail/[orderId]" />
    </Stack>
  );
};

export default OrderLayout;
