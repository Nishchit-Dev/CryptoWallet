import { XStack, Text } from "tamagui";
import Menu from "../../Assets/menu-ic.svg";
import { useContext, useState } from "react";
import { ColorPallate } from "../../../customization/custom";
import { NavigationContext } from "@react-navigation/native";
import { Nav } from "../../NavBar/NavBar";
export const StatusBar = ({ Title, Svg, actionOnIcon }) => {
  const navigation = useContext(NavigationContext);
  const [NavOpen,setNavOpen] = useState(false)

  return (
    <>
    {
        NavOpen?
        <Nav flag={NavOpen} setFlag={setNavOpen}/>:<></>
    }
      <XStack
        paddingHorizontal={16}
        paddingTop={32}
        paddingBottom={10}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <XStack
          onPress={() => {
            if (NavOpen != null) {
              setNavOpen(!NavOpen);
            }
          }}
        >
          <Menu />
        </XStack>

        <Text fontSize={20} fontFamily="InterRegular" paddingRight={Svg!=null?0:45}>
          {Title ? Title:"Enter Title"}
        </Text>
        <XStack
          onPress={() => {
            navigation.navigate("Scanner");
          }}
        >
          {/* Custom SVG here */}
          <XStack
            onPress={() => {
              if (actionOnIcon != null) {
                actionOnIcon();
              }
            }}
          >
            {Svg != null ? <Svg /> : <></>}
          </XStack>
        </XStack>
      </XStack>
    </>
  );
};
