import React from "react";
import { Heading, View, Text, Spinner, ScrollView } from "@gluestack-ui/themed";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  useGetProductsQuery,
} from "../../redux/reducer/productsApiSlice";
import PlaceHolder from "@/components/PlaceHolder";

const ProductsForYou: React.FC = () => {
  const { isSuccess, isError, isLoading, error } = useGetProductsQuery();
  const selectAllProduct = useSelector(selectAllProducts);

  const renderProducts = () => {
    if (isSuccess) {
      return selectAllProduct.length !== 0 ? (
        selectAllProduct.map((item, index) => (
          <ProductCard
            productId={item.id}
            forKey={index}
            name={item.title}
            price={item.price}
            image={item.images[0]}
          />
        ))
      ) : (
        <PlaceHolder message={` No Product Found`} />
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
    <View style={{ flex: 1 }}>
      <Heading marginTop={10}>Products For You </Heading>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {renderProducts()}
      </View>
    </View>
  );
};

export default ProductsForYou;
