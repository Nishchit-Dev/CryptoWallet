// Import the required shims
import "@ethersproject/shims";
// Import the ethers library
import { ethers } from "ethers";
import { GetPrivateKey } from "./StorePrivateKey";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { providers } from "../Hooks/Swap/provider/provider";
export const useFetchBalance = async (
  address: string,
  currentAmount,
  setAmount
) => {

  const provider = providers().forkedMainet

  let balance;
  setInterval(async () => {
    return (balance = await provider.getBalance(address).then((res) => {
      const balanceFormatted = ethers.formatUnits(res,18);
      console.log("balance: ", balanceFormatted);
      if (currentAmount != parseFloat(balanceFormatted).toFixed(6)) {
        setAmount(parseFloat(balanceFormatted).toFixed(5));
      }
      return balanceFormatted;
    }));
  }, 15 * 1000);
};

export const useFetchHistroy = (address) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const run = async () => {
      const ChainID = 0x5; // mumbai chain
      const WalletAddresss = address;
      await Moralis.EvmApi.transaction
        .getWalletTransactions({
          address: WalletAddresss,
          chain: ChainID,
        })
        .then((res) => {
          const TempData = res.result.map((data, i) => {
            return {
              from: data.from.lowercase,
              to: data.to.checksum,
              amount: data.value.ether,
            };
          });
          console.log(TempData);
          setData(TempData);
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

export const useSendCrypto = async (txData) => {
  const provider = providers().goerli;
  const privateKey = await extractPrivateKey(provider);
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(provider);
  let gasPrice = await provider.getFeeData();

  const tx = {
    from: txData.sender,
    to: txData.receipent,
    value: ethers.parseEther(txData.amount),
    nonce: await provider.getTransactionCount(txData.sender, "latest"),
    gasLimit: 0x100000, // 100000
    gasPrice: gasPrice.gasPrice,
  };

  return await walletSigner
    .sendTransaction(tx)
    .then((responce) => {
      console.log(responce);

      return responce.wait().then(async (res) => {
        const confirm = await res.confirmations();
        console.log(confirm);
        return true;
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
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

      // const provider = new ethers.JsonRpcProvider(infuraUrl);
      const provider = providers().goerli
      let estiamtedGas = await provider.getFeeData();
      let gasInEthers = ethers.formatEther(
        ethers.toNumber(estiamtedGas.gasPrice) * 21000
      );
      setGas({
        gasPrice: estiamtedGas.gasPrice,
        gasInEthers: gasInEthers,
      });

      setInterval(async () => {
        estiamtedGas = await provider.getFeeData();
        gasInEthers = ethers.formatEther(
          ethers.toNumber(estiamtedGas.gasPrice) * 21000
        );
        console.log(
          "Units : ",
          ethers.formatEther(ethers.toNumber(estiamtedGas.gasPrice) * 21000)
        );
        setGas({
          gasPrice: estiamtedGas.gasPrice,
          gasInEthers: gasInEthers,
        });
      }, 15 * 1000);
    };
    estiamte();
  }, []);

  return gas || 0;
};
