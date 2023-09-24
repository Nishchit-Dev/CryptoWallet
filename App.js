import { TamaguiProvider, Text } from "tamagui";
import tamaguiConfig from "./tamagui.config";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "./src/screens/Signin/SignInScreen";
import { Dashboard } from "./src/screens/Dashboard/Dashboard";
import { Receive } from "./src/screens/Receive/Receive";
import { Send } from "./src/screens/Send/Send";
import { Swap } from "./src/screens/Swap/Swap";
import { useFonts } from "expo-font";
import { PrivateKeyScreen } from "./src/screens/privatekey/privateKeyScreen";
import { ColorPallate } from "./src/customization/custom";
import { EncryptKey } from "./src/screens/Pin/encryptPrivateKeyScreen";

const Stack = createNativeStackNavigator();

export default function App() {
 

  const [fontsLoaded, fontError] = useFonts({
    Inter: require("./assets/Poppins-Regular.ttf"),
    InterBold: require("./assets/Poppins-Bold.ttf"),
  });

  if(!fontsLoaded){
    return null
  }
  return (
    <TamaguiProvider config={tamaguiConfig}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Crypto Wallet"
            component={SignIn}
            options={{ title: "Private Key" }}
          ></Stack.Screen>
          <Stack.Screen name="EncryptKey" component={EncryptKey} />
          <Stack.Screen name="PriavteKey" component={PrivateKeyScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{title:"Dashboard"}}/>
          <Stack.Screen name="Receive" component={Receive} options={{title:"Receive"}} />
          <Stack.Screen name="Send" component={Send} options={{title:"Send"}} />
          <Stack.Screen name="Swap" component={Swap} options={{title:"Swap"}} />
        </Stack.Navigator>
      </NavigationContainer>

    </TamaguiProvider>
  );
}

