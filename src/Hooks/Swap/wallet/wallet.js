const ethers = require("ethers");

const walletCred = {
  walletPrivateKey:
    "427420b2143a9612304766ad14591c5dff3f3e46b5141eeb92ad27e5451fa656",
  walletAddress: "0xCF9732Cb9A340432c8f2cfdF95151B95a1598518",
};

const forkedNetWallet = {
  walletPrivateKey:
    "0xc99c361b4506f3b533afc6cbb3652caaa470b1bcc48cfae563bad80781665788",
  walletAddress: "0x7060926ceFCE6dA135e3039A7A9659bAD1a55ffB",
};

exports.getWallet = async (phrase) => {
  // replace private key of wallet to walletCred object
  const wallet = new ethers.Wallet.fromPhrase(phrase);
  console.log("got wallet: ", walletCred.address);
  return wallet;
};

exports.getWalletConnected = async (wallet, provider) => {
  const connectWallet = await wallet.connect(provider);
  return connectWallet;
};

exports.getWalletAddress = () => {
  // replace wallet address of wallet to walletCred object
  return walletCred.walletAddress;
};
