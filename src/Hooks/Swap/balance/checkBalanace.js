const ethers = require("ethers");
const { Abi } = require("../constant/abi/abi");

exports.checkBalance = async (
  provider,
  tokenAddress,
  walletAddress,
  tokenSym,
  decimals
) => {
  let tokenContract;
  let balance;
  try {
    tokenContract = new ethers.Contract(tokenAddress, Abi.ERC20Abi, provider);

    balance = await tokenContract.balanceOf(walletAddress);
    console.log(
      "\nToken -> ",
      tokenSym,
      "\nTokenBalance -> ",
      ethers.formatUnits(balance.toString(), decimals)
    );
  } catch (e) {
    console.log(e);
  }
  // console.log(ethers.utils.formatUnits(balance.toString(),6))
  return ethers.formatUnits(balance.toString(), decimals);
};
