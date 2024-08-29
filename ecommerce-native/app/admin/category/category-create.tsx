import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
  FormControlLabelText,
  Button,
  VStack,
  Heading,
  ButtonText,
  Image,
  Text,
  ButtonSpinner,
  ScrollView,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateCategoryMutation } from "@/redux/reducer/categoriresApiSlice";
import useShowToast from "@/components/toast/ShowToast";
import { useNavigation } from "expo-router";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

const CreateCategory = () => {
  const navigation = useNavigation();
  const showToast = useShowToast();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [createCategory, { isSuccess, isError, error, isLoading }] =
    useCreateCategoryMutation();

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const resize = await manipulateAsync(
        image,
        [{ resize: { height: 400, width: 400 } }],
        {
          base64: true,
          compress: 1,
          format: SaveFormat.PNG,
        }
      );

      setImage(resize.uri);
    }
  };

  const handleSubmit = async () => {
    await createCategory({ name, image });
  };
  useEffect(() => {
    if (isSuccess) {
      showToast("success", "Create Category Success");
      navigation.navigate("category-list");
    }
    if (isError) {
      showToast("error", error?.data?.message || "Create Category Fail");
    }
  }, [isSuccess, isError, error]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" marginHorizontal="$5">
          <Heading>Create Category</Heading>

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Button onPress={() => navigation.navigate("category-list")}>
              <ButtonText>Category List </ButtonText>
            </Button>
          </Box>

          <Box w="$full" marginVertical="$4">
            <FormControl w="$full">
              <VStack w="$full" display="flex" justifyContent="space-between">
                <VStack flex={1} space="lg">
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Name</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Category Name"
                      value={name}
                      onChangeText={setName}
                    />
                  </Input>

                  <Button onPress={handleImagePicker}>
                    <ButtonText>Select Image</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </FormControl>
          </Box>
          <Button onPress={handleSubmit}>
            {isLoading && <ButtonSpinner mr={4} />}
            <ButtonText>Create Category</ButtonText>
          </Button>
          {image && (
            <Box mt="$2">
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 200 }}
              />
            </Box>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCategory;
