import React, { useState, useEffect } from "react";
import {
  ButtonIcon,
  FormControl,
  FormControlLabel,
  TextareaInput,
  FormControlError,
  FormControlErrorText,
  HStack,
  Textarea as GluestackTextarea, // Rename Textarea to avoid naming conflict
  InputIcon,
  FormControlErrorIcon,
  View,
  FormControlLabelText,
  Icon,
  Button,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { AlertCircleIcon, Send } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCreateReviewMutation } from "@/redux/reducer/reviewApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import useShowToast from "./toast/ShowToast";

const ReviewForm = ({ productId }) => {
  const showToast = useShowToast();
  const user = useSelector(selectCurrentUser);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [createReview, { isLoading, isError, error, isSuccess }] =
    useCreateReviewMutation();

  useEffect(() => {
    if (isError) {
      showToast("error", error?.data?.message || "An error occurred");
    }
    if (isSuccess) {
      showToast("success", "Review Added");
    }
  }, [isError, isSuccess]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (review.length < 6) {
      showToast("error", "Comment needs to be longer than 6 letters");
    } else {
      await createReview({ review, rating, userId: user.id, productId });
    }
  };

  return (
    <View>
      <FormControl
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel mb="$1">
          <FormControlLabelText>Write Review</FormControlLabelText>
        </FormControlLabel>

        <HStack space="xs" marginVertical={5}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              variant="link"
              onPress={() => handleRating(value)}
              key={value}
            >
              <Ionicons
                size={28}
                style={{ marginBottom: -3 }}
                name="star"
                color={value <= rating ? "yellow" : "gray"}
              />
            </Button>
          ))}
        </HStack>

        <GluestackTextarea
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
          w="$full"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          paddingHorizontal={20}
        >
          <TextareaInput
            m={0}
            p={0}
            placeholder="Add Review"
            value={review}
            onChangeText={setReview}
          />

          <Button
            onPress={handleSubmit}
            variant="link"
            disabled={review.length < 6 || rating === 0}
            $disabled-color="$gray500"
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <ButtonIcon
                as={Send}
                size="xl"
                color="$cyan500"
                $hover-color="$green900"
                $pressed-color="$red300"
              />
            )}
          </Button>
        </GluestackTextarea>

        {review.length < 6 && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </View>
  );
};

export default ReviewForm;
