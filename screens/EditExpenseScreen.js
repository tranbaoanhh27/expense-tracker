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
import Input from "../components/UI/Input";
import API from "../utils/API";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

const EditExpenseScreen = ({ route }) => {
    const navigation = useNavigation();

    const expenseId = route.params.expenseId;
    const expense = useSelector((store) => store.ExpensesSlice.expenses).find((expense) => expense.id === expenseId);

    const [expenseState, setExpenseState] = useState({
        id: expense ? expense.id : "",
        name: expense ? expense.name : "",
        nameError: expense ? null : "Name is required!",
        amount: expense ? String(expense.amount) : "",
        amountError: expense ? null : "Amount is required!",
        date: new Date(expense ? expense.date : null),
        dateError: expense ? null : "Date is required!",
        confirmable: expense ? true : false,
    });

    const [updating, setUpdating] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const validateInput = () => {
        return !expenseState.nameError && !expenseState.amountError && !expenseState.dateError;
    };

    const onNameChangeText = (text) => {
        const validateTrue = text && text.trim().length > 0;

        setExpenseState((curState) => ({
            ...curState,
            name: text,
            nameError: validateTrue ? null : "Name is required!",
        }));
    };

    const onAmountChangeText = (text) => {
        const notEmpty = text && text.trim().length > 0;
        const isNumber = !isNaN(text);

        let errorMessage = null;
        if (!notEmpty) errorMessage = "Amount is required!";
        else if (!isNumber) errorMessage = "Invalid number!";

        setExpenseState((curState) => ({
            ...curState,
            amount: text,
            amountError: errorMessage,
        }));
    };

    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate;
        setExpenseState((prev) => ({
            ...prev,
            date: currentDate,
        }));
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

    const confirm = async () => {
        const expense = {
            name: expenseState.name,
            amount: +expenseState.amount,
            date: expenseState.date.toISOString(),
        };
        setUpdating("Saving...");
        const response = await API.updateExpense(expenseId, expense);
        setUpdating(null);
        if (!response) {
            setError("An error occurred while updating this expense on the server.");
            return;
        }
        setError(null);
        dispatch(ExpensesActions.updateExpense({ id: expenseId, data: expense }));
        ToastAndroid.show("Saved", ToastAndroid.LONG);
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

    const remove = async () => {
        setUpdating("Deleting...");
        const response = await API.deleteExpense(expenseId);
        setUpdating(null);
        if (!response) {
            setError("An error occurred while deleting this expense");
            return;
        }
        setError(null);
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
            {updating && !error && <Loading text={updating} />}
            {!updating && error && <Error message={error} action={() => setError(null)} actionButtonTitle="Close" />}
            {!updating && !error && (
                <View style={styles.form}>
                    <Input
                        label="Name"
                        containerStyle={styles.inputContainer}
                        minLabelWidth="25%"
                        error={expenseState.nameError}
                        helperText={expenseState.nameError}
                        labelStyle={styles.inputLabel}>
                        <TextInput
                            value={expenseState.name}
                            onChangeText={onNameChangeText}
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#ffffff33"
                        />
                    </Input>
                    <Input
                        label="Amount ($)"
                        containerStyle={styles.inputContainer}
                        minLabelWidth="25%"
                        error={expenseState.amountError}
                        helperText={expenseState.amountError}
                        labelStyle={styles.inputLabel}>
                        <TextInput
                            value={expenseState.amount}
                            onChangeText={onAmountChangeText}
                            style={styles.input}
                            placeholder="Amount"
                            inputMode="numeric"
                            placeholderTextColor="#ffffff33"
                        />
                    </Input>
                    <Input
                        label="Date"
                        containerStyle={styles.inputContainer}
                        minLabelWidth="25%"
                        labelStyle={styles.inputLabel}>
                        <TextButton
                            title={moment(expenseState.date).format("MMMM Do YYYY")}
                            backgroundColor={COLORS.dark400}
                            borderColor={null}
                            width="100%"
                            paddingVertical={12}
                            textAlign="flex-start"
                            onPress={showDatepicker}
                        />
                    </Input>
                    <View style={styles.buttons}>
                        <TextButton
                            title="Save"
                            paddingHorizontal={36}
                            width={"100%"}
                            disabled={!validateInput()}
                            onPress={confirm}
                        />
                    </View>
                </View>
            )}
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

    inputContainer: {
        marginVertical: 8,
    },

    inputLabel: {
        color: "white",
    },

    input: {
        backgroundColor: COLORS.dark400,
        color: "white",
        width: "100%",
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
