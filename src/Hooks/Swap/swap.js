const { getPoolImmutables } = require("./pool/getPoolImmutables");
const { getPoolState } = require("./pool/getPoolState");

const { checkBalance } = require("./balance/checkBalanace");
const { tokens } = require("./constant/tokens/tokens");
const { getPoolAddress } = require("./factory/factory");
const { getPoolContract } = require("./pool/getPoolContract");
const { providers } = require("./provider/provider");
const { approveCall, SwapTx, Swap_Tnx } = require("./swapRouter/swapRouter");
const {
  getWallet,
  getWalletConnected,
  getWalletAddress,
} = require("./wallet/wallet");
const { WrapTokens } = require("./wrappEth/wrapToken");

const Swap = async () => {
  // test-net goerli
  //   const provider = providers().goerli;
  const provider = providers().forkedMainet;

  // console.log("provider -> ", provider);
  const wallet = await getWallet();
  console.log("wallet -> ", wallet);
  const wallectConnted = await getWalletConnected(wallet, provider);
  // console.log("WalletConnected -> ", wallectConnted);

  const WalletAddress = getWalletAddress();
  console.log("wallet Address -> ", WalletAddress);

  let amount = 10;
// 10861674 deployed block of uniswap router
  await WrapTokens(
    wallectConnted,
    provider,
    tokens().wrappedEtherToken.address,
    tokens().wrappedEtherToken.symbol,
    amount
  );
  await checkBalance(
    provider,
    tokens().wrappedEtherToken.address,
    WalletAddress,
    tokens().wrappedEtherToken.symbol,
    tokens().wrappedEtherToken.decimals
  );
  await checkBalance(
    provider,
    tokens().WBTCToken.address,
    WalletAddress,
    tokens().WBTCToken.symbol,
    tokens().WBTCToken.decimals
  );

  const poolAddress = await getPoolAddress(provider);
  console.log("poolAddress -> ", poolAddress);

  const poolContract = await getPoolContract(poolAddress, provider);
  // console.log("poolContract -> ", poolContract);

  const immutables = await getPoolImmutables(poolContract);
  console.log("Immutables -> ", immutables);

  const state = await getPoolState(poolContract);
  console.log("State -> ", state.sqrtPriceX96);

  // using Weth -> Uni
  //   let amount = 10;

  // using Uni -> Weth
  //   let amount = 0.

    // const approveCallReceipt = await approveCall(tokens().wrappedEtherToken.address,amount,wallectConnted,provider)
  let swapTX = await Swap_Tnx(
    provider,
    amount,
    wallectConnted,
    immutables,
    WalletAddress,
    state.sqrtPriceX96
  );

  await checkBalance(
    provider,
    tokens().wrappedEtherToken.address,
    WalletAddress,
    tokens().wrappedEtherToken.symbol,
    tokens().wrappedEtherToken.decimals
  );
  await checkBalance(
    provider,
    tokens().WBTCToken.address,
    WalletAddress,
    tokens().WBTCToken.symbol,
    tokens().WBTCToken.decimals
  );
  await checkBalance(
    provider,
    tokens().WBTCToken.address,
    "0x6Ab3bba2F41e7eAA262fa5A1A9b3932fA161526F",
    tokens().WBTCToken.symbol,
    tokens().WBTCToken.decimals
  );
};

Swap();
