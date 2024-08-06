import React, { useState } from "react";
import { VStack, Text, Button, ButtonText, HStack } from "@gluestack-ui/themed";
import PaymentDiallog from "./PaymentDiallog";
import { useCreateOrderMutation } from "@/redux/reducer/ordersApiSlice";
import useShowToast from "@/components/toast/ShowToast";
import { router } from "expo-router";

interface PaymentProps {
  cartId: number;
  userId: number;
}

const Payment: React.FC<PaymentProps> = ({ cartId, userId }) => {
  const showToast = useShowToast();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const [createOrder, isSuccess, isError, error] = useCreateOrderMutation();

  const handlePayment = async () => {
    setIsPaymentSuccessful(true);
    setShowAlertDialog(true);
    await createOrder({ cartId, userId });

    if (isSuccess) {
      showToast("success", "Checkout success");
      router.push("/");
    }
    if (isError) {
      showToast("success", error?.data?.messge || "Checkout fail");
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <VStack space="md">
      <VStack space="md">
        <Text>Select Payment Method:</Text>
        <HStack space="md" alignSelf="center">
          <Button
            variant={paymentMethod === "credit" ? "solid" : "outline"}
            onPress={() => handlePaymentMethodChange("credit")}
          >
            <ButtonText>Credit Card</ButtonText>
          </Button>
          <Button
            variant={paymentMethod === "paypal" ? "solid" : "outline"}
            onPress={() => handlePaymentMethodChange("paypal")}
          >
            <ButtonText>PayPal</ButtonText>
          </Button>
          <Button
            variant={paymentMethod === "cod" ? "solid" : "outline"}
            onPress={() => handlePaymentMethodChange("cod")}
          >
            <ButtonText>COD</ButtonText>
          </Button>
        </HStack>
      </VStack>

      <Button onPress={handlePayment} isDisabled={paymentMethod === ""}>
        <ButtonText>{isPaymentSuccessful ? "Done" : "Order Now"}</ButtonText>
      </Button>

      {/* Pass props to PaymentDiallog component */}
      <PaymentDiallog
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
        isPaymentSuccessful={isPaymentSuccessful}
        setIsPaymentSuccessful={setIsPaymentSuccessful}
      />
    </VStack>
  );
};

export default Payment;
