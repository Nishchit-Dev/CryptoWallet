const ethers = require("ethers");

const infura = {
  goerli: "https://goerli.infura.io/v3/6d41e19677f344b2a0a73aad3d9ed668",
  sepolia: "https://sepolia.infura.io/v3/6d41e19677f344b2a0a73aad3d9ed668",
};
const forked = {
  MainNet: "http://10.0.2.2:8545/",
};


exports.providers = () => {
  return {
<<<<<<< HEAD
    
    sepolia: new ethers.JsonRpcProvider(infura.sepolia),
    goerli: new ethers.JsonRpcProvider(infura.goerli),
    forkedMainet: new ethers.JsonRpcProvider(forked.MainNet)
    
=======
    sepolia: new ethers.JsonRpcProvider(infura.sepolia),
    goerli: new ethers.JsonRpcProvider(forked.MainNet),
    forkedMainet: new ethers.JsonRpcProvider(forked.MainNet),
>>>>>>> Swap
  };
};
