
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
      name: "Dai Stablecoin",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      decimals: 18,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      extensions: {
        bridgeInfo: {
          10: {
            tokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          },
          56: {
            tokenAddress: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
          },
          137: {
            tokenAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
          },
          42161: {
            tokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          },
          43114: {
            tokenAddress: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
          },
        },
      },
    },
  ],
};
