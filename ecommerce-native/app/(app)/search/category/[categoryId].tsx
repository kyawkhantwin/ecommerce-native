import React from "react";
import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { View, Heading, Spinner, Text } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";

import PlaceHolder from "@/components/PlaceHolder";
import ProductCard from "@/components/ProductCard";
import Category from "@/features/home/Category";
import NavBar from "@/features/navBar/NavBar";
import { selectCategoryById } from "@/redux/reducer/categoriresApiSlice";
import { useGetSearchedCategoryProductQuery } from "@/redux/reducer/searchApiSlice";

const SearchResult = () => {
  const { categoryId } = useLocalSearchParams();
  const {
    data: searchedCategoryProductData,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetSearchedCategoryProductQuery(categoryId);
  const selectCategory = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );

  const renderProducts = () => {
    if (isLoading) {
      return (
        <View
          height={180}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Spinner size="large" />
        </View>
      );
    }

    if (isError) {
      return (
        <PlaceHolder message={` ${error?.data?.message || error.status}`} />
      );
    }

    if (isSuccess) {
      const searchedCategoryProduct = Object.values(
        searchedCategoryProductData?.entities
      );
      return searchedCategoryProduct.length !== 0 ? (
        searchedCategoryProduct.map((item, index) => (
          <ProductCard
            productId={item.id}
            key={index}
            name={item.title}
            price={item.price}
            image={item.images[0]}
          />
        ))
      ) : (
        <PlaceHolder message={`No Product Found`} />
      );
    }

    return null;
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView>
          {Platform.OS !== "web" && <NavBar />}

          <Category />

          {selectCategory?.name && (
            <Text marginTop={10}>
              Found {searchedCategoryProductData?.ids.length} Result for{" "}
              <Heading>{selectCategory?.name}</Heading>
            </Text>
          )}

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {renderProducts()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SearchResult;
