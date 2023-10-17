import { XStack, Text, YStack, Input, Button, Spinner } from "tamagui";
import Menu_ from "../Assets/menu-ic.svg";
import Scan from "../Assets/scan-ic.svg";
import { QrScanner } from "../Dashboard/QR";
import { ColorPallate } from "../../customization/custom";
import Eth from "../Assets/eth-ic.svg";
import { useContext, useState } from "react";
import { useEstimateGas, useSendCrypto } from "../../Hooks/RSS";
import { NavigationContext } from "@react-navigation/native";
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
                borderColor: "$colorTransparent",
              }}
              fontFamily={"InterBold"}
            />
          </XStack>
          <XStack>
            <Text textAlign="center" fontSize={20} fontFamily={"InterRegular"}>
              ~ $ {(amount * 0.54).toFixed(7)}
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
            <Text fontSize={17} fontFamily={"InterRegular"}>
              Receiver
            </Text>
            <Input
              borderRightColor={"$colorTransparent"}
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
              placeholder="Recevier's Address"
              value={""}
            />
          </YStack>
        </XStack>

        <XStack>
          <YStack flex={1}>
            <Text fontSize={17} fontFamily={"InterRegular"}>
              Gas Fees
            </Text>
            <Input
              borderColor={"$colorTransparent"}
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
              placeholder="Recevier's Address"
              value={parseFloat(gas).toFixed(7) + " Eth"}
              disabled
              keyboardType="numeric"
            />
          </YStack>
        </XStack>

        <XStack>
          <YStack flex={1}>
            <Text fontSize={20} fontFamily={"InterRegular"}>
              Total Amount
            </Text>
            <YStack
              justifyContent="space-between"
              borderRadius={13}
              paddingHorizontal={16}
              paddingVertical={10}
              alignItems="center"
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
            >
              <Text fontFamily={"InterRegular"}>Amount + Gas Fees = </Text>
              <Text textAlign="center" fontFamily={"InterBold"} fontSize={32}>
                {(parseFloat(gas) + parseFloat(amount)).toFixed(5)} Eth
              </Text>
            </YStack>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};
export const SendCypto = ({ route }) => {
  const [amount, setAmount] = useState("0.0001");
  const [loading, setLoading] = useState(false);
  const gas = useEstimateGas();
  const address = route.params.address
  const [completed, setCompleted] = useState(false);
  const nav = useContext(NavigationContext);
  const handleSend = () => {
    let tx = {
      sender: address,
      receipent: "0x744a09F5F8ceb8AB9135842fb2Cd167dA2F517aF",
      amount: amount,
    };
    setLoading(!loading);
    console.log(tx)
    useSendCrypto(address, tx).then((flag) => {
      setLoading(!loading);
      setCompleted(!completed);
      setTimeout(() => {

        nav.goBack();
      }, 15 * 1000);
    });
  };
  const handleCancel=()=>{
    nav.goBack()
  }
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
              disabled={completed ? true : false}
              backgroundColor={
                !completed ? ColorPallate.BrandColor : ColorPallate.Success
              }
              height={50}
              onPress={handleSend}
              borderRadius={999}
              fontFamily={"InterRegular"}
              fontSize={20}
              icon={
                completed ? <></> : loading ? <Spinner size="large" /> : <></>
              }
            >
              {completed
                ? "Successfully Completed"
                : loading
                ? "Sending"
                : "Send"}
            </Button>
          </YStack>
          {!loading ? (
            <>
              <YStack flex={1}>
                <Button onPress={handleCancel} height={50} borderRadius={999} fontSize={20}>
                  cancel
                </Button>
              </YStack>
            </>
          ) : (
            <></>
          )}
        </XStack>
      </XStack>
    </>
  );
};
