import { Button, Dialog, Text, XStack, YStack, Adapt, Sheet } from "tamagui";
import { useState } from "react";
import Scanner from "../Assets/scan-ic.svg";
import Receive from "../Assets/receive-ic.svg";

import QRCode from "react-native-qrcode-svg";
import { CustomShortAddress, shortAddress } from "../../utility/utility";
const ReceiveButton = () => {
  return (
    <>
      <YStack alignItems="center" gap={11}>
        <XStack>
          <Receive />
        </XStack>
        <Text fontSize={12} fontFamily={"InterRegular"}>
          Receive
        </Text>
      </YStack>
    </>
  );
};

export function QrScanner({ address }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog
        open={open}
        modal
        onOpenChange={(open) => {
          setOpen(open);
          console.log("hello");
        }}
      >
        <Dialog.Trigger asChild>
          <XStack
            onPress={() => {
              setOpen(!open);
            }}
          >
            <ReceiveButton />
          </XStack>
        </Dialog.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4" backgroundColor={"white"}>
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            backgroundColor={"white"}
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            key="content"
            backgroundColor={"white"}
            padding={16}
            bordered
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
            enterStyle={{ x: 0, y: -10, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 20, opacity: 0, scale: 0.95 }}
            // gap="$4"
          >
            <Dialog.Title color={"black"}>Scan Qr</Dialog.Title>
            <Dialog.Description
              color={"black"}
              fontSize={18}
              textAlign="center"
            >
              {" "}
              Receive Crypto using Qr Code
            </Dialog.Description>
            <XStack flexDirection={"column"}>
              <YStack
                justifyContent="center"
                alignItems="center"
                padding={10}
                gap={15}
              >
                <QRCode value={address || "hello"} logoSize={150} size={250} />
                <Text fontFamily={"InterRegular"} fontSize={24} color={"black"}>
                  {address ? CustomShortAddress(address, 8, 8) : ""}
                </Text>
              </YStack>
            </XStack>
            {/* <Text>Dialog</Text> */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
