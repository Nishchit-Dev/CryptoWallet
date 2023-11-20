import {
  Button,
  Input,
  Progress,
  Switch,
  SwitchThumb,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { ColorPallate } from "../../customization/custom";
import { useContext, useState } from "react";
import { NavigationContext, useNavigation } from "@react-navigation/native";
let HoldInterval;
export const Setting = () => {
  const [holdValue, setHoldValue] = useState(0);
  const [hold, setHold] = useState(false);
  const [TestNet, setTestNet] = useState(false);
  const navigation = useContext(NavigationContext);
  return (
    <>
      <StatusBar Title={"Settings"} actionOnIcon={null} Svg={null} />
      <YStack
        padding={16}
        flex={1}
        justifyContent="space-between"
        bg={ColorPallate.BlackBackgroundColor}
      >
        <YStack flex={1}>
          <YStack gap={10}>
            <XStack>
              <Text fontSize={32} fontFamily={"InterBold"}>
                Settings
              </Text>
            </XStack>
            <XStack justifyContent={"space-between"}>
              <Text
                fontSize={18}
                fontFamily={"InterBold"}
                opacity={TestNet ? 0.5 : 1}
              >
                Use Test-Network
              </Text>

              <Switch
                size={"$2"}
                onCheckedChange={(res) => {
                  console.log("Changed ->", res);
                  setTestNet(res);
                }}
              >
                <Switch.Thumb animation={"bouncy"} />
              </Switch>
            </XStack>
            <XStack>
              <Text fontSize={16} fontFamily={"InterLight"}>
                Anything done on test network wont effect on Main-net
              </Text>
            </XStack>

            <XStack>
              <Text fontSize={18} fontFamily={"InterBold"}>
                Reveal Secret Key
              </Text>
            </XStack>
            <XStack>
              <Text fontSize={16} fontFamily={"InterLight"}>
                do not share secret key with anyone if compromised you wont be
                able to recover fund
              </Text>
            </XStack>

            <YStack>
              <Button
                backgroundColor={ColorPallate.BrandColor}
                height={40}
                onPress={() => {
                  console.log("Reveal Secret Key");
                }}
                onPressIn={() => {
                  setHold(true);
                  let Hvalue = 0;
                  HoldInterval = setInterval(() => {
                    if (Hvalue >= 93) {
                      console.log("ssecret Key");
                      navigation.navigate("RevealSecretKey");
                    }

                    Hvalue = Hvalue + 21;

                    setHoldValue((prevValue) => prevValue + 20);
                    console.log("value -> ", holdValue);
                  }, 1000);

                  console.log("press-in");
                }}
                onPressOut={() => {
                  console.log("press-out");
                  clearInterval(HoldInterval);
                  setHold(false);

                  if (holdValue > 100) {
                    console.log("ssecret Key");
                    setHoldValue((prevValue) => prevValue * 0);
                    navigation.navigate("RevealSecretKey");
                  } else {
                    setHoldValue((prevValue) => prevValue * 0);
                  }
                  //   setHoldValue(0);
                  //   setHold(false);
                }}
                borderRadius={999}
                fontFamily={"InterRegular"}
                fontSize={20}
              >
                Hold to Reveal Secret Key
                {hold ? (
                  <Progress value={holdValue} max={100}>
                    <Progress.Indicator bg={"white"} animation="bouncy" />
                  </Progress>
                ) : (
                  <></>
                )}
              </Button>
            </YStack>
          </YStack>
        </YStack>
        <YStack>
          <Button
            backgroundColor={ColorPallate.NeutralColor}
            height={50}
            onPress={() => {
              console.log("pressed Saved");
              navigation.goBack();
            }}
            borderRadius={999}
            fontFamily={"InterRegular"}
            fontSize={20}
          >
            Back
          </Button>
        </YStack>
      </YStack>
    </>
  );
};
