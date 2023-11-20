import Uni from "../../Assets/uni-ic.svg";
export const Constant = {
  token: [
    {
      name: "Wrapped Ether",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      // address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      symbol: "WETH",
      decimals: 18,
      chainId: 5,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    },
    {
      name: "Uniswap",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      symbol: "UNI",
      decimals: 18,
      chainId: 5,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/200x200/7083.png",
    },
    {
      name: "Tether USD",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      decimals: 6,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
      extensions: {
        bridgeInfo: {
          10: {
            tokenAddress: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
          },
          56: {
            tokenAddress: "0x55d398326f99059fF775485246999027B3197955",
          },
          137: {
            tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
          },
          42161: {
            tokenAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
          },
          43114: {
            tokenAddress: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
          },
        },
      },
    },
  ],
};
