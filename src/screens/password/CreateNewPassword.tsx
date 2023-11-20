import { Button, Input, Text, XStack, YStack } from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { X } from "@tamagui/lucide-icons";
import { ColorPallate } from "../../customization/custom";

export const CreateNewPassword = () => {

  return (
    <>
      <StatusBar Title={"New Password"} actionOnIcon={null} Svg={null} />
      <YStack
        padding={16}
        flex={1}
        justifyContent="space-between"
        bg={ColorPallate.BlackBackgroundColor}
      >
        <YStack flex={1}>
          <YStack>
            <XStack>
              <Text fontSize={32} fontFamily={"InterBold"}>
                create new password
              </Text>
            </XStack>
            <XStack>
              <Text fontSize={16} fontFamily={"Inter"}>
                create a strong user password to secure your wallet.
              </Text>
            </XStack>
            <YStack marginTop={20} gap={5}>
              <XStack>
                <Text fontSize={12} fontFamily={"Inter"}>
                  password
                </Text>
              </XStack>
              <YStack>
                <YStack>
                  <Input
                    placeholder="enter new Password"
                    bg={ColorPallate.BlackLightBackgroundColor}
                    value={""}
                    borderRadius={999}
                    borderColor={"$colorTransparent"}
                  />
                </YStack>
              </YStack>
            </YStack>
          </YStack>
        </YStack>
        <YStack>
          <Button
            backgroundColor={ColorPallate.BrandColor}
            height={50}
            onPress={() => {
              console.log("pressed Saved");
            }}
            borderRadius={999}
            fontFamily={"InterRegular"}
            fontSize={20}
          >
            Save Password
          </Button>
        </YStack>
      </YStack>
    </>
  );
};
