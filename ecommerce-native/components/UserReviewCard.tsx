import React from "react";
import {
  Avatar,
  HStack,
  Heading,
  Text,
  VStack,
  Card,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

const UserReviewCard = ({ user, review, rating }) => {
  return (
    <Card size="md" variant="outline" m="$2">
      <VStack space="md" display="flex" flexDirection="row" alignItems="center">
        <Avatar bgColor="$amber600" size="md" borderRadius="$full">
          <Avatar.Image
            alt={"user"}
            source={{
              uri:
                user?.image ||
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </Avatar>

        <VStack space="xs">
          <Heading size="xs">{user.username}</Heading>
          <HStack space="xs">
            {[1, 2, 3, 4, 5].map((value) => (
              <Ionicons
                size={15}
                style={{ marginBottom: -3 }}
                name="star"
                color={value <= rating ? "yellow" : "gray"}
              />
            ))}
          </HStack>
        </VStack>
      </VStack>
      <Text marginTop="$3">{review}</Text>
    </Card>
  );
};

export default UserReviewCard;
