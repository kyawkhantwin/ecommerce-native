import React, { useEffect, useState } from "react";
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
  Input,
  InputField,
  ButtonSpinner,
  HStack,
} from "@gluestack-ui/themed";
import { CircleX } from "lucide-react-native";
import { Alert } from "react-native";
import useShowToast from "@/components/toast/ShowToast";
import { useUpdateUserMutation } from "@/redux/reducer/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateAuthUser } from "@/redux/auth/authSlice";

interface LocationDialogProps {
  setLocationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  locationDialogOpen: boolean;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  setLocationDialogOpen,
  setLocation,
  locationDialogOpen,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const showToast = useShowToast();
  const [updateUser, { isSuccess, isError, error, isLoading }] =
    useUpdateUserMutation();
  const dispatch = useDispatch();

  const [newLocation, setNewLocation] = useState("");

  const handleCancelLocationChange = () => {
    setNewLocation("");
    setLocationDialogOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setLocation(newLocation);
      dispatch(updateAuthUser({ location: newLocation }));
      showToast("success", "Success, Location Changed");
    }
    if (isError) {
      showToast("error", "Failed, Location Changed");
      console.log(error);
    }
  }, [isSuccess, isError]);

  const handleLocationChange = async () => {
    if (newLocation === "") {
      Alert.alert("Error", "Please enter a valid location");
      return;
    }

    await updateUser({ location: newLocation, id: currentUser.id });

    setLocationDialogOpen(false);
  };

  return (
    <AlertDialog
      isOpen={locationDialogOpen}
      onClose={handleCancelLocationChange}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>Change Location</Heading>
          <AlertDialogCloseButton>
            <Icon as={CircleX} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text marginBottom={10}>Please enter your new location:</Text>
          <Input variant="outline" size="md">
            <InputField
              value={newLocation}
              onChangeText={(text) => setNewLocation(text)}
              placeholder="Enter new location"
            />
          </Input>
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack space="$md">
            <Button marginRight={10} onPress={handleCancelLocationChange}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={handleLocationChange}>
              {isLoading && <ButtonSpinner marginVertical={3} />}
              <ButtonText>Confirm</ButtonText>
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LocationDialog;
