import { Button, Input, Text, XStack, YStack } from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { ColorPallate } from "../../customization/custom";
import { useContext, useEffect, useState } from "react";
import { GetPrivateKey } from "../../Hooks/StorePrivateKey";
import { NavigationContext } from "@react-navigation/native";

const ListOfPhrase = ({ List, length }) => {
  return (
    <>
      <YStack gap={20} alignItems="left">
        {List.length > 0 ? (
          List.map((word: string, i: number) => {
            return (
              <XStack alignItems="center" gap={5} key={i + 1 + length}>
                <Text fontSize={20} fontFamily={"InterRegular"}>
                  {i + 1 + length}.
                </Text>
                <Text>
                  <XStack
                    alignItems="center"
                    backgroundColor={"#2E2A2B"}
                    borderRadius={999}
                    paddingHorizontal={23}
                    paddingVertical={8}
                    width={135}
                    maxHeight={55}
                  >
                    <Text fontSize={16} fontFamily={"InterRegular"}>
                      {" "}
                      {word}
                    </Text>
                  </XStack>
                </Text>
              </XStack>
            );
          })
        ) : (
          <></>
        )}
      </YStack>
    </>
  );
};

export const RevealSecretKey = () => {
  const [menmonic, setMenmonic] = useState([]);
  const navgation = useContext(NavigationContext)
  useEffect(() => {
    GetPrivateKey().then((res) => {
      console.log(res.wordlist);
      setMenmonic(res.wordlist);
    });
  }, []);
  return (
    <>
      <StatusBar Title={"Secret Key"} actionOnIcon={null} Svg={null} />
      <YStack
        padding={16}
        flex={1}
        justifyContent="space-between"
        bg={ColorPallate.BlackBackgroundColor}
      >
        <YStack flex={1}>
          <YStack>
            <XStack>
              <Text fontSize={32} fontFamily={"InterBold"}>
                Secret Key
              </Text>
            </XStack>
            <XStack>
              <Text fontSize={16} fontFamily={"Inter"}>
                do not share your secret key !
              </Text>
            </XStack>

            <XStack justifyContent="space-between" marginTop={20}>
              <ListOfPhrase
                List={menmonic.slice(0, menmonic.length / 2)}
                length={0}
              />
              <ListOfPhrase
                List={menmonic.slice(menmonic.length / 2, menmonic.length)}
                length={menmonic.length / 2}
              />
            </XStack>
          </YStack>
        </YStack>

        <YStack>
          <Button
            backgroundColor={ColorPallate.NeutralColor}
            height={50}
            onPress={() => {
              console.log("pressed Saved");
                navgation.navigate("Dashboard")
            }}
            borderRadius={999}
            fontFamily={"InterRegular"}
            fontSize={20}
          >
            Close
          </Button>
        </YStack>
      </YStack>
    </>
  );
};
