import { ScrollView, Text, XStack, YStack } from "tamagui";
import { StatusBar } from "../Components/Status/Status";
import { ColorPallate } from "../../customization/custom";
import { shortAddress } from "../../utility/utility";
import { useFetchHistroy } from "../../Hooks/RSS";
import { useSelector } from "react-redux";

const TnxComponent = ({ TnxList, address }) => {
  const SendOrReceiveStatus = (to, address) => {
    if (to != address) {
      // Red - send ethers

      return ColorPallate.Failure;
    }

    return ColorPallate.Success;
  };
  return (
    <>
      {TnxList.length > 0 ? (
        TnxList.map((data, index) => {
          return (
            <YStack
              key={index}
              gap={10}
              marginVertical={5}
              flex={1}
              borderRadius={8}
              backgroundColor={ColorPallate.BlackLightBackgroundColor}
            >
              <YStack gap={10} flexDirection="row" padding={3}>
                <YStack
                  marginLeft={3}
                  marginVertical={4}
                  width={5}
                  borderRadius={999}
                  backgroundColor={SendOrReceiveStatus(data.to, address)}
                ></YStack>
                <YStack padding={8}>
                  <Text
                    color={ColorPallate.FontLightColor}
                    fontSize={16}
                    fontFamily={"InterRegular"}
                  >
                    From : {shortAddress(data.from)}
                  </Text>
                  <Text
                    color={ColorPallate.FontLightColor}
                    fontSize={16}
                    fontFamily={"InterRegular"}
                  >
                    To : {shortAddress(data.to)}
                  </Text>
                  <Text fontSize={20} fontFamily={"InterBold"}>
                    Amount : {(data.amount)} Eth
                  </Text>
                </YStack>
              </YStack>
            </YStack>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export const History = () => {
  const address = useSelector((state)=>{
    return state.credentialReducer.address
  })
  const TnxList = useFetchHistroy(address);
  console.log(TnxList);
  return (
    <>
      <StatusBar
        Title={"History"}
        Svg={null}
        navFlag={null}
        setNav={null}
        actionOnIcon={null}
      />
      <XStack
        padding={16}
        flex={1}
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <XStack flexDirection="column" gap={10} flex={1}>
          <YStack>
            <Text fontSize={24} fontFamily={"InterRegular"}>
              Transaction History
            </Text>
          </YStack>

          <ScrollView flex={1}>
            <TnxComponent TnxList={TnxList} address={address} />
          </ScrollView>
        </XStack>
      </XStack>
    </>
  );
};
 