import { Stack } from "expo-router";

const TransactionLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="transaction-list" />
      <Stack.Screen name="transaction-detail/[transactionId]" />
    </Stack>
  );
};

export default TransactionLayout;
