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
import { useState } from "react";
import { Constant } from "./Constant";
import { ColorPallate } from "../../../customization/custom";
export const TokenSelector = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <DialogComponent open={open} setOpen={setOpen}></DialogComponent> */}
    </>
  );
};

export const DialogComponent = ({ open, setOpen }) => {
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
          <WrappedComponent />

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

const Token = ({ data, i }) => {
  console.log(data);
  return (
    <>
      <XStack gap={20} flex={1} key={i} alignItems="center" p={8}>
        <Image w={50} h={50} source={{ uri: data.logoURI }} />
        <XStack>
          <YStack  alignItems="baseline">
            <Text fontSize={18} fontFamily={"InterRegular"}>
              {data.name}
            </Text>
            <Text fontSize={16} color={ColorPallate.FontLightColor} fontFamily={"InterRegular"}>
              {data.symbol}
            </Text>
          </YStack>
        </XStack>
      </XStack>
    </>
  );
};

export const WrappedComponent = () => {
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
          <ScrollView >
            {Constant.token.map((data, i) => {
              return <Token data={data} i={i + 1} />;
            })}
          </ScrollView>
        </YStack>
      </XStack>
    </>
  );
};
