import React, { useState } from "react";
import {
  Avatar,
  VStack,
  HStack,
  Text,
  Pressable,
  Button,
  ButtonIcon,
  Icon,
} from "@gluestack-ui/themed";
import { AvatarImage } from "@gluestack-ui/themed";
import UserDialogue from "@/components/UserDialogue";
import { useUpdateUserMutation } from "@/redux/reducer/usersApiSlice";
import useShowToast from "@/components/toast/ShowToast";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { selectCurrentUser, updateAuthUser } from "@/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Map, Pen, PencilLine, User } from "lucide-react-native";

const UserTabsSetting: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [userImage, setUserImage] = useState(currentUser?.image || "");

  const [updateUser, { isSuccess, isError, isLoading, error }] =
    useUpdateUserMutation();

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;

      const resizedImage = await manipulateAsync(
        selectedImageUri,
        [{ resize: { height: 400, width: 400 } }],
        {
          base64: true,
          compress: 1,
          format: SaveFormat.PNG,
        }
      );

      setUserImage(resizedImage.uri);
      handleUpdateUserImage(resizedImage.uri);
    }
  };

  const handleUpdateUserImage = async (imageUri: string) => {
    await updateUser({ image: imageUri, id: currentUser.id });

    if (isSuccess) {
      showToast("success", "Updated User Success");
    }
    if (isError) {
      console.log("uploaded photo error", error);
      showToast("error", error + "occur");
    }
    dispatch(updateAuthUser({ image: imageUri }));
  };

  const handleShowDialog = (title: string) => {
    setDialogType(title);
    setShowAlertDialog(true);
  };

  return (
    <VStack space="lg">
      <Avatar
        position="relative"
        bgColor="$amber600"
        size="lg"
        my="$5"
        alignSelf="center"
        borderRadius="$full"
      >
        <AvatarImage
          alt="userAvatar"
          source={{
            uri: userImage,
          }}
        />

        <Button
          p="$2"
          position="absolute"
          bottom={-10}
          action="secondary"
          right={-20}
          rounded="$full"
          size="sm"
          onPress={handleImagePicker}
        >
          <ButtonIcon as={Pen} />
        </Button>
      </Avatar>
      <HStack>
        <Icon as={User} marginRight={5} $md-marginRight={10} size="lg" />

        <Text flex={1}>Username</Text>

        <HStack alignItems="center">
          <Text>{currentUser?.username}</Text>
          <Button variant="link" onPress={() => handleShowDialog("Username")}>
            <ButtonIcon as={PencilLine} marginLeft={5} $md-marginLeft={10} />
          </Button>
        </HStack>
      </HStack>
      <HStack>
        <Icon as={Mail} marginRight={5} $md-marginRight={10} size="lg" />

        <Text flex={1}>Email</Text>

        <HStack alignItems="center">
          <Text>{currentUser?.email}</Text>
          <Button variant="link" onPress={() => handleShowDialog("Email")}>
            <ButtonIcon as={PencilLine} marginLeft={5} $md-marginLeft={10} />
          </Button>
        </HStack>
      </HStack>
      <HStack>
        <Icon as={Map} marginRight={5} $md-marginRight={10} size="lg" />

        <Text flex={1}>Location</Text>
        <HStack alignItems="center">
          <Text>{currentUser?.location.substring(0, 20)}...</Text>
          <Button variant="link" onPress={() => handleShowDialog("Location")}>
            <ButtonIcon as={PencilLine} marginLeft={5} $md-marginLeft={10} />
          </Button>
        </HStack>
      </HStack>

      {showAlertDialog && (
        <UserDialogue
          title={dialogType}
          showAlertDialog={showAlertDialog}
          setShowAlertDialog={setShowAlertDialog}
        />
      )}
    </VStack>
  );
};

export default UserTabsSetting;
