import { Button, Text, XStack,YStack } from "tamagui";
import Menu_ from "../Assets/menu-ic.svg";
import { ColorPallate } from "../../customization/custom";
import { AskForPermission } from "./askCameraPermission";
import { StatusBar } from "../Components/Status/Status";
import { useState } from "react";
export const Scanner = () => {
  const [rescan, setRescan] = useState(true);
  return (
    <>
      <XStack
        paddingHorizontal={16}
        paddingTop={32}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <Menu_ />
        <Text fontSize={20} fontStyle="InterRegular" textAlign="center">
          Scanner
        </Text>
        <XStack>
          <Menu_></Menu_>
        </XStack>
        
      </XStack>
      <XStack
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor={ColorPallate.BlackBackgroundColor}
        flex={1}
      >
        <AskForPermission setFlag={setRescan} flag={rescan} />
      </XStack>
      <YStack paddingHorizontal={16} paddingVertical={10} backgroundColor={ColorPallate.BlackBackgroundColor}>
        <Button
        borderRadius={99}
          onPress={() => {
            setRescan(false);
          }}
        >
          Re-Scan
        </Button>
      </YStack>
    </>
  );
};
