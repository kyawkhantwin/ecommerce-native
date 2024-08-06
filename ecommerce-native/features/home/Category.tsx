import { FlatList, View, Box, Heading } from "@gluestack-ui/themed";
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "@/redux/reducer/categoriresApiSlice";
import { useSelector } from "react-redux";
import CategoryItem from "@/components/CategoryItem";
import PlaceHolder from "@/components/PlaceHolder";

const Category: React.FC = () => {
  const { isLoading, isError, isSuccess } = useGetCategoriesQuery();
  const selectCategories = useSelector(selectAllCategories);

  return (
    <View>
      <Box width="100%">
        <Heading $light-color="$black" marginBottom="$2" $dark-color="$white">
          Category
        </Heading>
      </Box>
      <FlatList
        data={selectCategories}
        renderItem={({ item }) => (
          <CategoryItem image={item.image} name={item.name} id={item.id} />
        )}
        horizontal={true}
        contentContainerStyle={{ height: 100, paddingTop: 30 }}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<PlaceHolder message={"Empty Category "} />}
      />
    </View>
  );
};

export default Category;
