import { createSlice } from "@reduxjs/toolkit";

export const SwapTokens = createSlice({
  name: "tokenFrom",

  initialState: {
    TokenFrom: {
      address: null,
      decimals: null,
      name: null,
      symbol: null,
      logoURI:null
    },
    TokenTo: {
      address: null,
      decimals: null,
      name: null,
      symbol: null,
      logoURI:null
    },
  },

  reducers: {
    setTokenFrom: (state, action) => {
      state.TokenFrom = action.payload;
    },

    setTokenTo: (state, actions) => {
      state.TokenTo = actions.payload;
    },
  },
});

export const { setTokenFrom,setTokenTo } = SwapTokens.actions;
export default SwapTokens.reducer;
