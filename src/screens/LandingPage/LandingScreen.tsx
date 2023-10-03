import { ImageBackground, Dimensions, StatusBar } from "react-native";
import { Text, View, YStack, Image, XStack, Button, Spinner } from "tamagui";
import { GetPrivateKey } from "../../Hooks/StorePrivateKey";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const imga = require("./bgcover.png");
const arrow = require("./arrow_button.png");

export const Loader = () => {
  return <Spinner size="large" color="#C25ADC" paddingRight="$2"/>;
};

const LoadWallet = () => {
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

const GettingStarted =()=>{
  return (
    <XStack>
    <Button
      h={55}
      borderRadius={999}
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      iconAfter={Loader}
    >
      <Text fontFamily={"InterRegular"} fontSize={20}>
        Get Started
      </Text>
    </Button>
  </XStack>
  )
}

const CheckForKey = ()=>{
  var flag =  GetPrivateKey().then(res=>{
    console.log(res)
    return res
  })

  if(flag !=null){
    return <LoadWallet/>
  }
  return <GettingStarted/>
  
}

export const LandingScreen = () => {
  return (
    <View>
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

          {CheckForKey()}
          </YStack>
        </YStack>
      </ImageBackground>
    </View>
  );
};
