import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
  HStack,
  ScrollView,
  Image,
  Spinner,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useRoute } from "@react-navigation/native";
import {
  selectProductById,
  useGetProductsQuery,
} from "@/redux/reducer/productsApiSlice";
import { useSelector } from "react-redux";
import ProductDetail from "@/features/detail/ProductDetail";
import ProductReview from "@/features/detail/ProductReview";
import { useLocalSearchParams } from "expo-router";
import { useGetReviewQuery } from "@/redux/reducer/reviewApiSlice";

// Define the Product type
type product = {
  images: string[];
  title: string;
  price: number;
  description: string;
  id: number;
};

const DetailProduct = function () {
  const local = useLocalSearchParams();

  const { isLoading, isError, error } = useGetProductsQuery();
  const selectProduct: product = useSelector((state) =>
    selectProductById(state, local.productId)
  );

  if (isLoading) {
    return <Spinner size="large" />;
  } else if (isError) {
    console.log(error);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView h="$full" showsVerticalScrollIndicator={false}>
        <HStack space="lg" marginVertical={20}>
          <Image
            width="25%"
            height="$64"
            size="lg"
            rounded="$sm"
            alt={selectProduct.title}
            source={{ uri: selectProduct.images[0] }}
          />
          <View></View>
          <ProductDetail
            name={selectProduct.title}
            price={selectProduct.price}
            description={selectProduct.description}
            productId={selectProduct.id}
          />
        </HStack>
        <ProductReview productId={selectProduct.id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailProduct;
