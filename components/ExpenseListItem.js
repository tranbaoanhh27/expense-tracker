import { Pressable, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { COLORS } from "../constants/Colors";

import { useNavigation } from "@react-navigation/native";

const ExpenseListItem = ({ expense = { id: "", name: "", amount: 0, date: "Jan 1, 2023" } }) => {
    const navigation = useNavigation();

    const editExpense = () => {
        navigation.navigate("Edit Expense", { expenseId: expense.id });
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} android_ripple={{ color: COLORS.dark400 }} onPress={editExpense}>
                <View style={styles.info}>
                    <Text style={styles.name}>{expense.name}</Text>
                    <Text style={styles.date}>{moment(new Date(expense.date)).format("MMMM Do YYYY")}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>{`$${expense.amount.toFixed(2)}`}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.dark600,
        width: "80%",
        alignSelf: "center",
        borderRadius: 8,
        marginVertical: 8,
        elevation: 10,
        overflow: "hidden",
    },

    pressable: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    info: {
        gap: 8,
    },

    name: {
        color: "white",
        fontWeight: "bold",
    },

    date: {
        color: "white",
        fontWeight: "100",
    },

    amountContainer: {
        backgroundColor: COLORS.dark500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        minWidth: "25%",
        elevation: 10,
    },

    amountText: {
        color: COLORS.primary100,
        fontWeight: "bold",
    },
});

export default ExpenseListItem;
