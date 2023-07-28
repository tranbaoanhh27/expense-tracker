import axios from "axios";

const API = {};
const BASE_URL = "https://react-native-expense-tra-856f8-default-rtdb.asia-southeast1.firebasedatabase.app";

API.getExpenses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/expenses.json`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

API.postExpense = async (expense = { name: "", amount: 0, date: new Date() }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/expenses.json`,
            JSON.stringify({
                name: expense.name,
                amount: expense.amount,
                date: expense.date,
            })
        );
        return response.data.name;
    } catch (error) {
        console.log(error);
        return null;
    }
};

API.updateExpense = async (id, data = { name: "", amount: 0, date: new Date() }) => {
    try {
        const response = await axios.put(`${BASE_URL}/expenses/${id}.json`, data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

API.deleteExpense = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/expenses/${id}.json`);
        console.log(response.data);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default API;
