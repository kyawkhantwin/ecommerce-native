import React from "react";
import { BarChart } from "react-native-chart-kit";
import { useGetUsersQuery } from "@/redux/reducer/usersApiSlice";
import { Heading, View } from "@gluestack-ui/themed";

const UserBar = () => {
  const { data: userData, isSuccess } = useGetUsersQuery();

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
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View>
      <Heading>New Users Over the Last 5 Months</Heading>
      <BarChart
        style={{ marginVertical: 8, borderRadius: 16 }}
        data={chartData}
        width={1000}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default UserBar;
