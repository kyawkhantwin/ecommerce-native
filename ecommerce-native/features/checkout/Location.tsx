import React, { useState } from "react";
import { VStack, HStack, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationDialog from "./LocationDialog";

const Location = ({ currentUser }) => {
  const [location, setLocation] = useState(
    currentUser?.location || "303 Devon St. Seymour, IN 47274"
  );


  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  return (
    <SafeAreaView>
      <VStack marginTop={20} space="lg">
        <HStack>
          <Text>Location: </Text>
          <Text>{location}</Text>
        </HStack>
        <HStack justifyContent="flex-end" space="md">
          <Button onPress={() => setLocationDialogOpen(true)}>
            <ButtonText>Change Location</ButtonText>
          </Button>
        </HStack>
        {/* Pass props to LocationDialog component */}
        <LocationDialog
          setLocation={setLocation}
          locationDialogOpen={locationDialogOpen}
          setLocationDialogOpen={setLocationDialogOpen}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default Location;
