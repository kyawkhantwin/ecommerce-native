import React from "react";
import {
  View,
  Text,
  Box,
  ScrollView,
  VStack,
  HStack,
  Image,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetTransactionQuery } from "@/redux/reducer/transactionsApiSlice";
import CenterSpinner from "@/components/CenterSpinner";
import HeaderWithGoback from "@/components/HeaderWithGoback";
import { useLocalSearchParams } from "expo-router";

const TransactionDetail = () => {
  const { transactionId } = useLocalSearchParams();
  const {
    data: transactionData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTransactionQuery(transactionId);
  let transaction;
  if (isSuccess) {
    transaction = Object.values(transactionData?.entities)[0];
  }

  const totalSum = (productTransactions) => {
    return productTransactions.reduce((accumulator, currentTransaction) => {
      return (
        accumulator + currentTransaction.price * currentTransaction.quantity
      );
    }, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView marginHorizontal="$5" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <HeaderWithGoback header={"Detail Transaction"} />
          <HStack justifyContent="space-between" paddingRight={20}>
            <VStack>
              <Text>
                Date : {new Date(transaction?.createdAt).toLocaleDateString()}
              </Text>
              <Text>
                Time : {new Date(transaction?.createdAt).toLocaleTimeString()}
              </Text>
            </VStack>
            <Text fontWeight="bold">User: {transaction?.user?.username}</Text>
          </HStack>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          />
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
                Product
              </Text>
              <Text flex={1} fontWeight="bold">
                Price
              </Text>
            </Box>
            {isSuccess && (
              <>
                {transaction.order.productOrders.map((productOrder) => (
                  <Box
                    key={productOrder.product.id}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottomWidth={1}
                    borderBottomColor="#eee"
                    py="$2"
                  >
                    <Image
                      alt={productOrder.product.title}
                      source={{ uri: productOrder.product.images[0] }}
                      style={{ flex: 1, resizeMode: "cover" }}
                    />
                    <Text flex={1}>{productOrder.product.title}</Text>
                    <Text flex={1}>{productOrder.product.price} MMK</Text>
                  </Box>
                ))}
                <HStack paddingRight={20} marginTop={10}>
                  <Text flex={1} fontSize="$lg" fontWeight="bold">
                    Total Price:
                  </Text>
                  <Text fontSize="$lg" fontWeight="bold">
                    {totalSum(transaction.order.productOrders)} MMK
                  </Text>
                </HStack>
              </>
            )}
            {isLoading && <CenterSpinner />}
            {isError && <Text>Error occurred</Text>}
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDetail;
