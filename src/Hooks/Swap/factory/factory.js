const ethers = require("ethers");
const { Abi } = require("../constant/abi/abi");
const { tokens } = require("../constant/tokens/tokens");
// from uniswap deplomeny webpage
const factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

exports.getPoolAddress = async (provider, tokenInfo) => {
  const factoryContract = new ethers.Contract(
    factoryAddress,
    Abi.Factory,
    provider
  );
  const poolAddress = await factoryContract.getPool(
<<<<<<< HEAD
    tokens().USDTToken.address,
    tokens().wrappedEtherToken.address,
=======
    tokenInfo.TokenTo.address,
    tokenInfo.TokenFrom.address,
>>>>>>> Swap
    10000
  );

  console.log("Pool Address  -> ", poolAddress);
  return poolAddress;
};
