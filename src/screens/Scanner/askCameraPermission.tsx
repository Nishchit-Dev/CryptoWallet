import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import { Dimensions } from "react-native";
import { ColorPallate } from "../../customization/custom";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const AskForPermission = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const getPremission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(status);
    };

    getPremission();
  }, []);
  const handleBarCodeScanned = (e) => {
    console.log(e);
    setScanned(true);
  };
  return (
    <>
      <BarCodeScanner
        style={{  width: screenWidth, height: screenHeight-100 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </>
  );
};
