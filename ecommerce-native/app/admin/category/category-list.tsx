import React, { useState, useEffect } from "react";
import {
  View,
  Box,
  Button,
  ScrollView,
  VStack,
  Heading,
  ButtonText,
  ButtonIcon,
  Image,
  Text,
  Spinner,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pencil, Trash2 } from "lucide-react-native";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/reducer/categoriresApiSlice";
import CenterSpinner from "@/components/CenterSpinner";
import useShowToast from "@/components/toast/ShowToast";
import { useNavigation } from "expo-router";

const Categories = () => {
  const navigation = useNavigation();
  const showToast = useShowToast();
  const [deletingId, setDeletingId] = useState(null);
  const categories = useSelector(selectAllCategories);

  const {
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const [
    deleteCategory,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      error: deleteError,
    },
  ] = useDeleteCategoryMutation();

  const handleUpdate = (id) => {
    navigation.navigate("category-edit/[categoryId]", { categoryId: id });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteCategory({ id });
    setDeletingId(null);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      showToast("warning", "Delete Category Success");
    }
    if (isDeleteError) {
      showToast("error", deleteError?.data?.message || "Delete Category Fail");
    }
  }, [isDeleteSuccess, isDeleteError, deleteError]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView marginHorizontal="$5"
       showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <Heading>Category List</Heading>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Button onPress={() => navigation.navigate("category-create")}>
              <ButtonText>Create Category</ButtonText>
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
                Name
              </Text>
              <Text flex={1} fontWeight="bold">
                Actions
              </Text>
            </Box>
            {isCategoriesSuccess &&
              categories.map((category) => (
                <Box
                  key={category.id}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="#eee"
                  py="$2"
                >
                  <Image
                    alt={category.name}
                    source={
                      category.image ||
                      "https://i.pinimg.com/736x/eb/a3/7b/eba37b304f19d2c6e01c44390950d216.jpg"
                    }
                    resizeMode="cover"
                    style={{ flex: 1, height: 50 }}
                  />
                  <Text flex={1}>{category.name}</Text>
                  <Box flexDirection="row" alignItems="center" flex={1}>
                    <Button
                      p="$3"
                      variant="link"
                      onPress={() => handleUpdate(category.id)}
                    >
                      <ButtonIcon as={Pencil} />
                    </Button>
                    <Button
                      p="$3"
                      onPress={() => handleDelete(category.id)}
                      variant="link"
                      action="negative"
                    >
                      <ButtonIcon
                        as={
                          isDeleteLoading && deletingId === category.id
                            ? Spinner
                            : Trash2
                        }
                      />
                    </Button>
                  </Box>
                </Box>
              ))}
            {isCategoriesLoading && <CenterSpinner />}
            {isCategoriesError && (
              <Text>
                Error loading categories: {categoriesError?.data?.message}
              </Text>
            )}
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
