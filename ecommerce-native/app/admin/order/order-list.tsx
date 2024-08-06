import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Box,
  Button,
  ScrollView,
  VStack,
  Heading,
  ButtonIcon,
  Spinner,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check, Info } from "lucide-react-native";
import { useGetOrdersQuery } from "../../../redux/reducer/ordersApiSlice";
import { useCreateTransactionMutation } from "../../../redux/reducer/transactionsApiSlice";
import CenterSpinner from "@/components/CenterSpinner";
import useShowToast from "@/components/toast/ShowToast";
import { useNavigation } from "expo-router";
import PlaceHolder from "@/components/PlaceHolder";

const Order = () => {
  const navigation = useNavigation();
  const showToast = useShowToast();
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isSuccess: isOrdersSuccess,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrdersQuery("pending");

  const [
    createTransaction,
    {
      isSuccess: isTransactionSuccess,
      isError: isTransactionError,
      error: transactionError,
      isLoading: isTransactionLoading,
    },
  ] = useCreateTransactionMutation();

  const [processingOrderId, setProcessingOrderId] = useState(null);

  let orders = [];
  if (ordersData && ordersData.entities) {
    orders = Object.values(ordersData.entities);
  }

  const handleTransaction = async (orderId, userId, total) => {
    setProcessingOrderId(orderId);
    await createTransaction({ orderId, userId, total });
    setProcessingOrderId(null);
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      showToast("success", "Transaction created successfully");
    } else if (isTransactionError) {
      showToast(
        "error",
        transactionError?.data?.message || "Create Transaction Fail"
      );
    }
  }, [isTransactionSuccess, isTransactionError, transactionError]);

  const handleDetails = (id) => {
    navigation.navigate("order-detail/[orderId]", { orderId: id });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView marginHorizontal="$5" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <Heading>Order List</Heading>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          ></Box>
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
                Date
              </Text>
              <Text flex={1} fontWeight="bold">
                User
              </Text>
              <Text flex={1} fontWeight="bold">
                Product
              </Text>
              <Text flex={1} fontWeight="bold">
                Amount
              </Text>
              <Text flex={1} fontWeight="bold">
                Actions
              </Text>
            </Box>
            {isOrdersLoading && <CenterSpinner />}
            {isOrdersSuccess &&
              orders.map((order) => (
                <Box
                  key={order.id}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="#eee"
                  py="$2"
                >
                  <VStack flex={1}>
                    <Text>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </Text>
                  </VStack>
                  <Text flex={1}>{order.user.username}</Text>
                  {order.productOrders.map((productOrder) => (
                    <>
                      <View key={productOrder.orderId} flex={1}>
                        <Text key={productOrder.product.id} flex={1}>
                          {productOrder.product.title} x {productOrder.quantity}
                        </Text>
                      </View>
                      <Text flex={1}>Total: {productOrder.price}</Text>
                      <Box flexDirection="row" alignItems="center" flex={1}>
                        <Button
                          p="$3"
                          variant="link"
                          onPress={() => handleDetails(order.id)}
                        >
                          <ButtonIcon as={Info} />
                        </Button>
                        <Button
                          p="$3"
                          onPress={() =>
                            handleTransaction(
                              order.id,
                              order.userId,
                              productOrder.price
                            )
                          }
                          variant="link"
                        >
                          <ButtonIcon
                            as={
                              isTransactionLoading &&
                              processingOrderId === order.id
                                ? Spinner
                                : Check
                            }
                          />
                        </Button>
                      </Box>
                    </>
                  ))}
                </Box>
              ))}
            {isOrdersError && (
              <PlaceHolder message={ordersError?.data?.message} />
            )}
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
