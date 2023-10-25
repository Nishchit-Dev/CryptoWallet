import { BarCodeScanner } from "expo-barcode-scanner";
import { useContext, useEffect, useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import { Dimensions } from "react-native";
import { ColorPallate } from "../../customization/custom";
import { NavigationContext } from "@react-navigation/native";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const AskForPermission = ({ flag, setFlag }) => {
  const nav = useContext(NavigationContext);
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    const getPremission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(status);
    };

    getPremission();
  }, []);
  const handleBarCodeScanned = (e) => {
    console.log("QR_address: ",e.data);
    setFlag(true);

    if (e.data != null || e.data != "") {
      nav.navigate("SendCrypto", { QR_address: e.data });
    }
  };

  return (
    <>
      <XStack>
        <BarCodeScanner
          style={{ width: screenWidth, height: screenHeight - 100 }}
          onBarCodeScanned={flag ? undefined : handleBarCodeScanned}
        />
      </XStack>
    </>
  );
};
