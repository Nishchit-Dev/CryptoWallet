const ethers = require("ethers");
const { Abi } = require("../constant/abi/abi");

exports.WrapTokens = async (
  WalletConnected,
  provider,
  tokenAddress,
  tokenSym,
  amount
) => {
  const WrappedTokenContract = new ethers.Contract(
    tokenAddress,
    Abi.WrappedEtherAbi,
    provider
  );
  const tnx = await WrappedTokenContract.connect(WalletConnected).deposit({
    value: ethers.parseUnits(amount.toString(), 18)
  });

  const recipt = await tnx.wait()


};
