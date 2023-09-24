import { Button, Stack, Text, View, XStack, YStack } from "tamagui";
import { ColorPallate } from "../../customization/custom";

export const SignIn = ({ navigation }) => {
  const changeScreen = () => {
    navigation.navigate("PriavteKey");
  };

  return (
    <XStack flex={1} >
      <YStack flex={1} justifyContent="center" >
        <XStack padding={16} justifyContent="center" alignItems="center">
          <YStack justifyContent="center" alignItems="center">
            <Button onPress={changeScreen}> Create New Wallet</Button>
            <Text color={ColorPallate.NeutralColor} > Or</Text>
            <Button onPress={changeScreen}> Use Existing Wallet</Button>
          </YStack>
        </XStack>
      </YStack>
    </XStack>
  );
};
