import { Text, XStack } from "tamagui";
import Menu_ from "../Assets/menu-ic.svg";
import { ColorPallate } from "../../customization/custom";
import { AskForPermission } from "./askCameraPermission";
import { StatusBar } from "../Components/Status/Status";

export const Scanner = () => {
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
        <XStack >
          <Menu_></Menu_>
        </XStack>
        {/* <QrScanner address={address} /> */}
      </XStack>
      <XStack  justifyContent="flex-start" alignItems="center"  backgroundColor={ColorPallate.BlackBackgroundColor} flex={1}>
        <AskForPermission />
      </XStack>
    </>
  );
};
