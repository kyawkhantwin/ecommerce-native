import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Box,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
  FormControlLabelText,
  Button,
  Image,
  ButtonText,
  VStack,
  HStack,
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  ButtonSpinner,
  ScrollView,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import {
  selectProductById,
  useUpdateProductMutation,
} from "@/redux/reducer/productsApiSlice";
import { useSelector } from "react-redux";
import { selectAllCategories } from "@/redux/reducer/categoriresApiSlice";
import { ChevronDownIcon } from "lucide-react-native";
import useShowToast from "@/components/toast/ShowToast";
import { useLocalSearchParams, useNavigation } from "expo-router";

const EditProduct = () => {
  const navigation = useNavigation();
  const showToast = useShowToast();
  const { productId } = useLocalSearchParams();
  const product = useSelector((state) => selectProductById(state, productId));
  const categories = useSelector(selectAllCategories);
  const [selectedImage, setSelectedImage] = useState(product.images[0] || null);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [categoryId, setCategoryId] = useState(product.category.id);
  const [thumbnail, setThumbnail] = useState(product.thumbnail);

  const [updateProduct, { isLoading, isError, error, isSuccess }] =
    useUpdateProductMutation();

  const handleImagePicker = async () => {
    const options = {
      mediaType: "photo",
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    };

    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        showToast(" Cancelled image picker");
      } else if (response.errorMessage) {
        showToast("ImagePicker Error: ", response.errorMessage);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    if (isError) {
      showToast("error", error?.data?.message || "Edit Prodcut Fail");
    }
    if (isSuccess) {
      showToast("success", "Edit Prodcut Success");
    }
  }, [isError, error, isSuccess]);

  const handleSubmit = async () => {
    const updatedProduct = {
      id: productId,
      detail: {
        title,
        description,
        price,
        stock,
        categoryId,
        thumbnail,
        images: [selectedImage],
      },
    };

    try {
      await updateProduct(updatedProduct).unwrap();
      navigation.navigate("product");
    } catch (err) {
      console.error("Failed to update product: ", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" marginHorizontal="$5">
          <Heading>Edit Product</Heading>
          <Box
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              onPress={() => navigation.navigate("product-create")}
              mr={5}
            >
              <ButtonText>Create Product</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate("product-list")}>
              <ButtonText>List Product</ButtonText>
            </Button>
          </Box>
          <Box w="$full" marginVertical="$4">
            <FormControl w="$full">
              <VStack w="$full" display="flex" justifyContent="space-between">
                <HStack w="$full" space="lg">
                  <VStack flex={1} space="lg">
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Title</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        placeholder="Product Title"
                        value={title}
                        onChangeText={setTitle}
                      />
                    </Input>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Description</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        placeholder="Product Description"
                        value={description}
                        onChangeText={setDescription}
                      />
                    </Input>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Price</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        placeholder="Product Price"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                      />
                    </Input>
                  </VStack>
                  <VStack flex={1} space="lg">
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Stock</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        placeholder="Product Stock"
                        keyboardType="numeric"
                        value={stock}
                        onChangeText={setStock}
                      />
                    </Input>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Category</FormControlLabelText>
                    </FormControlLabel>
                    <Select
                      selectedValue={categoryId}
                      onValueChange={setCategoryId}
                    >
                      <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Select category" />
                        <SelectIcon>
                          <ChevronDownIcon />
                        </SelectIcon>
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          {categories.map((categoryItem) => (
                            <SelectItem
                              key={categoryItem.id}
                              label={categoryItem.name}
                              value={String(categoryItem.id)}
                            />
                          ))}
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Thumbnail</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        placeholder="Thumbnail URL"
                        value={thumbnail}
                        onChangeText={setThumbnail}
                      />
                    </Input>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Images</FormControlLabelText>
                    </FormControlLabel>
                    <View
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Button onPress={handleImagePicker}>
                        <ButtonText>Select Image</ButtonText>
                      </Button>
                    </View>

                    <View
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Button onPress={handleSubmit}>
                        {isLoading && <ButtonSpinner mr={3} />}
                        <ButtonText>Edit</ButtonText>
                      </Button>
                    </View>

                    {selectedImage && (
                      <Box mt="$2">
                        <Image
                          alt={product.title}
                          source={{ uri: selectedImage }}
                          style={{ width: 150, height: 150 }}
                        />
                      </Box>
                    )}
                  </VStack>
                </HStack>
              </VStack>
            </FormControl>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;
