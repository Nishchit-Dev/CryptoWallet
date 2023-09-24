import "react-native-get-random-values"
import "@ethersproject/shims"

const ether = require("ethers")

export const CreateWallet = async()=>{
    const wallet = ether.Wallet.createRandom();
    const {address,publicKey} = wallet;
    const phrase = wallet.mnemonic.phrase
    const wordlist = phrase.split(" ")
    

    console.log("address : ",address)
    console.log("publicKey : ",publicKey)
    console.log("worldlist : ",wordlist, typeof wordlist)

    return {
        address,
        publicKey,
        wordlist,
        phrase
    }
}