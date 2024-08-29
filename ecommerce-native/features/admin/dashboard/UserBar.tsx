import React from "react";
import { BarChart } from "react-native-chart-kit";
import { useGetUsersQuery } from "@/redux/reducer/usersApiSlice";
import { Heading, View } from "@gluestack-ui/themed";
import { useMediaQuery } from "react-responsive";
import { Text } from "@gluestack-ui/themed";

const UserBar = () => {
  const { data: userData, isSuccess, isError, isLoading } = useGetUsersQuery();

  const getLastFiveMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setMonth(now.getMonth() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      months.push(`${year}-${month}`);
    }
    return months;
  };

  const getChartData = (users) => {
    if (!users) return { labels: [], datasets: [{ data: [] }] };

    const lastFiveMonths = getLastFiveMonths();
    const counts = {};

    lastFiveMonths.forEach((month) => (counts[month] = 0));

    users.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const year = createdAt.getFullYear();
      const month = String(createdAt.getMonth() + 1).padStart(2, "0");
      const key = `${year}-${month}`;

      if (lastFiveMonths.includes(key)) {
        counts[key]++;
      }
    });

    const labels = lastFiveMonths;
    const data = lastFiveMonths.map((month) => counts[month]);

    return {
      labels,
      datasets: [{ data }],
    };
  };

  const chartData = isSuccess
    ? getChartData(Object.values(userData.entities))
    : { labels: [], datasets: [{ data: [] }] };

    const chartConfig = {
      backgroundGradientFrom: "#FF6F00",
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: "#FFAB00",
      backgroundGradientToOpacity: 1,
      color: () => `#000000`,
      strokeWidth: 2,
      barPercentage: 0.7,
      useShadowColorFromDataset: false,
      propsForBackgroundLines: {
        stroke: '#FFFFFF',
      },
      propsForHorizontalLabels: {
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#FFFFFF',
      },
      propsForVerticalLabels: {
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#FFFFFF',
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#000000",
      },
     
    };
    
    
    
    
    

  // Media queries for different screen sizes
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });

  // Define chart width based on screen size

  return (
    <View w={ isLargeScreen ? 800 : 380} h={400}>
      <Heading>New Users Over the Last 5 Months</Heading>
      {isError && <Text>Error loading users</Text>}
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <BarChart

          style={{ marginVertical: 8, borderRadius: 16 }}
          data={chartData}
          width={  isLargeScreen ? 800 : 380}
          height={300}
          yAxisLabel=""
          yAxisSuffix=""
      showValuesOnTopOfBars={true}
      fromZero={true}
      withInnerLines={true}
        
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      )}
    </View>
  );
};

export default UserBar;
