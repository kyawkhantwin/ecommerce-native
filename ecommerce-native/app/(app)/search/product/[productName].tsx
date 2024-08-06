import PlaceHolder from "@/components/PlaceHolder";
import ProductCard from "@/components/ProductCard";
import NavBar from "@/features/navBar/NavBar";
import { useGetSearchedProductQuery } from "@/redux/reducer/searchApiSlice";
import { Heading, Spinner, Text } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { SafeAreaView } from "react-native-safe-area-context";

const SearchResult = () => {
  const localParams = useLocalSearchParams();
  const {
    data: searchedProductData,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetSearchedProductQuery(localParams.productName);

  let searchedProduct = [];

  const renderProducts = () => {
    if (isSuccess) {
      searchedProduct = Object.values(searchedProductData?.entities);
      return searchedProduct.length !== 0 ? (
        searchedProduct.map((item, index) => (
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
    } else if (isError) {
      return (
        <PlaceHolder message={` ${error?.data?.message || error.status}`} />
      );
    } else if (isLoading) {
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
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        {Platform.OS !== "web" && <NavBar />}

        <ScrollView>
          <Text marginTop={10}>
            Found {searchedProductData?.ids?.length} Result for{" "}
            <Heading>{localParams.productName}</Heading>
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {renderProducts()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SearchResult;
