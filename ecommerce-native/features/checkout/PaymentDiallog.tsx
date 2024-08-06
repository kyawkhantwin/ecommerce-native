import React from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Button,
  ButtonText,
  Icon,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { CircleX } from "lucide-react-native";

interface PaymentDialogProps {
  showAlertDialog: boolean;
  setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isPaymentSuccessful: boolean;
  setIsPaymentSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  showAlertDialog,
  setShowAlertDialog,
  isPaymentSuccessful,
  setIsPaymentSuccessful,
}) => {
  return (
    <AlertDialog
      isOpen={showAlertDialog}
      onClose={() => setShowAlertDialog(false)}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>Payment Status</Heading>
          <AlertDialogCloseButton>
            <Icon as={CircleX} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>
            {isPaymentSuccessful ? "Payment Successful!" : "Payment Failed!"}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            onPress={() => {
              setShowAlertDialog(false);
              setIsPaymentSuccessful(true);
            }}
          >
            <ButtonText>OK</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentDialog;
