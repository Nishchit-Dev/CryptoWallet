const ethers = require("ethers");
const { Abi } = require("../constant/abi/abi");

exports.getPoolContract = async(poolAddress, provider) => {
  const poolContract = new ethers.Contract(poolAddress, Abi.PoolAbi, provider);
  return poolContract;
};
