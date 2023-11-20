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
  // console.log("provider <-> ", provider);

  // change the wallet
  const wallet = await getWallet(Wallet);
  // console.log("wallet -> ", wallet);

  const wallectConnted = await getWalletConnected(wallet, provider);
  // console.log("WalletConnected -> ", wallectConnted);
  // const WalletAddress = getWalletAddress();
  const WalletAddress = UserAddress;
  // console.log("wallet Address -> ", WalletAddress);
  console.log(await provider.getBalance(WalletAddress));

  // let amount = Amount ;
  let amount = Amount || 0.0001;
  console.log("amount -> ", amount);
  // 10861674 deployed block of uniswap router


  if (
    TokenInfo.TokenFrom.address ==
      "0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec" &&
    TokenInfo.TokenTo.address == "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  ) {
    const TnxRecepit = await WrapTokens(
      wallectConnted,
      provider,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "WETH",
      amount
    );

    console.log(TnxRecepit);
    let TnxSuccessfull = false;

    if (TnxRecepit.status) {
      TnxSuccessfull = true;
    }
    return TnxSuccessfull;
  } else if (
    TokenInfo.TokenFrom.address == "0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec"
  ) {
    const TnxRecepit = await WrapTokens(
      wallectConnted,
      provider,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "WETH",
      amount
    );

    TokenInfo.TokenFrom = {
      name: "Wrapped Ether",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      decimals: 18,
      chainId: 5,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    };

    console.log(TokenInfo);
  }

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
  // console.log("State -> ", state.sqrtPriceX96);

  let swapTX = await Swap_Tnx(
    provider,
    amount,
    wallectConnted,
    immutables,
    WalletAddress,
    state.sqrtPriceX96,
    TokenInfo
  );
  return swapTX;

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
};

// Swap();
