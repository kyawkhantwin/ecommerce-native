import {
  HStack,
  Heading,
  Icon,
  TextareaInput,
  Textarea,
  VStack,
} from "@gluestack-ui/themed";
import { Send } from "lucide-react-native";

const FeedBackTabSetting = () => {
  return (
    <VStack space="md">
      <Heading>FeedBack</Heading>
      <Textarea
        paddingHorizontal="$5"
        display="flex"
        justifyContent="center"
        size="md"
      >
        <HStack>
          <TextareaInput flex={1} placeholder="Your text goes here..." />
          <Icon as={Send} alignSelf="center" size="lg" color="$blue400" />
        </HStack>
      </Textarea>
    </VStack>
  );
};

export default FeedBackTabSetting;
