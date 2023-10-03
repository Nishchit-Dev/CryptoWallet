import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorePrivateKey = async(value: object) => {
  const jsonValue = JSON.stringify(value.route.params);
    AsyncStorage.setItem("cred", jsonValue).catch((e) => {
      console.log(e);
  });
  GetPrivateKey()
};

export const GetPrivateKey = async () => {
  const value = await AsyncStorage.getItem("cred");
  console.log("getPrivateKEy : ",value)
  return value

};

export const RemovePrivateKey = () => {
  AsyncStorage.setItem("cred", null).catch((e) => {
    console.log(e);
  });
};
