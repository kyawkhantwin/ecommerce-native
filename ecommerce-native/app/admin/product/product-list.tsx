import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Box,
  Button,
  ScrollView,
  VStack,
  Heading,
  ButtonText,
  ButtonIcon,
  Image,
  Spinner,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pencil, Trash2 } from "lucide-react-native";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/reducer/productsApiSlice";
import CenterSpinner from "@/components/CenterSpinner";
import useShowToast from "@/components/toast/ShowToast";
import { useNavigation } from "expo-router";

const Product = () => {
  const navigation = useNavigation();
  const showToast = useShowToast();
  const [deletingProductId, setDeletingProductId] = useState(null);

  const {
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
    isError: isProductsError,
    error: productsError,
    isUninitialized,
  } = useGetProductsQuery();

  const products = useSelector(selectAllProducts);
  const [
    deleteProduct,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const handleUpdate = (id: number) => {
    navigation.navigate("product-edit/[productId]", { productId: id });
  };

  const handleDelete = async (id: number) => {
    setDeletingProductId(id);
    await deleteProduct({ id });
    setDeletingProductId(null);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      showToast("warning", "Delete Product Success");
    }
    if (isDeleteError) {
      showToast("error", deleteError?.data?.message || "Delete Product Fail");
    }
  }, [isDeleteSuccess, isDeleteError, deleteError]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView marginHorizontal="$5" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <Heading>Product List</Heading>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Button onPress={() => navigation.navigate("product-create")}>
              <ButtonText>Create Product</ButtonText>
            </Button>
          </Box>
          <View>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              borderBottomWidth={1}
              borderBottomColor="#ccc"
              pb="$2"
              mb="$4"
            >
              <Text flex={1} fontWeight="bold">
                Image
              </Text>
              <Text flex={1} fontWeight="bold">
                Title
              </Text>
              <Text flex={1} fontWeight="bold">
                Price
              </Text>
              <Text flex={1} fontWeight="bold">
                Stock
              </Text>
              <Text flex={1} fontWeight="bold">
                Actions
              </Text>
            </Box>
            {isProductsSuccess &&
              products.map((product) => (
                <Box
                  key={product.id}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="#eee"
                  py="$2"
                >
                  <Image
                    alt={product.title}
                    source={product.images[0]}
                    resizeMode="cover"
                    style={{ flex: 1, height: 50 }}
                  />
                  <Text flex={1}>{product.title}</Text>
                  <Text flex={1}>{product.price}</Text>
                  <Text flex={1}>{product.stock}</Text>
                  <Box flexDirection="row" alignItems="center" flex={1}>
                    <Button
                      p="$3"
                      variant="link"
                      onPress={() => handleUpdate(product.id)}
                    >
                      <ButtonIcon as={Pencil} />
                    </Button>
                    <Button
                      p="$3"
                      onPress={() => handleDelete(product.id)}
                      variant="link"
                      action="negative"
                    >
                      <ButtonIcon
                        as={
                          isDeleteLoading && deletingProductId === product.id
                            ? Spinner
                            : Trash2
                        }
                      />
                    </Button>
                  </Box>
                </Box>
              ))}
            {isProductsLoading && <CenterSpinner />}
            {isProductsError && (
              <Text>
                Error loading products: {productsError?.data?.message}
              </Text>
            )}
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;
