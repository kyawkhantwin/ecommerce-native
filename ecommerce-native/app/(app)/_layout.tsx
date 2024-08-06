import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="detail/[productId]" />
      <Stack.Screen name="search" />
      <Stack.Screen name="order" />
    </Stack>
  );
}
