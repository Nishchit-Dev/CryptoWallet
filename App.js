import { TamaguiProvider, Text } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import { LandingScreen } from "./src/screens/LandingPage/LandingScreen";
import { SettingUpWallet } from "./src/screens/SettingupWallet/SettingUpWallet";
import { CreateNewWalletScreen } from "./src/screens/SignInMethod/privateKeyScreen";
import { Dashboard } from "./src/screens/Dashboard/Dashboard";
import { SendCypto } from "./src/screens/Send/SendCrypto";
import { Scanner } from "./src/screens/Scanner/Scanner";
import { History } from "./src/screens/History/History";
import store from "./src/Store/store";
import { Provider } from "react-redux";
import SwapScreen from "./src/screens/Swap/SwapScreen";
import { CreateNewPassword } from "./src/screens/password/CreateNewPassword";
import { ResetPassword } from "./src/screens/password/RestPassword";
import { Setting } from "./src/screens/Settings/Settings";
import { RevealSecretKey } from "./src/screens/RevealSecretKey/RevealSecretKey";

const Stack = createNativeStackNavigator();

export default function Main() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("./assets/Poppins-Regular.ttf"),
    InterBold: require("./assets/Poppins-Bold.ttf"),
    InterRegular: require("./assets/Poppins-Regular.ttf"),
    InterThin: require("./assets/Poppins-Thin.ttf"),
    InterLight: require("./assets/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <TamaguiProvider config={tamaguiConfig}>
        {/* react redux store */}

        {/* Navigation */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerShown: false,
            }}
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
            <Stack.Screen name="Swap" component={SwapScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="SendCrypto" component={SendCypto} />
            <Stack.Screen name="Scanner" component={Scanner} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="NewPassword" component={CreateNewPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Settings" component={Setting} />
            <Stack.Screen name="RevealSecretKey" component={RevealSecretKey} />
          </Stack.Navigator>
        </NavigationContainer>
      </TamaguiProvider>
    </Provider>
  );
}
