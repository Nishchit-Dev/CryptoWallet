import { Image, Text, XStack, YStack } from "tamagui";
import { ColorPallate } from "../../../customization/custom";
import ArrowDown from "../../Assets/arrow-down-ic.svg";
import { useState } from "react";
import { DialogComponent } from "./TokenSelector";
const DefaultSrc =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png";

export const TokenSelect = ({ TokenSrc }) => {
  const [open, setOpen] = useState(false);
  return (
    <XStack paddingTop={10}>
      <YStack
        bg={ColorPallate.BlackLightBackgroundColor}
        borderRadius={19}
        justifyContent="center"
        alignItems="center"
        flex={1}
        paddingVertical={25}
      >
        <XStack
          maxWidth={152}
          justifyContent="center"
          alignItems="center"
          gap={10}
          padding={5}
          paddingHorizontal={10}
          bg={"#3a3a3a"}
          borderRadius={999}
          onPress={() => {
            setOpen(!open);
          }}
        >
          <XStack>
            <Image w={35} h={35} source={{ uri: DefaultSrc }} />
          </XStack>
          <XStack>
            <Text fontFamily={"InterRegular"}>name</Text>
          </XStack>
          <XStack>
            <ArrowDown width={25} height={25} />
          </XStack>
        </XStack>

        <Text fontFamily={"InterRegular"} color={ColorPallate.FontLightColor}>
          Swap From
        </Text>
        <YStack>
          {/* <Text fontFamily={"InterRegular"}>Amount</Text> */}
          {/* <YStack>
            <Text fontFamily={"InterRegular"}>max</Text>
          </YStack> */}
        </YStack>

        <Text fontFamily={"InterRegular"}>$23.244</Text>
        <DialogComponent open={open} setOpen={setOpen}></DialogComponent>
      </YStack>
    </XStack>
  );
};
