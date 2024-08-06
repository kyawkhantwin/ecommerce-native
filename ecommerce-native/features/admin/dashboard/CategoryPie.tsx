import React from "react";
import { useGetCategoriesQuery } from "@/redux/reducer/categoriresApiSlice";
import { PieChart } from "react-native-chart-kit";
import { Heading, View } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CategoryPie = () => {
  const { data: categoriesData, isSuccess, isError } = useGetCategoriesQuery();
  const categories = categoriesData
    ? Object.values(categoriesData.entities)
    : [];

  console.log(categories);

  const categoriesPieChartData = categories.map((category) => ({
    name: category.name,
    total: category.total,
    color: getRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View flex={1} >
      <Heading >Categories Pie Chart</Heading>
      {isError && <Text>Error loading categories</Text>}
      {!isSuccess && <Text>Loading...</Text>}
      {isSuccess && (
        <PieChart
          data={categoriesPieChartData}
          width={500}
          height={220}
          chartConfig={chartConfig}
          accessor={"total"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[5, 5]}
          absolute
        />
      )}
    </View>
  );
};

export default CategoryPie;
