import { FlatList } from "react-native";
import ExpenseListItem from "./ExpenseListItem";

const ExpensesList = ({ expenses = [] }) => {
    return (
        <FlatList
            data={expenses}
            keyExtractor={(expense) => expense.id}
            renderItem={(itemData) => <ExpenseListItem expense={itemData.item} />}
        />
    );
};

export default ExpensesList;
