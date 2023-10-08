import { ImageBackground, Dimensions, StatusBar } from "react-native";
import {
  Text,
  View,
  YStack,
  Image,
  XStack,
  Button,
  Spinner,
  Spacer,
} from "tamagui";
import { useEffect, useState } from "react";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const imga = require("./bgcover.png");

const CreateWallet = ({nav}) => {
  return (
    <XStack>
      <Button
        h={55}
        borderRadius={999}
        justifyContent="center"
        alignItems="center"
        w={screenWidth - 16}
        onPress={()=>{
          nav.navigate("CreateNewWallet")
        }}
      >
        <Text fontFamily={"InterRegular"} fontSize={20}>
          Create new Wallet
        </Text>
      </Button>
    </XStack>
  );
};
const UseExistingWallet = () => {
  return (
    <XStack>
      <Button
        h={55}
        borderRadius={999}
        w={screenWidth - 16}

        justifyContent="center"
        alignItems="center"
      >
        <Text fontFamily={"InterRegular"} fontSize={20}>
          Use Existing Wallet
        </Text>
      </Button>
    </XStack>
  );
};

export const SettingUpWallet = ({navigation}) => {
  return (
    <View>
      <ImageBackground
        source={imga}
        style={{
          height: screenHeight,
          width: screenWidth,
        }}
      >
        <YStack flex={1} p="$3"  >
          <YStack alignItems="center"  justifyContent="space-between" flex={1}>
            <YStack >
              <XStack paddingTop={"$10"} justifyContent="flex-start">
                <Text fontFamily={"InterBold"} fontSize={32}>
                  Setting up Wallet
                </Text>
              </XStack>

              <XStack>
                <Text fontFamily={"Inter"} fontSize={20} >
                  If you already have wallet you can use Use Existing wallet
                  option or a new user you can choose for create a new wallet
                </Text>
              </XStack>
            </YStack>
            <YStack flexDirection="column"  >
              <XStack alignItems="center" flexDirection="column" >
                <CreateWallet nav={navigation}/>
                <Text fontFamily={"InterThin"}>or</Text>
                <UseExistingWallet />
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </ImageBackground>
    </View>
  );
};
