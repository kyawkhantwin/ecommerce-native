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
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Info } from "lucide-react-native";
import {
  selectAllTransactions,
  useGetTransactionsQuery,
} from "../../../redux/reducer/transactionsApiSlice";
import { useSelector } from "react-redux";
import CenterSpinner from "@/components/CenterSpinner";
import { useNavigation } from "expo-router";
import PlaceHolder from "@/components/PlaceHolder";

const Transaction = () => {
  const navigation = useNavigation();
  const { isSuccess, isError, isLoading, error } = useGetTransactionsQuery();
  const transactions = useSelector(selectAllTransactions);

  const handleDetails = (id) => {

    navigation.navigate("transaction-detail/[transactionId]", {
      transactionId: id,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView marginHorizontal="$5" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <Heading>Transaction List</Heading>
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
                Total
              </Text>
              <Text flex={1} fontWeight="bold">
                Actions
              </Text>
            </Box>
            {isSuccess &&
              transactions.map((transaction, i) => (
                <Box
                  key={transaction.id}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="#eee"
                  py="$2"
                >
                  <VStack flex={1}>
                    <Text>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                      {new Date(transaction.createdAt).toLocaleTimeString()}
                    </Text>
                  </VStack>
                  <Text flex={1}>{transaction.user.username}</Text>
                  <View flex={1}>
                    {transaction.order?.productOrders?.length}
                  </View>
                  <Text flex={1}>{transaction.total}</Text>
                  <Box flexDirection="row" alignItems="center" flex={1}>
                    <Button
                      p="$3"
                      variant="link"
                      onPress={() => handleDetails(transaction.id)}
                    >
                      <ButtonIcon as={Info} />
                    </Button>
                  </Box>
                </Box>
              ))}
            {isLoading && <CenterSpinner />}
            {isError && <PlaceHolder message={error?.data?.message} />}
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;
