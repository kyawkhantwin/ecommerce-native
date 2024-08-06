import { Stack } from "expo-router";

const CategoryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="category-list" />
      <Stack.Screen name="category-create" />
      <Stack.Screen name="category-edit/[categoryId]" />
    </Stack>
  );
};

export default CategoryLayout;
