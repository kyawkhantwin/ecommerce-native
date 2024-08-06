import { selectCurrentUser, updateAuthUser } from "@/redux/auth/authSlice";
import { useUpdateUserMutation } from "@/redux/reducer/usersApiSlice";
import {
  Button,
  ButtonText,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogCloseButton,
  Icon,
  CloseIcon,
  InputField,
  Input,
  AlertDialog,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useShowToast from "./toast/ShowToast";

interface UserDialogueProps {
  title: string;
  setShowAlertDialog: any;
  showAlertDialog: any;
}

const UserDialogue: FC<UserDialogueProps> = ({ title, setShowAlertDialog }) => {
  const showToast = useShowToast();
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const initialFieldValue = () => {
    if (title.toLowerCase() === "location") {
      return currentUser.location;
    } else if (title.toLowerCase() === "username") {
      return currentUser.username;
    } else {
      return currentUser.email;
    }
  };

  const [value, setValue] = useState(initialFieldValue);

  useEffect(() => {
    if (isSuccess) {
      showToast("success", `${title} update success`);
      dispatch(updateAuthUser({ [title.toLowerCase()]: value }));
      setShowAlertDialog(false);
    }
    if (isError) {
      showToast("error", error?.data?.message || `${title} update fail`);
    }
  }, [isSuccess, isError, error]);

  const handleUpdateUser = async () => {
    await updateUser({ id: currentUser.id, [title.toLowerCase()]: value });
  };

  return (
    <AlertDialog
      isOpen={true}
      onClose={() => {
        setShowAlertDialog(false);
      }}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">Change {title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              value={value}
              placeholder={`Change ${title}`}
              onChangeText={(text) => setValue(text)}
            />
          </Input>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            variant="outline"
            action="secondary"
            marginRight="$3"
            onPress={() => {
              setShowAlertDialog(false);
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button action="positive" onPress={handleUpdateUser}>
            {isLoading && <ButtonSpinner />}
            <ButtonText>Change {title}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDialogue;
