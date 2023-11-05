import { XStack, Text, YStack, Input, Button, Spinner, TextArea } from "tamagui";
import Menu_ from "../Assets/menu-ic.svg";
import Scan from "../Assets/scan-ic.svg";
import { QrScanner } from "../Dashboard/QR";
import { ColorPallate } from "../../customization/custom";
import Eth from "../Assets/eth-ic.svg";
import { useContext, useState } from "react";
import { useEstimateGas, useSendCrypto } from "../../Hooks/RSS";
import { NavigationContext, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
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

const UserInput = ({ amount, gas, address }) => {
  const [ReceipeintAddress,setAddress] = useState(address)
  return (
    <>
      <XStack
        backgroundColor={ColorPallate.BlackBackgroundColor}
        paddingHorizontal={16}
        flexDirection="column"
        gap={12}
      >
        <XStack>
          <YStack flex={1}>
            <Text fontSize={17} fontFamily={"InterRegular"}>
              Receiver
            </Text>
            
            <TextArea
              borderRightColor={"$colorTransparent"}
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
              placeholder="Recevier's Address"
              value={ReceipeintAddress}
              onChangeText={setAddress}
              paddingVertical={0}
              height={address == "" || address == undefined || address == null ? 40:65}
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
export const SendCypto = () => {
  const [amount, setAmount] = useState("0.0001");
  const [loading, setLoading] = useState(false);
  const gas = useEstimateGas();
  const QR_address = useRoute().params.QR_address;
  console.log("QR-: ",QR_address)
  const address = useSelector((state) => {
    return state.credentialReducer.address;
  });

  const [completed, setCompleted] = useState(false);
  const nav = useContext(NavigationContext);

  const handleSend = () => {
    var tx = {};
    console.log("Qr-address: ", QR_address);
    if (QR_address != null) {
      if (address != null) {
        tx = {
          sender: address,
          receipent: QR_address,
          amount: amount,
        };
      }
    }

    setLoading(!loading);
    console.log(tx);
    useSendCrypto(tx).then((flag) => {
      setLoading(!loading);
      setCompleted(!completed);
      setTimeout(() => {
        nav.goBack();
      }, 15 * 1000);
    });
  };
  const handleCancel = () => {
    nav.goBack();
  };
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
        <QrScanner />
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
        <UserInput
          amount={amount}
          gas={gas.gasInEthers}
          address={QR_address || "0xEmpty"}
        />
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
                <Button
                  onPress={handleCancel}
                  height={50}
                  borderRadius={999}
                  fontSize={20}
                >
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
