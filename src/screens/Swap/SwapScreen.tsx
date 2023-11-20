import { Text, XStack, Button, YStack, Spinner } from "tamagui";
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
import { useContext } from "react";
import { NavigationContext } from "@react-navigation/native";
const SwapScreen = () => {
  const navigation = useContext(NavigationContext);

  const [tnxStatus, setTnxStatus] = useState(null);
  const [loading, setLoading] = useState(null);
  const [Amount, setAmount] = useState("0.01");
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

        <TokenSelect
          setToken={setTokenFrom}
          flag={"from"}
          setAmount={setAmount}
          Amount={Amount}
        />
        <TokenSelect
          setToken={setTokenTo}
          flag={"to"}
          setAmount={setAmount}
          Amount={Amount}
        />

        {/* <WrappedComponent/> */}
        <XStack marginVertical={10}>
          <YStack flex={1}>
            <Button
              // disabled={completed ? true : false}
              backgroundColor={
                tnxStatus == null
                  ? ColorPallate.BrandColor
                  : tnxStatus == false
                  ? ColorPallate.Failure
                  : ColorPallate.Success
              }
              height={50}
              onPress={() => {
                if (
                  TokenFrom != undefined &&
                  TokenTo != undefined &&
                  parseFloat(Amount) > -1
                ) {
                  // extracting phrase from wallet Async fun
                  setLoading(true);
                  wallet.then((res) => {
                    console.log(res.phrase);

                    (async () => {
                      Swap(
                        Amount,
                        { TokenFrom, TokenTo },
                        res.phrase,
                        res.address
                      ).then((res) => {
                        console.log("TnxStatus -> ", res);
                        setTnxStatus(res);
                        setLoading(false);
                        // setTimeout(() => {
                        //   navigation.goBack();
                        // }, 3 * 1000);
                      });
                    })();
                  });
                }
              }}
              borderRadius={999}
              fontFamily={"InterRegular"}
              fontSize={20}
              icon={
                loading == null ? (
                  <></>
                ) : loading ? (
                  <Spinner size="large" />
                ) : (
                  <></>
                )
              }
            >
              {tnxStatus == null
                ? "Swap"
                : tnxStatus == false
                ? "Failed"
                : "Success"}
            </Button>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};

export default SwapScreen;
