import {
  View,
  XStack,
  YStack,
  Button,
  Stack,
  Text,
  ScrollView,
  Spinner,
  Image,
} from "tamagui";
import { ColorPallate } from "../../customization/custom";
import { useEffect, useState,useContext } from "react";
import { CreateWallet } from "../../utility/CreateWallet";
import { StorePrivateKey } from "../../Hooks/StorePrivateKey";
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
                    width={145}
                    maxHeight={55}
                  >
                    <Text fontSize={18} fontFamily={"InterRegular"}>
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
export const Menu = () => {
  return (
    <>
      <Image source={require("./menu.png")} />
    </>
  );
};

const SavePassword = ({ SavePswd }) => {
  
  
  return (
    <XStack>
      <Button
        h={55}
        borderRadius={999}
        justifyContent="center"
        alignItems="center"
        backgroundColor={ColorPallate.BrandColor}
        flex={1}
        onPress={SavePswd}
      >
        <Text fontFamily={"InterRegular"} fontSize={20}>
          Save Password
        </Text>
      </Button>
    </XStack>
  );
};

export const CreateNewWalletScreen = () => {
  const [cred, setCred] = useState(null);
  const [phrase, setPhase] = useState([]);
  const [PhraseListLeft, setLeftPhrase] = useState([]);
  const [PhraseListRight, setRightPhrase] = useState([]);
  const ContextNav = useContext(NavigationContext)
 
  const onSavePassword = () => {
    if (cred != null) {
      console.log("cred");
      StorePrivateKey(cred);
      ContextNav.navigate("Dashboard")
    }
  };
  useEffect(() => {
    const walletData = CreateWallet().then((res) => {
      let temp = res.wordlist;
      let length = temp.length;

      setLeftPhrase(temp.slice(0, Math.ceil(length / 2)));
      setRightPhrase(temp.slice(length / 2, length));

      console.log(phrase);
      console.log(PhraseListLeft);
      console.log(PhraseListRight);
      setCred(res);
    });
  }, []);
  return (
    <>
      <XStack
        paddingHorizontal={16}
        paddingTop={32}
        // marginTop={18}
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <Menu />
      </XStack>
      <YStack
        flex={1}
        p="$3"
        justifyContent="flex-start"
        backgroundColor={ColorPallate.BlackBackgroundColor}
        padding={16}
      >
        <YStack alignItems="center" justifyContent="flex-start">
          <XStack>
            <Text fontFamily={"InterBold"} fontSize={32} textAlign="center">
              Create a New Wallet
            </Text>
          </XStack>

          <XStack marginBottom={72}>
            <Text fontFamily={"Inter"} fontSize={20} textAlign="left">
              Lets generate fresh secret key or phrase for new wallet.
            </Text>
          </XStack>
          <XStack justifyContent="space-between" gap={10}>
            {PhraseListRight.length > 0 && PhraseListLeft.length > 0 ? (
              <>
                <ListOfPhrase List={PhraseListLeft} length={0} />
                <ListOfPhrase
                  List={PhraseListRight}
                  length={PhraseListRight.length}
                />
              </>
            ) : (
              <></>
            )}
          </XStack>
        </YStack>
        <YStack flex={1} justifyContent="flex-end">
          {cred != null ? (
            <>
              <SavePassword SavePswd={onSavePassword} />
            </>
          ) : (
            <>
              <Spinner size="large" color={ColorPallate.BrandColor} />
            </>
          )}
        </YStack>
      </YStack>
    </>
  );
};
