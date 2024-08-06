import React from "react";
import {
  HStack,
  Heading,
  ScrollView,
  Spinner,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  useGetProductsQuery,
} from "../../redux/reducer/productsApiSlice";
import ProductCard from "@/components/ProductCard";
import PlaceHolder from "@/components/PlaceHolder";

const PopularProducts: React.FC = () => {
  const { isLoading, isError, isSuccess, error } = useGetProductsQuery();

  const selectPopularProduct = useSelector(selectAllProducts);

  const renderProducts = () => {
    return selectPopularProduct.length !== 0 ? (
      selectPopularProduct.map((item, index) => (
        <ProductCard
          productId={item.id}
          forKey={index + 100}
          name={item.title}
          price={item.price}
          image={item.images[0]}
        />
      ))
    ) : (
      <PlaceHolder message={"No Product Found"} />
    );
  };

  return (
    <View marginTop={10}>
      <Heading>Popular Products</Heading>
      {isLoading && (
        <View
          height={180}
          width="$full"
          display="flex"
          mx="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="large" />
        </View>
      )}
      {isSuccess && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <HStack
            space="md"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            {renderProducts()}
          </HStack>
        </ScrollView>
      )}
      {isError && (
        <PlaceHolder message={`${error?.data?.message || error.status}`} />
      )}
    </View>
  );
};

export default PopularProducts;
