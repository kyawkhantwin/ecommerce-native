import React from "react";
import { useGetCategoriesQuery } from "@/redux/reducer/categoriresApiSlice";
import { PieChart } from "react-native-chart-kit";
import { Heading, View, Text } from "@gluestack-ui/themed";
import { useMediaQuery } from "react-responsive";

// Function to generate random colors for pie chart slices
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

  // Map categories to the format required by PieChart
  const categoriesPieChartData = categories.map((category) => ({
    name: category.name,
    total: category.total,
    color: getRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundGradientFrom: "#FF5722", 
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFC107", 
    backgroundGradientToOpacity: 1,
    color: () => `#1976D2`, 
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      stroke: '#BDBDBD', 
    },
    propsForLabels: {
      fontSize: 14,
      fontFamily: 'Arial', 
      fill: '#FFFFFF',
    },
  };
  
  
  
  
  
  

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });


  return (
    <View
      flex={1}
      width={ isLargeScreen ? 500 : 380} // Set width based on screen size
    >
      <Heading>Categories Pie Chart</Heading>
      {isError && <Text>Error loading categories</Text>}
      {!isSuccess && <Text>Loading...</Text>}
      {isSuccess && (
        <PieChart
          data={categoriesPieChartData}
          width={ isLargeScreen ? 500 : 380} // Set width based on screen size
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
