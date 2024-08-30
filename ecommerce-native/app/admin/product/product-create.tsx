import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
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
  Input,
  InputField,
  ButtonText,
  ButtonSpinner,
  ScrollView,
  Alert as AlertGluestack
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectAllCategories } from "@/redux/reducer/categoriresApiSlice";
import { ChevronDownIcon } from "lucide-react-native";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "@/redux/reducer/productsApiSlice";
import * as ImagePicker from "expo-image-picker";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { useNavigation } from "expo-router";
import { Alert } from "react-native";

const CreateProduct = () => {
  const navigation = useNavigation();
  const categories = useSelector(selectAllCategories);
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [createProduct, { isError, error, isSuccess, isLoading }] =
    useCreateProductMutation();

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      const resize = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { height: 400, width: 400 } }],
        {
          base64: true,
          compress: 1,
          format: SaveFormat.PNG,
        }
      );

      setSelectedImage(resize.uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !stock || !selectedImage || !categoryId) {
      Alert.alert("Validation Failed", "Please fill in all required fields.");
      return;
    }

    if (isNaN(price) || isNaN(stock)) {
      Alert.alert("Validation Failed", "Price and Stock must be valid numbers.");
      return;
    }

    await createProduct({
      title,
      description,
      price: Number(price),
      stock: Number(stock),
      images: [selectedImage],
      thumbnail,
      categoryId: Number(categoryId),
    });
  };

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", error?.data?.message || "Failed to create product.");
    }
    if (isSuccess) {
      navigation.navigate("product-list");
    }
  }, [isSuccess, isError, error]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" marginHorizontal="$5">
          <Heading>Create Product</Heading>
          <View flexDirection="row" alignItems="center" justifyContent="flex-start">
            <Button onPress={() => navigation.navigate("product-list")}>
              <ButtonText>Product List</ButtonText>
            </Button>
          </View>

          <View w="$full" marginVertical="$4">
            <View w="$full">
              <VStack w="$full" display="flex" justifyContent="space-between">
                <HStack w="$full" space="lg">
                  <VStack flex={1} space="lg">
                    <View mb="$1">
                      <Text>Title</Text>
                    </View>
                    <Input>
                      <InputField
                        placeholder="Product Title"
                        value={title}
                        onChangeText={setTitle}
                      />
                    </Input>
                    <View mb="$1">
                      <Text>Description</Text>
                    </View>
                    <Input>
                      <InputField
                        placeholder="Product Description"
                        value={description}
                        onChangeText={setDescription}
                      />
                    </Input>
                    <View mb="$1">
                      <Text>Price</Text>
                    </View>
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
                    <View mb="$1">
                      <Text>Stock</Text>
                    </View>
                    <Input>
                      <InputField
                        placeholder="Product Stock"
                        keyboardType="numeric"
                        value={stock}
                        onChangeText={setStock}
                      />
                    </Input>
                    <View mb="$1">
                      <Text>Category</Text>
                    </View>
                    <Select onValueChange={setCategoryId}>
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
                    {/* <View mb="$1">
                      <Text>Thumbnail</Text>
                    </View> */}
                    {/* <Input>
                      <InputField
                        placeholder="Thumbnail URL"
                        value={thumbnail}
                        onChangeText={setThumbnail}
                      />
                    </Input> */}
                    <View mb="$1">
                      <Text>Images</Text>
                    </View>
                    <View flexDirection="row" alignItems="center" justifyContent="flex-start">
                      <Button onPress={handleImagePicker}>
                        <ButtonText>Select Image</ButtonText>
                      </Button>
                    </View>
                    <View flexDirection="row" justifyContent="flex-end">
                      {selectedImage && (
                        <View mt="$2" paddingHorizontal={10}>
                          <Image
                            alt={title}
                            source={{ uri: selectedImage }}
                            style={{ width: 100, height: 100 }}
                          />
                        </View>
                      )}
                      <Button onPress={handleSubmit}>
                        {isLoading && <ButtonSpinner mr={3} />}
                        <ButtonText>Create</ButtonText>
                      </Button>
                    </View>
                  </VStack>
                </HStack>
              </VStack>
            </View>
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProduct;
