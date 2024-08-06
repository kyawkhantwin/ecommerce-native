import React from "react";
import { Button, Image, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
interface ButtonIconProps {
  image: string;
  name: string;
  id: number;
}
const CategoryItem: React.FC<ButtonIconProps> = ({ image, name, id }) => {
  return (
    <Button
      variant="link"
      display="flex"
      flexDirection="column"
      marginRight={30}
      onPress={() => router.push("/search/category/" + id)}
    >
      <Image
        size="md"
        source={{
          uri: image,
        }}
        alt="image"
        rounded="$sm"
      />
      <Text mt="$2" textTransform="capitalize">
        {name}
      </Text>
    </Button>
  );
};

export default CategoryItem;
