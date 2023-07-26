import { configureStore } from "@reduxjs/toolkit";
import { ExpensesSlice } from "./slices/expenses";

export const reduxStore = configureStore({
    reducer: {
        ExpensesSlice: ExpensesSlice.reducer,
    },
});
