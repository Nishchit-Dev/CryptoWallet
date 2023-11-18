const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const {
  abi: SwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const Factory = require("../rawAbi/Factory.json");
const ERC20 = require("../rawAbi/ERC_20.json");
const Pool = require("../rawAbi/poolAbi.json");
const WrappedEther = require('../rawAbi/WrappedEtherAbi.json')
exports.Abi = {
  UniswapV3Abi: IUniswapV3PoolABI,
  SwapRouterAbi: SwapRouterABI,
  ERC20Abi: ERC20,
  Factory: Factory,
  PoolAbi: Pool,
  WrappedEtherAbi:WrappedEther
};
