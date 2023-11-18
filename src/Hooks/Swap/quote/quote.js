const ethers = require("ethers");
const JSBI = require("jsbi");
const { TickMath, FullMath } = require("@uniswap/v3-sdk");
const { providers } = require("../provider/provider");
const { tokens } = require("../constant/tokens/tokens");

const getQuotefor = (
  token0,
  token1,
  amountIn,
  currentTick,
  baseTokenDecimals,
  quoteTokenDecimals
) => {
  let jsbi = JSBI;
  const SqrtRatioX192 = TickMath.getSqrtRatioAtTick(currentTick);
  const ratioX192 = jsbi.multiply(SqrtRatioX192, SqrtRatioX192);
  const baseAmount = jsbi.BigInt(amountIn * 10 ** baseTokenDecimals);
  const shift = jsbi.leftShift(jsbi.BigInt(1), jsbi.BigInt(192));
  let quoteAmount = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift);

  console.log(
    amountIn,
    " USDT -> ",
    (quoteAmount.toString() / 10 ** quoteTokenDecimals).toFixed(5),
    " WETH"
  );
  console.log(
    (amountIn / (quoteAmount.toString() / 10 ** quoteTokenDecimals)).toFixed(3),
    " USDT <- ",
    " 1 WETH"
  );
};

getQuotefor(
  tokens().USDTToken.address,
  tokens().wrappedEtherToken.address,
  1,
  200847,
  tokens().USDTToken.decimals,
  18
);
