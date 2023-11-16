import { Text, XStack, YStack } from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { ColorPallate } from "../../customization/custom";
import { TotalAsset } from "./components/TotalAsset";
import { TokenSelect } from "./components/TokenSelect";
import { WrappedComponent } from "./components/TokenSelector";

const SwapScreen = () => {
  const open = () => {
    console.log("open");
  };

  return (
    <>
      <StatusBar Title={"Swap"} actionOnIcon={open} Svg={null} />
      <XStack
        bg={ColorPallate.BlackBackgroundColor}
        justifyContent="center"
        paddingHorizontal={16}
        alignItems="center"
        flexDirection="column"
      >
        <TotalAsset />

        <TokenSelect TokenSrc={null} />

        {/* <WrappedComponent/> */}
      </XStack>
    </>
  );
};

export default SwapScreen;
