import { ImageBackground, Dimensions, StatusBar } from "react-native";
import {
  Text,
  View,
  YStack,
  Image,
  XStack,
  Button,
  Spinner,
  createContext,
} from "tamagui";
import {
  DoesPrivateKeyExist,
  GetPrivateKey,
} from "../../Hooks/StorePrivateKey";

import { useDispatch,useSelector } from "react-redux";
import { setAddress } from "../../Store/Slices/CredSlice";

import { useContext, useEffect, useState } from "react";
import { NavigationContext, useNavigation } from "@react-navigation/native";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const imga = require("./bgcover.png");
const arrow = require("./arrow_button.png");

export const Loader = () => {
  return <Spinner size="large" color="#C25ADC" paddingRight="$2" />;
};
export const Arrow = () => {
  return <Image source={arrow} />;
};

const SetCred =()=>{

  const dispatch = useDispatch()

  useEffect(()=>{
      GetPrivateKey().then((cred)=>{
        dispatch(setAddress(cred.address))
      })
  },[])


  return <>

  </>
}

const LoadWallet = () => {

  const nav_ = useContext(NavigationContext);

  useEffect(() => {
    setTimeout(() => {
      nav_.navigate("Dashboard");
      console.log("hello");
    }, 1800);
  }, []);
  return (
    <XStack>
      <Button
        h={55}
        borderRadius={999}
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
        icon={Loader}
      >
        <Text fontFamily={"InterRegular"} fontSize={20}>
          Loading Wallet
        </Text>
      </Button>
    </XStack>
  );
};

const GettingStarted = ({ nav }) => {
  const handlePress = () => {
    nav.navigate("SettingUpWallet");
  };
  return (
    <XStack>
      <Button
        onPress={handlePress}
        h={55}
        borderRadius={999}
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        iconAfter={Arrow}
      >
        <Text fontFamily={"InterRegular"} fontSize={20}>
          Get Started
        </Text>
      </Button>
    </XStack>
  );
};

function CheckForKey({ Flag, nav }) {
  if (Flag) {
    return <LoadWallet />;
  }
  return (
    <>
      <GettingStarted nav={nav} />
    </>
  );
}

export const LandingScreen = ({ navigation }) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    DoesPrivateKeyExist().then((res) => {
      console.log(res);
      setFlag(res);
    });
  });

  return (
    <View>
      <SetCred/>
      <ImageBackground
        source={imga}
        style={{
          height: screenHeight,
          width: screenWidth,
        }}
      >
        <YStack flex={1} p="$3" justifyContent="flex-end">
          <YStack alignItems="center">
            <XStack marginBottom={44}>
              <Text fontFamily={"InterBold"} fontSize={48} textAlign="center">
                Securely manage your crypto wallet
              </Text>
            </XStack>

            <XStack marginBottom={72}>
              <Text fontFamily={"Inter"} fontSize={12} textAlign="center">
                The safest and most secure digital crypto {`\n`}wallet number
                one in the world
              </Text>
            </XStack>

            <CheckForKey Flag={flag} nav={navigation} />
          </YStack>
        </YStack>
      </ImageBackground>
    </View>
  );
};
