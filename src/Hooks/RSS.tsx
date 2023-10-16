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
  const [data, setData] = useState("");
  useEffect(() => {
    const run = async () => {
      const ChainID = 0x13881; // mumbai chain
      const WalletAddresss =
        address || "0x744a09F5F8ceb8AB9135842fb2Cd167dA2F517aF";
      await Moralis.EvmApi.transaction
        .getWalletTransactions({
          address: "0xCF9732Cb9A340432c8f2cfdF95151B95a1598518",
          chain: 0x13881,
        })
        .then((res) => {
          const data = res.result.map((data, i) => {
            console.log({
              from: data.from,
              to: data.to,
              amount: data.value.ether,
            });
            return {
              from: data.from,
              to: data.to,
              amount: data.value.ether,
            };
          });
        });
    };

    if (!Moralis.Core.isStarted) {
      console.log("Core: ", Moralis.Core.isStarted);
      const start = async () => {
        await Moralis.start({
          apiKey:
            "JoeCIdMuVObxJHcBxvK9TFxiEgpwIOb6rYkJpxISh9GEvtsHfv8y3ISdFPlDGy8p",
        });
      };
      start().then(() => {
        run();
      });
    } else {
      run();
    }
  }, []);
  return data;
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

  return await walletSigner.sendTransaction(tx).then((responce) => {
    console.log(responce);

    return responce.wait().then(()=>{
      return true
    })
  });
};

const extractPrivateKey = async (provider) => {
  const privateKey = await GetPrivateKey();
  const wallet = ethers.Wallet.fromPhrase(privateKey.phrase, provider);
  return wallet.privateKey;
};

export const useEstimateGas = () => {
  const [gas, setGas] = useState({});
  useEffect(() => {
    const estiamte = async () => {
      const infuraUrl =
        "https://polygon-mumbai.infura.io/v3/6d41e19677f344b2a0a73aad3d9ed668";

      const provider = new ethers.JsonRpcProvider(infuraUrl);
      const estiamtedGas = await provider.getFeeData();
      const gasInEthers  = ethers.formatEther(ethers.toNumber(estiamtedGas.gasPrice)*21000)
      console.log("Units : ",ethers.formatEther(ethers.toNumber(estiamtedGas.gasPrice)*21000));
      setGas({
        gasPrice:estiamtedGas.gasPrice,
        gasInEthers:gasInEthers
      })
    };
    estiamte();
  }, []);

  return gas
};
