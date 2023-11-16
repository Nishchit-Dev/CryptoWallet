import { Sheet, XStack, YStack, Text } from "tamagui";
import { ColorPallate } from "../../customization/custom";
import { BlurView } from "expo-blur";
import { useState } from "react";
import Exit from "../Assets/exit-ic.svg";
import { Dimensions } from "react-native";
import { useContext } from "react";
import { NavigationContext } from "@react-navigation/native";

export const Nav = ({ flag, setFlag }) => {
  const Navigation = useContext(NavigationContext);
  return (
    <XStack
      id="nav"
      position="absolute"
      fullscreen
      zIndex={999}
      backgroundColor={ColorPallate.BlackBackgroundColor}
      animation={[
        "medium",
        {
          opacity: {
            overshootClamping: true,
          },
        },
      ]}
      enterStyle={{ x: -250, y: 0, opacity: 0 }}
      exitStyle={{ x: 0, y: 0, opacity: 0 }}
      //   animation={"medium"}
    >
      <XStack flex={1}>
        {/* <BlurView intensity={30} style={{ flex: 1 }}></BlurView> */}
      </XStack>
      <XStack
        // bg={"white"}
        position="absolute"
        zIndex={9999}
        fullscreen
        maxHeight={200}
        rowGap={10}
        // backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <XStack
          gap={20}
          marginVertical={20}
          padding={16}
          flex={1}
          //   fullscreen
          flexDirection="column"
          //   animation={"medium"}
        >
          <YStack flexDirection="row" justifyContent="space-between">
            <Text fontSize={32} color={"white"} fontFamily={"InterRegular"}>
              Menu
            </Text>
            <XStack
              onPress={() => {
                setFlag(!flag);
              }}
            >
              <Exit />
            </XStack>
          </YStack>

          <XStack
            gap={20}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <YStack
              bg={ColorPallate.BlackLightBackgroundColor}
              paddingHorizontal={10}
              borderRadius={9}
              onPress={() => {
                console.log(
                  Navigation.getState().routes[Navigation.getState().index].name
                );
                let currentRoute =
                  Navigation.getState().routes[Navigation.getState().index]
                    .name;
                if (currentRoute != "Dashboard") {
                  Navigation.navigate("Dashboard");
                }
              }}
            >
              <Text fontSize={22} color={"white"} fontFamily={"InterRegular"}>
                Home
              </Text>
            </YStack>
            <YStack
              bg={ColorPallate.BlackLightBackgroundColor}
              paddingHorizontal={10}
              borderRadius={9}
              onPress={() => {
                console.log(
                  Navigation.getState().routes[Navigation.getState().index].name
                );
                let currentRoute =
                  Navigation.getState().routes[Navigation.getState().index]
                    .name;
                if (currentRoute != "SendCrypto") {
                  Navigation.navigate("SendCrypto",{address:""});
                }
              }}
            >
              <Text fontSize={22} color={"white"} fontFamily={"InterRegular"}>
                Send
              </Text>
            </YStack>
            <YStack
              bg={ColorPallate.BlackLightBackgroundColor}
              paddingHorizontal={10}
              borderRadius={9}
              onPress={() => {
                console.log(
                  Navigation.getState().routes[Navigation.getState().index].name
                );
                let currentRoute =
                  Navigation.getState().routes[Navigation.getState().index]
                    .name;
                if (currentRoute != "Swap") {
                  Navigation.navigate("Swap");
                }
              }}
            >
              <Text fontSize={22} color={"white"} fontFamily={"InterRegular"}>
                Swap
              </Text>
            </YStack>
            <YStack
              bg={ColorPallate.BlackLightBackgroundColor}
              paddingHorizontal={10}
              borderRadius={9}
              onPress={() => {
                console.log(
                  Navigation.getState().routes[Navigation.getState().index].name
                );
                let currentRoute =
                  Navigation.getState().routes[Navigation.getState().index]
                    .name;
                if (currentRoute != "History") {
                  Navigation.navigate("History");
                }
              }}
            >
              <Text fontSize={22} color={"white"} fontFamily={"InterRegular"}>
                Histroy
              </Text>
            </YStack>
          </XStack>
        </XStack>
      </XStack>
    </XStack>
  );
};
