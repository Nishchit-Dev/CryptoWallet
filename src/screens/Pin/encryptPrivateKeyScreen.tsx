import { XStack, Text, YStack, Input, Button } from "tamagui";
import { ColorPallate } from "../../customization/custom";
import { useState } from "react";
import { StorePrivateKey } from "../../Hooks/StorePrivateKey";
export const EncryptKey = (cred ) => {
  const [pin, setPin] = useState("");
  
  const handleSubmit = () => {

    if (pin != "" || pin != null) {
      StorePrivateKey(cred, pin);
    }
  };
  return (
    <XStack
      flex={2}
      p={16}
      flexDirection="column"
      bg={ColorPallate.NeutralColor}
    >
      <YStack flex={2} justifyContent="center" alignItems="center" gap={10}>
        <YStack>
          <Text
            fontSize={26}
            color={ColorPallate.BrandColor}
            fontFamily={"InterBold"}
          >
            Password
          </Text>
          <Text fontFamily={"Inter"} color={ColorPallate.RegularColor}>
            Your private key is extremely sensitive. so to make it secure user
            need to encrypt it using a password so it wont affect if any
            security breach happens
          </Text>
        </YStack>
        <XStack>
          <XStack flexDirection="column" gap={10} flex={1}>
            <YStack flexDirection="column">
              <Text
                fontFamily={"Inter"}
                fontWeight={700}
                fontSize={12}
                color={ColorPallate.RegularColor}
                aria-valuetext="password"
              >
                password
              </Text>
              <Input
                fontFamily={"InterBold"}
                borderColor={"#fff"}
                fontSize={20}
                borderWidth={0}
                fontWeight={800}
                size={"$4"}
                bg={ColorPallate.RegularColor}
                color={ColorPallate.NeutralColor}
                value={pin}
                onChangeText={setPin}
              />
            </YStack>
          </XStack>
        </XStack>
      </YStack>
      <XStack>
        <Button flex={1} onPress={handleSubmit}>
          Done
        </Button>
      </XStack>
    </XStack>
  );
};
