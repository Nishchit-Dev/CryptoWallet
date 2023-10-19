import { createSlice } from "@reduxjs/toolkit";


export const CredSlice = createSlice({
  //name
  name: "credential",
  // what should be the inital state of the global state
  initialState: {
    address: null,
    menmonic: null,
    publicKey: null,
  },

  // reducers or methods to change state
  reducers: {
    setCredential: (state, action) => {
      state.address = action.payload;
      state.publicKey = action.payload;
      state.menmonic = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setMenmonic: (state, action) => {
      state.menmonic = action.payload;
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },

    deleteCredential: (state) => {
      state.address = null;
      state.menmonic = null;
      state.publicKey = null;
    },
  },
});

export  const {setAddress,setCredential,setMenmonic,setPublicKey,deleteCredential} = CredSlice.actions
// remeber its reducer not !! reducers 
export default CredSlice.reducer