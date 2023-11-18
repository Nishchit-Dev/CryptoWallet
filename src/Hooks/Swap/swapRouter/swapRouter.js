const ethers = require("ethers");
const { tokens } = require("../constant/tokens/tokens");
const { Abi } = require("../constant/abi/abi");
const { default: BigNumber } = require("bignumber.js");

// swaprouter address deployment address of Uniswap
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const SwapTx = async (
  immutables,
  address,
  _amountIn,
  swapRouterContract,
  wallet,
  sqrtPriceX96
) => {
  let tx = {
    tokenIn: await immutables.token1(),
    tokenOut: await immutables.token0(),
    fee: await immutables.fee(),
    recipient: address,
    deadline: Math.floor(Date.now() / 1000 + 60 * 10),
    amountIn: ethers.utils.parseUnits(_amountIn.toString(), 18),
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };
  console.log("Tx -> ", tx);

  try {
    const _tx = await swapRouterContract.connect(wallet).exactInputSingle(tx, {
      gasLimit: ethers.utils.hexlify(600000),
      //   // value: ethers.utils.parseEther(_amountIn.toString(), 18),
    });
    const recepit = await _tx.wait();
    console.log("Swap-recipt -> ", recepit);
  } catch (e) {
    console.log(e);
  }
};

const approveCall = async (token0Address, approvalAmount, wallet, provider) => {
  const tokenContract0 = new ethers.Contract(
    token0Address,
    Abi.ERC20Abi,
    provider
  );

  const approvalResponse = await tokenContract0
    .connect(wallet)
    .approve(
      swapRouterAddress,
      ethers.utils.parseUnits(approvalAmount.toString(), 18)
    );

  const recipt = await approvalResponse.wait();

  console.log("Recipt -> ", recipt);
};

const Swap_Tnx = async (
  provider,
  amount,
  wallet,
  immutables,
  address,
  sqrtPriceX96
) => {
  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    Abi.SwapRouterAbi,
    provider
  );

  await approveCall(
    tokens().wrappedEtherToken.address,
    amount,
    wallet,
    provider
  );

  await SwapTx(
    immutables,
    address,
    amount,
    swapRouterContract,
    wallet,
    sqrtPriceX96
  );
};

module.exports = { approveCall, SwapTx, Swap_Tnx };
