import React from "react";
import {
  View,
  Text,
  Box,
  Button,
  ScrollView,
  VStack,
  Heading,
  ButtonIcon,
  HStack,
  Image,
  Spinner,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetOrderQuery } from "@/redux/reducer/ordersApiSlice";
import HeaderWithGoback from "@/components/HeaderWithGoback";
import CenterSpinner from "@/components/CenterSpinner";
import { useLocalSearchParams } from "expo-router";

const OrderDetail = () => {
  const { orderId } = useLocalSearchParams();
  const { data: orderData, isLoading, isSuccess } = useGetOrderQuery(orderId);

  let order = [];
  if (isSuccess) {
    order = Object.values(orderData?.entities)[0];
  }

  // Remove if you want to handle in detail
  // const handleTransaction = async (
  //   orderId: number,
  //   userId: number,
  //   total: number
  // ) => {
  //   await createTransaction({ orderId, userId, total });
  //   if (TransactionSuccess) {
  //     console.log("Transaction created");
  //   }
  // };
  // const [createTransaction, { isSuccess: TransactionSucces }] =
  //   useCreateTransactionMutation();

  const totalSum = (productOrders) => {
    return productOrders.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder.price * currentOrder.quantity;
    }, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView marginHorizontal="$5" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <HeaderWithGoback header={"Order Detail"} />

          <HStack justifyContent="space-between" paddingRight={20}>
            <VStack>
              <Text>
                Date : {new Date(order?.createdAt).toLocaleDateString()}
              </Text>
              <Text>
                Time : {new Date(order?.createdAt).toLocaleTimeString()}
              </Text>
            </VStack>
            <Text fontWeight="bold">User: {order?.user?.username}</Text>
          </HStack>
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
                Image
              </Text>

              <Text flex={1} fontWeight="bold">
                Product
              </Text>
              <Text flex={1} fontWeight="bold">
                Price
              </Text>
            </Box>
            {isLoading && <CenterSpinner />}
            {isSuccess && (
              <>
              
                  {order.productOrders.map((productOrder) => (
                    <Box
                    key={order.id}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottomWidth={1}
                    borderBottomColor="#eee"
                    py="$2"
                  >
                      <Image
                        source={{ uri: productOrder.product.images[0] }}
                        style={{ flex: 1, resizeMode: "cover" }}
                      />

                      <Text key={productOrder.product.id} flex={1}>
                        {productOrder.product.title}
                      </Text>
                      <Text key={productOrder.product.id} flex={1}>
                        {productOrder.product.price}
                      </Text>
                </Box>
                  ))}

                  {/* <Box flexDirection="row" alignItems="center" flex={1}>
                  <Button
                    p="$3"
                    onPress={() =>
                      handleTransaction(
                        order.id,
                        order.userId,
                        totalSum(order.productOrders)
                      )
                    }
                    variant="link"
                  >
                    <ButtonIcon as={Check} />
                  </Button>
                </Box> */}

                <HStack paddingRight={20} marginTop={10}>
                  <Text flex={1} fontSize="$lg" fontWeight="bold">
                    Total Price:
                  </Text>
                  <Text fontSize="$lg" fontWeight="bold">
                    {totalSum(order.productOrders)}MMK
                  </Text>
                </HStack>
              </>
            )}
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;
