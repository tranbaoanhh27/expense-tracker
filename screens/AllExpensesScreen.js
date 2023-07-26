import { StyleSheet, View, Text } from "react-native";
import ExpensesList from "../components/ExpensesList";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/Colors";
import TotalAmountBar from "../components/TotalAmountBar";

const AllExpensesScreen = () => {
    const expenses = useSelector((store) => store.ExpensesSlice.expenses);

    if (expenses.length <= 0) {
        return (
            <View style={styles.emptyScreen}>
                <Text style={styles.text}>There is no expense</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <TotalAmountBar title="Total" expenses={expenses} />
            <ExpensesList expenses={expenses} />
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

export default AllExpensesScreen;
