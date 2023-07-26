import { useEffect, useState } from "react";
import IoniconButton from "../components/UI/IoniconButton";
import { COLORS } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { ExpensesActions } from "../redux/slices/expenses";
import { Alert, ToastAndroid, View, TextInput, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import TextButton from "../components/UI/TextButton";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const EditExpenseScreen = ({ route }) => {
    const navigation = useNavigation();

    const expenseId = route.params.expenseId;
    const expense = useSelector((store) => store.ExpensesSlice.expenses).find((expense) => expense.id === expenseId);

    const [expenseState, setExpenseState] = useState({
        id: expense ? expense.id : "",
        name: expense ? expense.name : "",
        amount: expense ? String(expense.amount) : "",
        date: new Date(expense ? expense.date : null),
    });
    const dispatch = useDispatch();

    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate;
        setExpenseState((prev) => ({ ...prev, date: currentDate }));
    };

    const showDateTimePicker = (currentMode) => {
        DateTimePickerAndroid.open({
            value: expenseState.date,
            onChange: onChangeDateTime,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showDateTimePicker("date");
    };

    const confirm = () => {
        const expense = {
            id: expenseId,
            name: expenseState.name,
            amount: +expenseState.amount,
            date: expenseState.date.toISOString(),
        };
        dispatch(ExpensesActions.updateExpense({ id: expenseId, data: expense }));
        ToastAndroid.show("Updated", ToastAndroid.LONG);
        navigation.goBack();
    };

    const removeConfirm = () => {
        Alert.alert("Remove Expense", "Are you sure that you want to remove this expense?", [
            {
                text: "CANCEL",
                style: "cancel",
            },
            {
                text: "YES",
                style: "destructive",
                onPress: remove,
            },
        ]);
    };

    const remove = () => {
        dispatch(ExpensesActions.removeExpense({ expenseId }));
        ToastAndroid.show("Removed", ToastAndroid.LONG);
        navigation.goBack();
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IoniconButton
                    name="ios-trash"
                    color={COLORS.danger}
                    rippleColor={COLORS.danger}
                    size={22}
                    onPress={removeConfirm}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <View style={styles.form}>
                <TextInput
                    value={expenseState.name}
                    onChangeText={(text) => setExpenseState((prev) => ({ ...prev, name: text }))}
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="white"
                />
                <TextInput
                    value={expenseState.amount}
                    onChangeText={(text) => setExpenseState((prev) => ({ ...prev, amount: text }))}
                    style={styles.input}
                    placeholder="Amount"
                    inputMode="numeric"
                    placeholderTextColor="white"
                />
                <TextButton
                    title={moment(expenseState.date).format("MMMM Do YYYY")}
                    backgroundColor={COLORS.dark400}
                    borderColor={null}
                    width="100%"
                    paddingVertical={12}
                    marginVertical={8}
                    textAlign="flex-start"
                    onPress={showDatepicker}
                />
                <View style={styles.buttons}>
                    <TextButton title="Save" paddingHorizontal={36} width={"100%"} onPress={confirm} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.dark500,
    },

    form: {
        width: "75%",
        alignSelf: "center",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        backgroundColor: COLORS.dark400,
        color: "white",
        width: "100%",
        marginVertical: 8,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    buttons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 8,
    },
});

export default EditExpenseScreen;
