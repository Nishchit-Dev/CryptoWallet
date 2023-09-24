import { XStack, Text, YStack, Input, Button } from "tamagui";
import { ColorPallate } from "../../customization/custom";

export const EncryptKey = () => {
  return (
    <XStack flex={1} bg={ColorPallate.NeutralColor} p={16}>
    <XStack w="100%">

      <YStack flex={1} justifyContent="center" alignItems="center">
        <Input size={"$4"} />
        <Button>Done</Button>
      </YStack>
    </XStack>
      
      
    </XStack>
  );
};
