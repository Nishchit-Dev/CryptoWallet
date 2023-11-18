import { configureStore } from "@reduxjs/toolkit";
import credentialReducers from './Slices/CredSlice'
import walletHistoryReducers from './Slices/WalletHistory'
import swapTokensReducers from './Slices/SwapSlice'
// this names are used to useSelector 
export default configureStore({
    reducer:{
        credentialReducer:credentialReducers,
        history:walletHistoryReducers,
        swapTokens:swapTokensReducers
    }
})