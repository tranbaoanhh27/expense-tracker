import { Dimensions, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/Colors";
import IoniconButton from "./UI/IoniconButton";
import TextButton from "./UI/TextButton";
import { useState } from "react";
import { ExpensesActions } from "../redux/slices/expenses";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import Input from "./UI/Input";

const AddExpenseModal = ({ visible = false, onClose = () => {} }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());

    const [nameError, setNameError] = useState(null);
    const [amountError, setAmountError] = useState(null);

    const dispatch = useDispatch();

    const validateInput = () => {
        const validName = validateName(name);
        const validAmount = validateAmount(amount);
        return validName && validAmount;
    };

    const validateName = (text) => {
        const validateTrue = text && text.trim().length > 0;
        setNameError(validateTrue ? null : "Name is required!");
        return validateTrue;
    };

    const onNameChangeText = (text) => {
        setName(text);
        validateName(text);
    };

    const validateAmount = (text) => {
        const notEmpty = text && text.trim().length > 0;
        const isNumber = !isNaN(text);

        let errorMessage = null;
        if (!notEmpty) errorMessage = "Amount is required!";
        else if (!isNumber) errorMessage = "Invalid number!";

        setAmountError(errorMessage);
        return notEmpty && isNumber;
    };

    const onAmountChangeText = (text) => {
        setAmount(text);
        validateAmount(text);
    };

    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(selectedDate);
        setDate(currentDate);
    };

    const showDateTimePicker = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: onChangeDateTime,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showDateTimePicker("date");
    };

    const showTimepicker = () => {
        showDateTimePicker("time");
    };

    const resetInput = () => {
        setName("");
        setAmount("");
        setNameError(null);
        setAmountError(null);
        setDate(new Date());
    };

    const confirm = () => {
        if (!validateInput()) return;
        const expense = {
            id: `${name}${new Date().toUTCString()}${Math.random()}`,
            name: name,
            amount: +amount,
            date: date.toISOString(),
        };
        dispatch(ExpensesActions.addExpense({ expense }));
        resetInput();
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.headerContainer}>
                        <IoniconButton
                            name="caret-down"
                            color="white"
                            size={20}
                            padding={0}
                            rippleColor={COLORS.dark500}
                            onPress={onClose}
                        />
                        <Text style={styles.headerText}>Add New Expense</Text>
                    </View>
                    <View style={styles.form}>
                        <Input
                            label="Name"
                            containerStyle={styles.inputContainer}
                            minLabelWidth="25%"
                            error={nameError}
                            helperText={nameError}
                            labelStyle={styles.inputLabel}>
                            <TextInput
                                value={name}
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
                            error={amountError}
                            helperText={amountError}
                            labelStyle={styles.inputLabel}>
                            <TextInput
                                value={amount}
                                onChangeText={onAmountChangeText}
                                style={styles.input}
                                placeholder="Amount"
                                inputMode="numeric"
                                placeholderTextColor="#ffffff33"
                            />
                        </Input>
                        <Input
                            label="Amount"
                            containerStyle={styles.inputContainer}
                            minLabelWidth="25%"
                            labelStyle={styles.inputLabel}>
                            <TextButton
                                title={moment(date).format("MMMM Do YYYY")}
                                backgroundColor={COLORS.dark400}
                                borderColor={null}
                                width="100%"
                                paddingVertical={12}
                                marginVertical={8}
                                textAlign="flex-start"
                                onPress={showDatepicker}
                            />
                        </Input>
                        <View style={styles.buttons}>
                            <TextButton
                                title="Reset"
                                backgroundColor={COLORS.dark600}
                                borderColor={null}
                                paddingHorizontal={36}
                                onPress={resetInput}
                            />
                            <TextButton onPress={confirm} title="Confirm" paddingHorizontal={36} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },

    modal: {
        minHeight: deviceHeight * 0.5,
        backgroundColor: COLORS.dark500,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 1,
        borderColor: COLORS.dark700,
        overflow: "hidden",
        elevation: 10,
    },

    headerContainer: {
        backgroundColor: COLORS.dark600,
        alignItems: "center",
    },

    headerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 16,
        marginTop: 4,
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

export default AddExpenseModal;
