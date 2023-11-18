exports.getPoolState = async (poolContract) => {
  const slot = await poolContract.slot0();

  const state = {
    sqrtPriceX96: slot[0],
  };

  return state;
};
