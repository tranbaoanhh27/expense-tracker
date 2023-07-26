import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/Colors";

const TotalAmountBar = ({ title = "Total", expenses = [{ id: "id", name: "name", amount: 0, date: "date" }] }) => {
    let total = 0;
    for (const expense of expenses) total += expense.amount;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>{`$${total.toFixed(2)}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignSelf: "center",
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: COLORS.primary100,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: COLORS.primary500,
        fontWeight: "bold",
    },

    amount: {
        color: COLORS.primary500,
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default TotalAmountBar;
