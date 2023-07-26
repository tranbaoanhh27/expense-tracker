import { createSlice } from "@reduxjs/toolkit";

export const ExpensesSlice = createSlice({
    name: "Expenses",
    initialState: {
        expenses: [],
    },
    reducers: {
        addExpense(state, action) {
            const expense = action.payload.expense;
            if (!expense) return;
            state.expenses.push(expense);
            state.expenses = state.expenses.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
        },
        removeExpense(state, action) {
            const expenseId = action.payload.expenseId;
            if (!expenseId) return;
            const index = state.expenses.findIndex((expense) => expense.id === expenseId);
            if (index === -1) return;
            state.expenses.splice(index, 1);
        },
        updateExpense(state, action) {
            const id = action.payload.id;
            const data = action.payload.data;
            if (!id || !data) return;
            const index = state.expenses.findIndex((expense) => expense.id === id);
            if (index === -1) return;
            state.expenses[index] = { ...state.expenses[index], ...data };
        },
    },
});

export const ExpensesActions = ExpensesSlice.actions;
