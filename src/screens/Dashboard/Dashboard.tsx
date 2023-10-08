import { Text, View, XStack, YStack, Image } from "tamagui";
import { ColorPallate } from "../../customization/custom";
export const Menu = () => {
  return (
    <>
      <Image source={require("../Assets/menu-ic.png")} />
    </>
  );
};
export const Scanner = () => {
  return (
    <>
      <Image source={require("../Assets/scan-ic.jpg")} />
    </>
  );
};

const SendButton = () => {
  return (
    <>
      <YStack alignItems="center" gap={11}>
        <Image source={require("../Assets/send-ic.png")} />
        <Text fontSize={12} fontFamily={"InterRegular"}>
          Send
        </Text>
      </YStack>
    </>
  );
};

const ReceiveButton = () => {
  return (
    <>
      <YStack alignItems="center" gap={11}>
        <Image source={require("../Assets/receive-ic.png")} />
        <Text fontSize={12} fontFamily={"InterRegular"}>
          Receive
        </Text>
      </YStack>
    </>
  );
};

const SwapButton = () => {
  return (
    <>
      <YStack alignItems="center" gap={11}>
        <Image source={require("../Assets/swap-ic.png")} />
        <Text fontSize={12} fontFamily={"InterRegular"}>
          Swap
        </Text>
      </YStack>
    </>
  );
};

const FunctionButtons = () => {
  return (
    <XStack justifyContent="center" gap={30}>
      <ReceiveButton />
      <SendButton />
      <SwapButton />
    </XStack>
  );
};

const AssetsView = () => {
  return (
    <>
      <XStack alignItems="center" justifyContent="center">
        <Text textAlign="center">Total Assets</Text>
      </XStack>
      <XStack justifyContent="center" alignItems="center">
        <YStack alignItems="center" justifyContent="center">
          <XStack>
            <Text fontSize={32} fontFamily={"InterBold"} color={"white"}>
              12.57
            </Text>
            <Text
              fontSize={32}
              fontFamily={"InterBold"}
              color={ColorPallate.NeutralColor}
            >
              {" "}
              ETH
            </Text>
          </XStack>
          <XStack>
            <Text fontSize={32} fontFamily={"InterBold"} color={"white"}>
              $13522.
            </Text>
            <Text
              fontSize={32}
              fontFamily={"InterBold"}
              color={ColorPallate.NeutralColor}
            >
              19
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </>
  );
};
export const Dashboard = ({ naviagte }) => {
  return (
    <>
      <XStack
        paddingHorizontal={16}
        paddingTop={32}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={ColorPallate.BackgroundColor}
      >
        <Menu />
        <Text fontSize={20} fontStyle="InterRegular">
          Account
        </Text>
        <Scanner />
      </XStack>

      <YStack
        backgroundColor={ColorPallate.BackgroundColor}
        paddingVertical={35}
      >
        <AssetsView />
      </YStack>
      <YStack backgroundColor={ColorPallate.BackgroundColor} paddingBottom={42}>
        <FunctionButtons />
      </YStack>
      
    </>
  );
};
