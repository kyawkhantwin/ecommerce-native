import React from "react";
import { Card, Image, Text, Pressable } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import { router } from "expo-router";

interface ProductCardProps {
  productId: number;
  name: string;
  image: string;
  price: string;
  forKey: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  name,
  image,
  price,
  forKey,
}) => {
  return (
    <Pressable key={forKey} onPress={() => router.push(`/detail/${productId}`)}>
      <Card
        padding={0}
        paddingBottom={30}
        borderRadius="$lg"
        width={150}
        $md-width={200}
        $lg-width={200}
        margin="$2"
      >
        <Image
          mb="$2"
          h={100}
          $md-h={150}
          width="$full"
          borderTopLeftRadius="$md"
          borderTopRightRadius="$md"
          alt={name}
          source={{
            uri: image,
          }}
        />

        <View paddingHorizontal="$2">
          <Heading size="sm" height={50} fontFamily="$heading">
            {name.length > 35 ? `${name.substring(0, 35)}...` : name}
          </Heading>
          <Text size="xs" $light-color="$yellow600" $dark-color="$yellow400">
            {price} MMK
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};

export default ProductCard;
