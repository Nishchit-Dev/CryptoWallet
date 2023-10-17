import { Text, XStack } from "tamagui"
import Menu_ from "../Assets/menu-ic.svg";
import { ColorPallate } from "../../customization/custom";


export const Scanner = ()=>{
    return<>
     <XStack
        paddingHorizontal={16}
        paddingTop={32}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={ColorPallate.BlackBackgroundColor}
      >
        <Menu_ />
        <Text fontSize={20} fontStyle="InterRegular" textAlign="center">
          Scanner
        </Text>
        {/* <QrScanner address={address} /> */}
        <XStack >
            
        </XStack>
      </XStack>

    </>
}