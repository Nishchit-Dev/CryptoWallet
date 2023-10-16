import { XStack, Text, YStack, Input, Button } from "tamagui";
import Menu_ from "../Assets/menu-ic.svg";
import Scan from "../Assets/scan-ic.svg";
import { QrScanner } from "../Dashboard/QR";
import { ColorPallate } from "../../customization/custom";
import Eth from "../Assets/eth-ic.svg";
import { useState } from "react";
import { useEstimateGas } from "../../Hooks/RSS";
export const Menu = () => {
  return (
    <>
      <Menu_ />
    </>
  );
};
export const Scanner = () => {
  return (
    <>
      <Scan />
    </>
  );
};
export const Divider = () => {
  return <XStack bg={"#282629"} h={1} marginBottom={33}></XStack>;
};

const AssetView = ({ amount, setAmount }) => {
  return (
    <>
      <XStack alignItems="center" justifyContent="center">
        <Text textAlign="center" fontFamily={"InterRegular"}>
          Total Assets
        </Text>
      </XStack>
      <XStack alignItems="center" justifyContent="center">
        <YStack
          paddingVertical={15}
          borderRadius={19}
          bg={"#282629"}
          flex={1}
          alignItems="center"
          justifyContent="center"
          margin={20}
        >
          <XStack marginBottom={10}>
            <Eth width={55} height={55} />
          </XStack>
          <XStack>
            <Text
              textAlign="center"
              color={"#847A7E"}
              fontFamily={"InterRegular"}
            >
              Send Ethereum
            </Text>
          </XStack>
          <XStack padding={5}>
            <Input
              value={amount}
              onChangeText={setAmount}
              backgroundColor={"$colorTransparent"}
            defaultValue="0.01"
              keyboardType="numeric"
              caretHidden
              textAlignVertical="bottom"
              fontSize={32}
              borderColor="$colorTransparent"
              focusStyle={{
              borderColor:"$colorTransparent"
              }}
              fontFamily={"InterBold"}
            />
          </XStack>
          <XStack>
            <Text textAlign="center" fontSize={20} fontFamily={"InterRegular"}>
              $ {(amount * 0.54).toFixed(2)}
            </Text>
          </XStack>
        </YStack>
      </XStack>
      <Divider />
    </>
  );
};

const UserInput = ({ amount, gas }) => {
  return (
    <>
      <XStack
        backgroundColor={ColorPallate.BlackBackgroundColor}
        p={16}
        flexDirection="column"
        gap={12}
      >
        <XStack>
          <YStack flex={1}>
            <Text fontSize={20} fontFamily={"InterRegular"}>
              Receiver
            </Text>
            <Input
              borderRightColor={"$colorTransparent"}
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
              placeholder="Recevier's Address"
            />
          </YStack>
        </XStack>

        <XStack>
          <YStack flex={1}>
            <Text fontSize={20} fontFamily={"InterRegular"}>
              Gas Fees
            </Text>
            <Input
              borderColor={"$colorTransparent"}
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
              placeholder="Recevier's Address"
              value={gas + " Eth"}
              disabled
              keyboardType="numeric"
            />
          </YStack>
        </XStack>

        <XStack>
          <YStack flex={1}>
            <Text fontSize={20} fontFamily={"InterRegular"}>
              Sub-Total
            </Text>
            <YStack
              justifyContent="space-between"
              borderRadius={13}
              paddingHorizontal={16}
              paddingVertical={10}
              flexDirection="row"
              alignItems="center"
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
            >
              <Text fontFamily={"InterRegular"}>Amount + Gas Fees = </Text>
              <Text textAlign="center" fontFamily={"InterBold"} fontSize={32}>
                {(parseFloat(gas) + parseFloat(amount)).toFixed(2)} Eth
              </Text>
            </YStack>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};
export const SendCypto = ({ address }) => {
  const [amount, setAmount] = useState("0.01");
  
  const gas = useEstimateGas()
  return (
    <>
      <XStack
        paddingHorizontal={16}
        paddingTop={32}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <Menu />
        <Text fontSize={20} fontStyle="InterRegular">
          Send
        </Text>
        <QrScanner address={address || "0xEmpty"} />
      </XStack>
      <XStack
        flexDirection="column"
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <AssetView amount={amount} setAmount={setAmount} />
      </XStack>
      <XStack
        flexDirection="column"
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <UserInput amount={amount} gas={gas.gasInEthers} />
      </XStack>
      <XStack
        backgroundColor={ColorPallate.BlackBackgroundColor}
        flex={1}
        p={16}
        justifyContent="flex-end"
        flexDirection="column"
      >
        <XStack flexDirection="row" gap={10}>
          <YStack flex={1}>
            <Button
              backgroundColor={ColorPallate.BrandColor}
              height={50}
              borderRadius={999}
              fontFamily={"InterRegular"}
              fontSize={20}
            >
              send
            </Button>
          </YStack>
          <YStack flex={1}>
            <Button height={50} borderRadius={999} fontSize={20}>
              cancel
            </Button>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};
