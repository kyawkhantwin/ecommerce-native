import React from "react";
import { LineChart } from "react-native-chart-kit";
import { useGetOrdersQuery } from "@/redux/reducer/ordersApiSlice";
import { Heading, View, Text } from "@gluestack-ui/themed";
import { useMediaQuery } from "react-responsive";

const OrderChart = () => {
  const {
    data: orderData,
    isSuccess,
    isError,
    isLoading,
  } = useGetOrdersQuery();

  const chartConfig = {
    backgroundGradientFrom: "#FF6F00",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFAB00",
    backgroundGradientToOpacity: 1,
    color: () => `#000000`,
    strokeWidth: 2,
    barPercentage: 0.5,
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
  

  const getLastFiveMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(now.getMonth() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      months.push(`${year}-${month}`);
    }
    return months;
  };

  const getChartData = (orders) => {
    if (!orders) return { labels: [], datasets: [{ data: [] }] };

    const lastFiveMonths = getLastFiveMonths();
    const counts = {};

    lastFiveMonths.forEach((month) => (counts[month] = 0));

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
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
    ? getChartData(Object.values(orderData.entities))
    : { labels: [], datasets: [{ data: [] }] };

  // Media queries
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });


  return (
    <View
      width={  isLargeScreen ? 500 : 380}
      flex={1}
    >
      <Heading>Last 6 Months Orders</Heading>
      {isError && <Text>Error loading orders</Text>}
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <LineChart
          data={chartData}
          width={  isLargeScreen ? 500 : 380} 
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default OrderChart;
