const ethers = require("ethers");
require('dotenv').config()

const walletCred = {    
    walletPrivateKey:process.env.walletSecret,
    walletAddress:"0xCF9732Cb9A340432c8f2cfdF95151B95a1598518"
}

const forkedNetWallet = {
  walletPrivateKey:"0x294da78f56ac598b6b84e493cb5ce60a9057afc14ed5a438e206a9e77f00fe45",
  walletAddress:"0xb743581b9325D07e37Dca72B08A04E1755b2ff56"
}

exports.getWallet = async (provider) => {
  // replace private key of wallet to walletCred object
  const wallet = new ethers.Wallet(forkedNetWallet.walletPrivateKey,provider);
  console.log("got wallet: ",wallet.address);
  return wallet;
};

exports.getWalletConnected = async (wallet, provider) => {
  const connectWallet = await wallet.connect(provider);
  return connectWallet;
};

exports.getWalletAddress = () => {
  // replace wallet address of wallet to walletCred object
  return forkedNetWallet.walletAddress;
};
