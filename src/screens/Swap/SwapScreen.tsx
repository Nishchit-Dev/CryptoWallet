import { Text, XStack, Button, YStack } from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { ColorPallate } from "../../customization/custom";
import { TotalAsset } from "./components/TotalAsset";
import { TokenSelect } from "./components/TokenSelect";
import { WrappedComponent } from "./components/TokenSelector";
import { useEffect, useState } from "react";
import { setTokenFrom, setTokenTo } from "../../Store/Slices/SwapSlice";
import { ethers } from "ethers";
import { Swap } from "../../Hooks/Swap/swap.js";
import { useSelector } from "react-redux";
import { GetPrivateKey } from "../../Hooks/StorePrivateKey";
const SwapScreen = () => {
  const [Amount,setAmount] = useState("0.01");
  const open = () => {
    console.log("open");
  };

  const TokenFrom = useSelector((state) => {
    return state.swapTokens.TokenFrom;
  });
  const TokenTo = useSelector((state) => {
    return state.swapTokens.TokenTo;
  });
  const wallet = GetPrivateKey().then((res) => {
    return res;
  });

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

        <TokenSelect setToken={setTokenFrom} flag={"from"} setAmount={setAmount} Amount={Amount}/>
        <TokenSelect setToken={setTokenTo} flag={"to"} setAmount={setAmount}  Amount={Amount}/>

        {/* <WrappedComponent/> */}
        <XStack marginVertical={10}>
          <YStack flex={1}>
            <Button
              // disabled={completed ? true : false}
              backgroundColor={ColorPallate.BrandColor}
              height={50}
              onPress={() => {
                if (
                  TokenFrom != undefined &&
                  TokenTo != undefined &&
                  Amount > -1
                ) {
                  // extracting phrase from wallet Async fun

                  console.log(TokenFrom);
                  console.log(TokenTo);
                  console.log(Amount);

                  wallet.then((res) => {
                    console.log(res.phrase);
                    Swap(
                      Amount,
                      { TokenFrom, TokenTo },
                      res.phrase,
                      res.address
                    );
                  });
                }
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
