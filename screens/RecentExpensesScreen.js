import { useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import TotalAmountBar from "../components/TotalAmountBar";
import ExpensesList from "../components/ExpensesList";
import { COLORS } from "../constants/Colors";

const RecentExpensesScreen = () => {
    const expenses = useSelector((store) => store.ExpensesSlice.expenses);

    const recentExpenses = expenses.filter((expense) => {
        const currentDate = new Date();
        currentDate.setHours(23, 59, 59, 999);
        const expenseDate = new Date(expense.date);
        const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
        return currentDate - expenseDate <= SEVEN_DAYS;
    });

    if (recentExpenses.length <= 0) {
        return (
            <View style={styles.emptyScreen}>
                <Text style={styles.text}>There is no expense in the last 7 days</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <TotalAmountBar title="Last 7 days" expenses={recentExpenses} />
            <ExpensesList expenses={recentExpenses} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.dark500,
        paddingTop: 32,
    },

    emptyScreen: {
        flex: 1,
        backgroundColor: COLORS.dark500,
        paddingTop: 32,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: "white",
        fontWeight: "500",
        fontSize: 16,
    },
});

export default RecentExpensesScreen;
