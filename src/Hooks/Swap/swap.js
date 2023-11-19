const Constant = require("../../screens/Swap/components/Constant");
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

export const Swap = async (Amount, TokenInfo, Wallet, UserAddress) => {
  // test-net goerli
  //   const provider = providers().goerli;

  const provider = providers().goerli;
  console.log("provider <-> ", provider);

  // change the wallet
  const wallet = await getWallet(Wallet);
  console.log("wallet -> ", wallet);

  const wallectConnted = await getWalletConnected(wallet, provider);
  // console.log("WalletConnected -> ", wallectConnted);
  // const WalletAddress = getWalletAddress();
  const WalletAddress = UserAddress;
  console.log("wallet Address -> ", WalletAddress);
  console.log(await provider.getBalance(WalletAddress));

  // let amount = Amount ;
  let amount = Amount || 0.0001;

  // 10861674 deployed block of uniswap router

  // will be changed to

  // ETH -> UNI
  // if (
  //   (TokenInfo.TokenFrom.address ==
  //     "0x4f7A67464B5976d7547c860109e4432d50AfB38e" &&
  //     TokenInfo.TokenTo.address ==
  //       "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984") ||
  //   // ETH->WETH
  //   (TokenInfo.TokenFrom.address ==
  //     "0x4f7A67464B5976d7547c860109e4432d50AfB38e" &&
  //     TokenInfo.TokenTo.address == "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6")
  // ) {
  if (
    TokenInfo.TokenFrom.address == "0x4f7A67464B5976d7547c860109e4432d50AfB38e"
  ) {
    const TnxRecepit = await WrapTokens(
      wallectConnted,
      provider,
      tokens().wrappedEtherToken.address,
      tokens().wrappedEtherToken.symbol,
      amount
    );

    TokenInfo.TokenFrom = {
      name: "Wrapped Ether",
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      symbol: "WETH",
      decimals: 18,
      chainId: 5,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    };

    console.log(TokenInfo);
  }

  // return TnxRecepit;
  // GETH -> WETH
  // }

  // if swaping uni -> weth no need of this
  // only needed when swaping Eth -> weth-> uni

  /* 
  await WrapTokens(
    wallectConnted,
    provider,
    tokens().wrappedEtherToken.address,
    tokens().wrappedEtherToken.symbol,
    amount
  );
*/

  await checkBalance(
    provider,
    TokenInfo.TokenFrom.address,
    WalletAddress,
    TokenInfo.TokenFrom.symbol,
    TokenInfo.TokenFrom.decimals
  );
  await checkBalance(
    provider,
    TokenInfo.TokenTo.address,
    WalletAddress,
    TokenInfo.TokenTo.symbol,
    TokenInfo.TokenTo.decimals
  );

  const poolAddress = await getPoolAddress(provider, TokenInfo);
  console.log("poolAddress -> ", poolAddress);
  const poolContract = await getPoolContract(poolAddress, provider);
  // console.log("poolContract -> ", poolContract);

  const immutables = await getPoolImmutables(poolContract);
  console.log("Immutables -> ", immutables);

  const state = await getPoolState(poolContract);
  console.log("State -> ", state.sqrtPriceX96);

  /*
   */
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
    state.sqrtPriceX96,
    TokenInfo
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
    tokens().uniswapToken.address,
    WalletAddress,
    tokens().uniswapToken.symbol,
    tokens().uniswapToken.decimals
  );
};

// Swap();
