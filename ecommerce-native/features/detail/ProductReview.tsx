import React from "react";
import { Heading, VStack, View } from "@gluestack-ui/themed";
import UserReviewCard from "@/components/UserReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { useGetReviewQuery } from "@/redux/reducer/reviewApiSlice";
import { User } from "lucide-react-native";
import PlaceHolder from "@/components/PlaceHolder";
import CenterSpinner from "@/components/CenterSpinner";

const ProductReview = ({ productId }) => {
  const {
    data: reviewData,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetReviewQuery(productId);

  let reviews = [];

  const renderReview = () => {
    if (isSuccess) {
      reviews = Object.values(reviewData.entities);
      return reviews.map((review) => {
        return (
          <UserReviewCard
            user={review.user}
            review={review.review}
            rating={review.rating}
          />
        );
      });
    }
    if (isError) {
      <PlaceHolder message={error?.data?.message || "Internal Server Error"} />;
    }
    if (isLoading) {
      <CenterSpinner />;
    }
  };
  return (
    <View>
      <Heading>Reviews</Heading>
      <VStack marginTop="$4"></VStack>
      {renderReview()}
      <ReviewForm productId={productId} />
    </View>
  );
};

export default ProductReview;
