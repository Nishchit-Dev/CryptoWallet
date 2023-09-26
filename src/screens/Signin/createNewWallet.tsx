import { useEffect, useState } from "react";
import {
  View,
  XStack,
  YStack,
  Button,
  Stack,
  Text,
  ScrollView,
  Spinner,
} from "tamagui";
import { CreateWallet } from "../../utility/CreateWallet";
import { GetPrivateKey, StorePrivateKey } from "../../Hooks/StorePrivateKey";
import { ColorPallate } from "../../customization/custom";

export const CreateNewWallet = ({ navigation }) => {
  const [phrase, setPhrase] = useState([]);
  const [Cred,setCred] = useState(null)
  useEffect(() => {
    CreateWallet().then((res) => {
      setPhrase(res.wordlist);
      console.log(res.wordlist);
      let tempData = {
        phrase: res.phrase,
        publicKey: res.publicKey,
      };
      setCred(tempData)
    });
  }, []);

  const SavePrivateKey = ()=>{
    if(Cred != null){
        navigation.navigate("EncryptKey",{cred:Cred});
    }else{
      console.log("Cred is null")
    }
  }

  return (
    <View h="100%" > 
      <XStack p={16} >
        <YStack>
          <Text
            fontSize={26}
            color={ColorPallate.Important}
            fontFamily={"InterBold"}
          >
            Important Note
          </Text>
          <Text fontFamily={"Inter"} color={ColorPallate.NeutralColor} >
            Your private key is extremely sensitive. Treat it like a valuable
            document. Never share it with anyone and store it in a safe place.
          </Text>
        </YStack>
      </XStack>
      {phrase.length == 0 ? (
        <>
          <XStack
            fullscreen
            justifyContent="center"
            alignItems="center"

          >
            <YStack flex={1} justifyContent="center"
            alignItems="center" >
              <Spinner size="large" color="$green10" />
              <Text fontFamily={"Inter"} color={ColorPallate.NeutralColor} textAlign="center" fontSize={18}>
                Generating Private Key
              </Text>
            </YStack>
          </XStack>
        </>
      ) : (
        <></>
      )}
      <XStack flex={2}>
        <XStack p={16} flex={1} justifyContent="center">
          <YStack flex={1} gap={10} p={10}>
            {phrase.length > 0 ? (
              phrase.map((ele, i) => {
                if (phrase.length / 2 > i) {
                  return (
                    <>
                      <View flexDirection="row" gap={10} alignItems="center">
                        <Text color={"black"} fontSize={24} fontWeight={700}>
                          {i + 1}.
                        </Text>
                        <Text
                          key={i}
                          fontFamily={"Inter"}
                          flex={1}
                          color={ColorPallate.NeutralColor}
                          p={8}
                          fontSize={20}
                          borderColor={"#B78CFF"}
                          borderStyle="solid"
                          borderWidth={2}
                          borderRadius={9999}
                          textAlign="center"
                        >
                          {ele}
                        </Text>
                      </View>
                    </>
                  );
                }
              })
            ) : (
              <></>
            )}
          </YStack>
          <YStack flex={1} gap={10} p={10}>
            {phrase.length > 0 ? (
              phrase.map((ele, i) => {
                if (phrase.length / 2 <= i) {
                  console.log(ele);
                  return (
                    <>
                      <View flexDirection="row" gap={10} alignItems="center">
                        <Text color={"black"} fontSize={24} fontWeight={700}>
                          {i + 1}.
                        </Text>
                        <Text
                          key={i}
                          fontFamily={"Inter"}
                          flex={1}
                          color={ColorPallate.NeutralColor}
                          p={8}
                          fontSize={20}
                          borderColor={"#B78CFF"}
                          borderStyle="solid"
                          borderWidth={2}
                          borderRadius={9999}
                          textAlign="center"
                        >
                          {ele}
                        </Text>
                      </View>
                    </>
                  );
                }
                return <></>;
              })
            ) : (
              <></>
            )}
          </YStack>
        </XStack>
      </XStack>

      <XStack 
        justifyContent="flex-end"
        alignItems="flex-end"
      
        p={16}
      >
        <YStack flex={1}>
          <Button fontSize={20} color={ColorPallate.RegularColor} onPress={SavePrivateKey}>
            Secure Private Key
          </Button>
        </YStack>
      </XStack>
    </View>
  );
};
