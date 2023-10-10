// Import the required shims
import "@ethersproject/shims";
// Import the ethers library
import { ethers } from "ethers";

export const useFetchBalance = async (address: string) => {
  const infuraUrl =
    "https://polygon-mumbai.infura.io/v3/6d41e19677f344b2a0a73aad3d9ed668";

  const provider = new ethers.JsonRpcProvider(infuraUrl);

  const balance = await provider
    .getBalance(address || "0x744a09F5F8ceb8AB9135842fb2Cd167dA2F517aF")
    .then((res) => {
      const balanceFormatted = ethers.formatUnits(res, 18);
      console.log("balance: ", balanceFormatted);
      return balanceFormatted;
    });

  return balance;
};
