const ethers = require("ethers");
const { tokens } = require("../constant/tokens/tokens");
const { Abi } = require("../constant/abi/abi");
const { providers } = require("../provider/provider");

// swaprouter address deployment address of Uniswap
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const SwapTx = async (
  immutables,
  address,
  _amountIn,
  swapRouterContract,
  wallet,
  sqrtPriceX96,
  TokenInfo
) => {
  let tx = {
    // swap this two
    tokenIn: TokenInfo.TokenFrom.address,
    tokenOut: TokenInfo.TokenTo.address,

    fee: await immutables.fee(),
    recipient: address,
    deadline: Math.floor(Date.now() / 1000 + 60 * 10),
    amountIn: ethers.parseUnits(_amountIn.toString(), 18),
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };
  console.log("new Tx -> ", tx);
  let estimateGas = await providers().forkedMainet.estimateGas(tx);
  console.log(estimateGas);
  // const estimate = await swapRouterContract.connect(wallet).exactInputSingle(tx).estimateGas();
  // console.log("estimate -> ", estimate);
  try {
    const _tx = await swapRouterContract.connect(wallet).exactInputSingle(tx, {
      gasLimit: ethers.hexlify("0x900000"),
      nonce: await providers().forkedMainet.getTransactionCount(address),
      //   // value: ethers.utils.parseEther(_amountIn.toString(), 18),
    });
    const recepit = await _tx.wait();
    console.log("Swap-recipt -> ", recepit);

    return recepit.status == 0 ? false : true;
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
      ethers.parseUnits(approvalAmount.toString(), 18)
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
  sqrtPriceX96,
  TokenInfo
) => {
  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    Abi.SwapRouterAbi,
    provider
  );
  console.log(TokenInfo.TokenFrom);
  await approveCall(
    // swaping this also
    TokenInfo.TokenFrom.address,
    amount,
    wallet,
    provider
  );

  return await SwapTx(
    immutables,
    address,
    amount,
    swapRouterContract,
    wallet,
    sqrtPriceX96,
    TokenInfo
  );
};

module.exports = { approveCall, SwapTx, Swap_Tnx };
