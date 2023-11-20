import { Image, Input, Text, XStack, YStack } from "tamagui";
import { ColorPallate } from "../../../customization/custom";
import ArrowDown from "../../Assets/arrow-down-ic.svg";
import { useState } from "react";
import { DialogComponent } from "./TokenSelector";
import { useSelector } from "react-redux";
const DefaultSrc =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png";

export const TokenSelect = ({ setToken, flag, setAmount, amount }) => {
  const [open, setOpen] = useState(false);
  const TokenInfo = useSelector((state) => {
    return flag == "from"
      ? state.swapTokens.TokenFrom
      : state.swapTokens.TokenTo;
  });
  return (
    <XStack paddingTop={10}>
      <YStack
        bg={ColorPallate.BlackLightBackgroundColor}
        borderRadius={19}
        justifyContent="center"
        alignItems="center"
        flex={1}
        onPress={() => {
          setOpen(!open);
        }}
        paddingVertical={25}  
      >
        <XStack
          maxWidth={152}
          justifyContent="center"
          alignItems="center"
          gap={10}
          padding={7}
          bg={"#3a3a3a"}
          borderRadius={999}
        >
          <XStack paddingRight={2}>
            <Image
              w={35}
              h={35}
              source={{
                uri: TokenInfo.logoURI ? TokenInfo.logoURI : DefaultSrc,
              }}
              borderRadius={999}
            />
          </XStack>
          <XStack>
            <Text fontFamily={"InterRegular"}>{TokenInfo.symbol}</Text>
          </XStack>
          <XStack>
            <ArrowDown width={25} height={25} />
          </XStack>
        </XStack>

        <Text fontFamily={"InterRegular"} color={ColorPallate.FontLightColor}>
          Swap {flag}
        </Text>
        <YStack>
          {/* <Text fontFamily={"InterRegular"}>Amount</Text>
           */}
          <Amount setAmount={setAmount} amount={amount} data={TokenInfo} />
        </YStack>

        <Text fontFamily={"InterRegular"}>$23.244</Text>
        <DialogComponent
          open={open}
          setOpen={setOpen}
          setToken={setToken}
        ></DialogComponent>
      </YStack>
    </XStack>
  );
};

const Amount = ({ amount, setAmount, data }) => {
  return (
    <>
      <XStack justifyContent="center" alignItems="center">
        <YStack alignItems="center" justifyContent="center">
          <XStack alignItems={"center"}>
            <Input
              marginTop={8}
              value={amount}
              onChangeText={setAmount}
              backgroundColor={"$colorTransparent"}
              defaultValue="0.01"
              keyboardType="numeric"
              caretHidden
              fontSize={32}
              borderColor="$colorTransparent"
              focusStyle={{
                borderColor: "$colorTransparent",
              }}
              fontFamily={"InterBold"}
            />
            {/* <Text fontSize={32} fontFamily={"InterBold"} color={"white"}>
              {amount}
            </Text> */}
            <Text
              fontSize={32}
              fontFamily={"InterBold"}
              color={ColorPallate.FontLightColor}
            >
              {data.symbol}
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </>
  );
};
