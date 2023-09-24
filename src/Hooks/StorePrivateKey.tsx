import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorePrivateKey = (value:object) => {
  const jsonValue = JSON.stringify(value);
  AsyncStorage.setItem("cred", jsonValue).catch((e) => {
    console.log(e);
  });
};

export const GetPrivateKey = async () => {
  const value = await AsyncStorage.getItem("cred");
  console.log(value);
  return value;
};

export const RemovePrivateKey = () => {
  AsyncStorage.setItem("cred", null).catch((e) => {
    console.log(e);
  });
};
