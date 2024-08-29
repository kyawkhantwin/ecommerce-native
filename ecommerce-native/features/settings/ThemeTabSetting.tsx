import React, { useEffect, useState } from "react";
import {
  Avatar,
  VStack,
  HStack,
  Text,
  ButtonIcon,
  Heading,
  RadioGroup,
  Radio,
  RadioIcon,
  RadioIndicator,
  Icon,
  CircleIcon,
} from "@gluestack-ui/themed";
import { ChevronRight, Sun, Moon } from "lucide-react-native";
import { Appearance } from "react-native";

const ThemeTabSetting: React.FC = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const appearanceSubscription = Appearance.addChangeListener(
      ({ colorScheme }) => {
        setColorScheme(colorScheme);
      }
    );
    return () => appearanceSubscription.remove();
  }, []);

  useEffect(() => {
  }, [colorScheme]);

  return (
    <VStack space="md">
      <Heading>Theme</Heading>
      <RadioGroup
        value={colorScheme || undefined}
        onChange={(value) => {
          Appearance.setColorScheme(value);
        }}
      >
        <VStack space="xl">
          <HStack space="md">
            <Icon as={Sun} color="$yellow700" size="xl" />
            <Text flex={1}>Light Mode</Text>
            <Radio value="light" size="md">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} strokeWidth={1} />
              </RadioIndicator>
            </Radio>
          </HStack>
          <HStack space="md">
            <Icon as={Moon} color="$purple400" size="xl" />
            <Text flex={1}>Dark Mode</Text>
            <Radio value="dark" size="md">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} strokeWidth={1} />
              </RadioIndicator>
            </Radio>
          </HStack>
        </VStack>
      </RadioGroup>
    </VStack>
  );
};

export default ThemeTabSetting;
