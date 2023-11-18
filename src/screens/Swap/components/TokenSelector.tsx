import {
  Adapt,
  Dialog,
  Image,
  Input,
  ScrollView,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { useState, useContext, createContext } from "react";
import { Constant } from "./Constant";
import Contansts from "../../../Hooks/Swap/constant/TokensConstant.json";

import { ColorPallate } from "../../../customization/custom";
import { useDispatch } from "react-redux";

let Context;
export const DialogComponent = ({ open, setOpen, setToken }) => {
  Context = createContext(setOpen);
  return (
    <Dialog modal open={open}>
      <Dialog.Trigger asChild>
        <XStack
          onPress={() => {
            setOpen(!open);
          }}
        >
          {/* <ReceiveButton /> */}
        </XStack>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding={"$4"} gap={"$4"}>
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation={"lazy"}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key={"overlay"}
          animation="quick"
          backgroundColor={"white"}
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          key="content"
          backgroundColor={"white"}
          bordered
          padding={16}
          elevate
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          // gap="$4"
        >
          <Context.Provider value={setOpen}>
            <WrappedComponent setToken={setToken} />
          </Context.Provider>
          {/* <Dialog.Close /> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const Divider = () => {
  return <XStack bg={"#282629"} h={1} marginBottom={33}></XStack>;
};

const Heading = () => {
  return (
    <>
      <Text fontSize={20} fontFamily={"InterBold"}>
        Select a Token
      </Text>
    </>
  );
};

const SearchBar = () => {
  return (
    <YStack flex={1}>
      <Input placeholder="token eg. WETH" />
    </YStack>
  );
};

const Token = ({ data, i, setToken }) => {
  //   console.log(data);
  const closeDialog = useContext(Context);
  const dispatch = useDispatch();
  return (
    <>
      <XStack
        gap={20}
        flex={1}
        key={i + 1}
        alignItems="center"
        p={8}
        onPress={() => {
          let tokenInfo = {
            address: data.address,
            decimals: data.decimals,
            name: data.name,
            symbol: data.symbol,
            logoURI: data.logoURI,
          };
          dispatch(setToken(tokenInfo));
          console.log(data);
          closeDialog(false);
        }}
      >
        <Image
          w={40}
          h={40}
          source={{ uri: data.logoURI }}
          borderRadius={999}
        />
        <XStack>
          <YStack alignItems="baseline">
            <Text fontSize={18} fontFamily={"InterRegular"}>
              {data.name}
            </Text>
            <Text
              fontSize={16}
              color={ColorPallate.FontLightColor}
              fontFamily={"InterRegular"}
            >
              {data.symbol}
            </Text>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};

export const WrappedComponent = ({ setToken }) => {
  return (
    <>
      <XStack flexDirection="column">
        <XStack paddingVertical={10}>
          <Heading />
        </XStack>
        <SearchBar />
        <XStack p={25}>
          <Divider />
        </XStack>
        <YStack
          flexDirection="column"
          justifyContent="center"
          alignItems="baseline"
        >
          <ScrollView width="100%" showsVerticalScrollIndicator={false}>
            {Constant.token.map((data, i) => {
              return <Token data={data} i={i + 1} setToken={setToken} />;
            })}
          </ScrollView>
        </YStack>
      </XStack>
    </>
  );
};
