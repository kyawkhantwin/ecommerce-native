import { Stack } from "expo-router";

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="product-list"
    >
      <Stack.Screen name="product-list" />
      <Stack.Screen name="product-create" />
      <Stack.Screen name="product-edit/[productId]" />
    </Stack>
  );
};

export default ProductLayout;
