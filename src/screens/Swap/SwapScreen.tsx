import { Text, XStack, Button, YStack } from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { ColorPallate } from "../../customization/custom";
import { TotalAsset } from "./components/TotalAsset";
import { TokenSelect } from "./components/TokenSelect";
import { WrappedComponent } from "./components/TokenSelector";
import { useState } from "react";
import { setTokenFrom, setTokenTo } from "../../Store/Slices/SwapSlice";
const SwapScreen = () => {
  const open = () => {
    console.log("open");
  };

  return (
    <>
      <StatusBar Title={"Swap"} actionOnIcon={open} Svg={null} />
      <XStack
        flex={1}
        bg={ColorPallate.BlackBackgroundColor}
        justifyContent="center"
        paddingHorizontal={16}
        alignItems="center"
        flexDirection="column"
      >
        <TotalAsset />

        <TokenSelect setToken={setTokenFrom} flag={"from"} />
        <TokenSelect setToken={setTokenTo} flag={"to"} />

        {/* <WrappedComponent/> */}
        <XStack marginVertical={10}>
          <YStack flex={1}>
            <Button
              // disabled={completed ? true : false}
              backgroundColor={ColorPallate.BrandColor}
              height={50}
              onPress={() => {
                console.log("Swap");
              }}
              borderRadius={999}
              fontFamily={"InterRegular"}
              fontSize={20}
              // icon={
              //   completed ? <></> : loading ? <Spinner size="large" /> : <></>
              // }
            >
              {"Swap"}
            </Button>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};

export default SwapScreen;
