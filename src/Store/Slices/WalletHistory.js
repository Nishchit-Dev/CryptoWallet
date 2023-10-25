import {createSlice} from '@reduxjs/toolkit'

export const WalletHistorySlice = createSlice({
    // name
    name:"walletHistory",

    // initale state
    initialState:{
        TnxHistory:[]
    },

    reducers:{
        setWalletHistory:(state,action)=>{
            state.TnxHistory = action.payload;
        }
    }
})

export const {setWalletHistory} = WalletHistorySlice.actions

export default WalletHistorySlice.reducer