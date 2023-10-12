// Import the required shims
import "@ethersproject/shims";
// Import the ethers library
import { ethers } from "ethers";
import { GetPrivateKey } from "./StorePrivateKey";
import Moralis from "moralis";
import { useState, useEffect } from "react";

export const useFetchBalance = async (
  address: string,
  currentAmount,
  setAmount
) => {
  const infuraUrl =
    "https://polygon-mumbai.infura.io/v3/6d41e19677f344b2a0a73aad3d9ed668";

  const provider = new ethers.JsonRpcProvider(infuraUrl);

  let balance;
  setInterval(async () => {
    return (balance = await provider
      .getBalance(address || "0x744a09F5F8ceb8AB9135842fb2Cd167dA2F517aF")
      .then((res) => {
        const balanceFormatted = ethers.formatUnits(res, 18);
        console.log("balance: ", balanceFormatted);
        if (currentAmount != balanceFormatted) {
          setAmount(parseFloat(balanceFormatted).toFixed(4));
        }
        return balanceFormatted;
      }));
  }, 10 * 1000);
};

export const useFetchHistroy = async (address) => {

    let flag = true;

    if (flag) {
      (async () => {
        flag = false;
        await Moralis.start({
          apiKey:
            "JoeCIdMuVObxJHcBxvK9TFxiEgpwIOb6rYkJpxISh9GEvtsHfv8y3ISdFPlDGy8p",
        });
        const ChainID = 80001;
        const WalletAddresss =
          address || "0x744a09F5F8ceb8AB9135842fb2Cd167dA2F517aF";
        const History = await Moralis.EvmApi.transaction
          .getWalletTransactions({
            address: WalletAddresss,
            chain: ChainID,
          })
          .then((res) => {
            console.log(res.toJSON());
          });
        console.log(history);

        
      })();
    }

    

};

export const useSendCrypto = async (address, txData) => {
  const infuraUrl =
    "https://polygon-mumbai.infura.io/v3/6d41e19677f344b2a0a73aad3d9ed668";

  const provider = new ethers.JsonRpcProvider(infuraUrl);
  const privateKey = await extractPrivateKey(provider);
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  const gasPrice = await provider.getFeeData();

  const tx = {
    from: txData.sender,
    to: txData.receipent,
    value: ethers.parseEther(txData.amount),
    nonce: await provider.getTransactionCount(txData.sender, "latest"),
    gasLimit: 0x100000, // 100000
    gasPrice: gasPrice.gasPrice,
  };

  walletSigner.sendTransaction(tx).then((res) => {
    console.log(res);
  });
};

const extractPrivateKey = async (provider) => {
  const privateKey = await GetPrivateKey();
  const wallet = ethers.Wallet.fromPhrase(privateKey.phrase, provider);
  return wallet.privateKey;
};
