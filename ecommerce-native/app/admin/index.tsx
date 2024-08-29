import React from "react";
import {
  ScrollView,
  VStack,
  Heading,
  View,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetOrdersQuery } from "@/redux/reducer/ordersApiSlice";
import { useGetUsersQuery } from "@/redux/reducer/usersApiSlice";
import { useGetProductsQuery } from "@/redux/reducer/productsApiSlice";
import { useGetTransactionsQuery } from "@/redux/reducer/transactionsApiSlice";
import CardContainer from "@/features/admin/dashboard/CardContainer";
import CategoryPie from "@/features/admin/dashboard/CategoryPie";
import { Dimensions } from "react-native";
import OrderChart from "@/features/admin/dashboard/OrderChart";
import UserBar from "@/features/admin/dashboard/UserBar";

const Dashboard: React.FC = () => {
  const {
    data: ordersData,
    isSuccess: ordersSuccess,
    isError: ordersError,
    isLoading: ordersLoading,
  } = useGetOrdersQuery();

  const { data: usersData, isSuccess: usersSuccess } = useGetUsersQuery();
  const { data: productsData, isSuccess: productsSuccess } =
    useGetProductsQuery();
  const { data: transactionsData, isSuccess: transactionsSuccess } =
    useGetTransactionsQuery();

  const orders = ordersData ? Object.values(ordersData.entities) : [];
  const users = usersData ? Object.values(usersData.entities) : [];
  const products = productsData ? Object.values(productsData.entities) : [];
  const transactions = transactionsData
    ? Object.values(transactionsData.entities)
    : [];
  const totalSale = transactions.reduce((acc, tran) => acc + tran.total, 0);
  const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const completedOrders = orders.filter((order) => order.status === "DONE");

  const { width: deviceWidth } = Dimensions.get("window");
  const isSmallDevice = deviceWidth < 600; // Consider it a small device if width is less than 600px

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack space="lg" alignItems="center">
          <Heading>E-Commerce Dashboard</Heading>
          <CardContainer
            totalProducts={products.length}
            totalSale={totalSale}
            totalUsers={users.length}
            pendingOrders={pendingOrders.length}
            completedOrders={completedOrders.length}
          />
          <View
            display="flex"
            width="100%"
            padding="$1"
            flexWrap="wrap"
            flexDirection={isSmallDevice ? "column" : "row"} // Adjust direction based on device size
            justifyContent="space-between"
            gap="$1"
          >
            <View flex={1} minWidth={isSmallDevice ? "100%" : 300} maxWidth={800}>
              <CategoryPie />
            </View>
            <View flex={1} minWidth={isSmallDevice ? "100%" : 300} maxWidth={800}>
              <OrderChart />
            </View>
          </View>
          <View width="100%" padding="$1">
            <UserBar />
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
