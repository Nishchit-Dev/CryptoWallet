import { Text, View, XStack, YStack, Image, Spinner } from "tamagui";
import { ColorPallate } from "../../customization/custom";
import Eth from "../Assets/eth-ic.svg";
import Menu_ from "../Assets/menu-ic.svg";
import Send from "../Assets/send-ic.svg";
import Swap from "../Assets/swap-ic.svg";
import Receive from "../Assets/receive-ic.svg";
import Scan from "../Assets/scan-ic.svg";
import Matic from "../Assets/matic-ic.svg";
import { Log } from "ethers";
import { useFetchBalance } from "../../Hooks/RSS";
import { GetPrivateKey } from "../../Hooks/StorePrivateKey";
import { useState, useEffect } from "react";
import { shortAddress } from "../../utility/utility";
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

const SendButton = () => {
  return (
    <>
      <YStack alignItems="center" gap={11}>
        <Send />
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
        <Receive />
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
        <Swap />
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

const AssetsView = ({ address,amount }) => {
  return (
    <>
      <XStack alignItems="center" justifyContent="center">
        <Text textAlign="center" fontFamily={"InterRegular"}>
          Total Assets
        </Text>
      </XStack>
      <XStack alignItems="center" justifyContent="center" marginVertical={15}>
        <YStack backgroundColor={ColorPallate.NeutralColor} borderRadius={999} paddingHorizontal={15} paddingVertical={5}>
          <Text textAlign="center" fontFamily={"InterRegular"} >
            {address  ? shortAddress(address):<Spinner size="small"/>}
          </Text>
        </YStack>
      </XStack>
      <XStack justifyContent="center" alignItems="center">
        <YStack alignItems="center" justifyContent="center">
          <XStack alignItems="center">
          {!amount? <Spinner size="large"/>:<></>}
            <Text fontSize={32} fontFamily={"InterBold"} color={"white"} >
              {amount}
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
              ${(parseFloat(amount)*0.54).toFixed(4).split(".")[0]}.
            </Text>
            <Text
              fontSize={32}
              fontFamily={"InterBold"}
              color={ColorPallate.NeutralColor}
            >
              {(parseFloat(amount)*0.54).toFixed(3).split(".")[1]}
              
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </>
  );
};

const ListOfTokens = ({ List }) => {
  return (
    <>
      <XStack marginBottom={10}>
        <Text fontSize={20} fontFamily={"InterRegular"}>
          Assets
        </Text>
      </XStack>
      <YStack gap={17}>
        {List.map((ele,i)=>{
        
        return <TokenComponent source={Eth} TokenName={ele.name||null} amount={ele.amount||null} />
        })}
        <TokenComponent source={Matic} TokenName={"Matic"} amount={null} />
      </YStack>
    </>
  );
};

const Logo = ({ Svg }) => {
  return <Svg width={36} height={36} />;
};
export const TokenComponent = ({ source, TokenName, amount }) => {
  return (
    <>
      <XStack>
        <XStack
          alignItems="center"
          paddingHorizontal={15}
          paddingVertical={10}
          flex={1}
          justifyContent="space-between"
          backgroundColor={ColorPallate.NeutralColor}
          borderRadius={999}
        >
          <XStack>
            <Logo Svg={source} />
            <XStack paddingHorizontal={16}>
              <Text fontSize={20} fontFamily={"InterRegular"}>
                {TokenName || "Eth"}
              </Text>
            </XStack>
          </XStack>
          <XStack paddingHorizontal={16}>
            <Text fontSize={20} fontFamily={"InterRegular"}>
              {amount || 12.21}
            </Text>
          </XStack>
        </XStack>
      </XStack>
    </>
  );
};

export const Divider = () => {
  return <XStack bg={"#282629"} h={1} marginBottom={33}></XStack>;
};
export const Dashboard = ({ naviagte }) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    GetPrivateKey().then((cred) => {
      setAddress(cred.address);
      useFetchBalance(cred.address).then((balance) => {
        setAmount(balance);
      });
    });
  }, []);

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
        <AssetsView address={address} amount={amount} />
      </YStack>
      <YStack backgroundColor={ColorPallate.BackgroundColor} paddingBottom={42}>
        <FunctionButtons />
      </YStack>
      <YStack
        flex={1}
        paddingHorizontal={16}
        backgroundColor={ColorPallate.BackgroundColor}
      >
        <Divider />
        <ListOfTokens List={[{name:"Eth",amount:"0.2"}]} />
      </YStack>
    </>
  );
};
