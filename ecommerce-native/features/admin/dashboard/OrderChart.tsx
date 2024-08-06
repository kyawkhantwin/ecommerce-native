import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { useGetOrdersQuery } from "@/redux/reducer/ordersApiSlice";
import { Heading } from "@gluestack-ui/themed";

const OrderChart = () => {
  const {
    data: orderData,
    isSuccess,
    isError,
    isLoading,
  } = useGetOrdersQuery();

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
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

  return (
    <View>
      <Heading>Last 6 Months Orders</Heading>
      <LineChart
        data={chartData}
        width={500}
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
    </View>
  );
};

export default OrderChart;
