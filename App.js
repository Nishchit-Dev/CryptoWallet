import { TamaguiProvider, Text } from "tamagui";
import tamaguiConfig from "./tamagui.config";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import { LandingScreen } from "./src/screens/LandingPage/LandingScreen";
import { SettingUpWallet } from "./src/screens/SettingupWallet/SettingUpWallet";
import { CreateNewWalletScreen } from "./src/screens/SignInMethod/privateKeyScreen";
import { Dashboard } from "./src/screens/Dashboard/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("./assets/Poppins-Regular.ttf"),
    InterBold: require("./assets/Poppins-Bold.ttf"),
    InterRegular: require("./assets/Poppins-Regular.ttf"),
    InterThin: require("./assets/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerBackTitleVisible: false, headerShown: false }}
        >
          <Stack.Screen
            name="Crypto Wallet"
            component={LandingScreen}

            // options={{ title: "Private Key" }}
          ></Stack.Screen>

          <Stack.Screen name="SettingUpWallet" component={SettingUpWallet} />
          <Stack.Screen
            name="CreateNewWallet"
            component={CreateNewWalletScreen}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
