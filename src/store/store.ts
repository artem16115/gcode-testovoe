import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './companySlice'

export const store = configureStore({
    reducer: {
        companyReducer
    },
})

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>