import AsyncStorage from "@react-native-async-storage/async-storage";
import cryptoJs from "crypto-js";
export const StorePrivateKey = async (value: object) => {
  const jsonValue = JSON.stringify(value);
  encryptKey(jsonValue).then((EcnvryptedCredentials) => {
    AsyncStorage.setItem("cred", EcnvryptedCredentials).catch((e) => {
      console.log(e);
    });
  });

  GetPrivateKey();
};

export const GetPrivateKey = async () => {
  const value = await AsyncStorage.getItem("cred");
  console.log(value)
  return decrypt(value).then(cred=>{
    console.log("cred: ",cred)
    return JSON.parse(cred)})
};
export const DoesPrivateKeyExist = async () => {
  const value = await AsyncStorage.getItem("cred");

  console.log("getPrivateKEy : ", value);
  if (value == null) {
    return false;
  } else {
    return true;
  }
};

export const RemovePrivateKey = () => {
  AsyncStorage.setItem("cred", null).catch((e) => {
    console.log(e);
  });
};

const encryptKey = async (data: any) => {
  let encryptedCred = cryptoJs.AES.encrypt(data, "privateKey").toString();
  // console.log(encryptedCred)
  return encryptedCred;
};

const decrypt = async (encryptedCred: any) => {
  let bytes = cryptoJs.AES.decrypt(encryptedCred, "privateKey");
  var originalText = bytes.toString(cryptoJs.enc.Utf8);
  console.log(originalText);
  return originalText;
};
