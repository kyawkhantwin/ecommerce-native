import React, { useEffect, useState } from "react";
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
  Heading,
  ButtonIcon,
  ButtonSpinner,
  ScrollView,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { useSelector } from "react-redux";
import {
  selectCategoryById,
  useUpdateCategoryMutation,
} from "@/redux/reducer/categoriresApiSlice";
import useShowToast from "@/components/toast/ShowToast";
import { useLocalSearchParams, useNavigation } from "expo-router";

const EditCategory = () => {
  const navigation = useNavigation();
  const showToast = useShowToast();
  const { categoryId } = useLocalSearchParams();
  const category = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );

  const [categoryName, setCategoryName] = useState(category.name);
  const [selectedImage, setSelectedImage] = useState(category.image || null);

  const [updateCategory, { isLoading, isError, isSuccess, error }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      showToast("success", "Edit Category Success");
      navigation.navigate("category-list");
    }

    if (isError) {
      showToast("error", error?.data?.message || "Edit Category Fail");
    }
  }, [isLoading, isSuccess, isError, error]);

  const handleImagePicker = async () => {
    const options = {
      mediaType: "photo",
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    };

    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    await updateCategory({
      id: categoryId,
      name: categoryName,
      image: selectedImage,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" marginHorizontal="$5">
          <Heading>Edit Category</Heading>
          <Box
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button onPress={() => navigation.navigate("category-list")} mr={5}>
              <ButtonText>List Category</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate("category-create")}>
              <ButtonText>Create Category</ButtonText>
            </Button>
          </Box>
          <Box w="$full" marginVertical="$4">
            <FormControl w="$full">
              <VStack
                space="lg"
                w="$full"
                display="flex"
                justifyContent="space-between"
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Category Name</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Category Name"
                    value={categoryName}
                    onChangeText={setCategoryName}
                  />
                </Input>
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Category Image</FormControlLabelText>
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
                    {isLoading && <ButtonSpinner mr={4} />}
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </View>
                {selectedImage && (
                  <Box mt="$2">
                    <Image
                      source={{ uri: selectedImage }}
                      style={{ width: 150, height: 200 }}
                    />
                  </Box>
                )}
              </VStack>
            </FormControl>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCategory;
