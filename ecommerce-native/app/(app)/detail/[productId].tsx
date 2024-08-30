import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
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
import HeaderWithGoback from "@/components/HeaderWithGoback";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import NavBar from "@/features/navBar/NavBar";
import useShowToast from "@/components/toast/ShowToast";

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
  const showToast = useShowToast();

  const { isLoading, isError, error } = useGetProductsQuery();
  const selectProduct: product = useSelector((state) =>
    selectProductById(state, local.productId)
  );

  if (isLoading) {
    return <Spinner size="large" />;
  } else if (isError) {
    showToast('error' , 'something Wrong');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView h="$full" showsVerticalScrollIndicator={false}>
        <NavBar />
        <Image
          width="100%"
          height="$64"
          size="lg"
          alt={selectProduct.title}
          source={{ uri: selectProduct.images[0] }}
        />
        <VStack space="md" marginBottom="$7" marginLeft="$2">
          <ProductDetail
            name={selectProduct.title}
            price={selectProduct.price}
            description={selectProduct.description}
            productId={selectProduct.id}
          />
          <ProductReview productId={selectProduct.id} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailProduct;
