
const Uni_Token = {
  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  decimals: 18,
  symbol: "Uni-Tokens",
};
const WrappedEther_Token = {
  address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  decimals: 18,
  symbol: "WrappedETH",
};

const WrappedBTC = {
  address:"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  decimals:8,
  symbol:"WBTC"
}

const USDT_Token = {
  address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",
  decimals:6,
  symbol:"USDT"
}

exports.tokens = () => {
  return {
    uniswapToken: Uni_Token,
    wrappedEtherToken: WrappedEther_Token,
  };
};
