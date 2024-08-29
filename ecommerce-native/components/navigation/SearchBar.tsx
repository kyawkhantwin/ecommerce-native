import { useGetSearchedProductQuery } from "@/redux/reducer/searchApiSlice";
import { InputSlot } from "@gluestack-ui/themed";
import {
  Button,
  ButtonIcon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useState } from "react";

const SearchBar = () => {
  const [productName, setProductName] = useState("");

  const handleSearchBtn = () => {
    if (productName.length >= 1) {
      router.push("search/product/" + productName.toLowerCase());
    }
  };

  return (
    <Input
      variant="outline"
      size="md"
      alignItems="center"
      justifyContent="center"
      width={240}
      height={35}
       $light-color="white"
      $dark-color="black"

      $lg-height={40}
      $lg-width={500}
      marginHorizontal={0}
    >
      <InputField
        $light-color="white"
      $dark-color="black"
        onChangeText={(text) => setProductName(text)}
        placeholder="Search Anything You Want"
      />
      <InputSlot onPress={handleSearchBtn} marginHorizontal={5}>
        <InputIcon as={Search} />
      </InputSlot>
    </Input>
  );
};

export default SearchBar;
