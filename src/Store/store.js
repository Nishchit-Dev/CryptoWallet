import { configureStore } from "@reduxjs/toolkit";
import credentialReducers from './Slices/CredSlice'

export default configureStore({
    reducer:{credentialReducers}
})