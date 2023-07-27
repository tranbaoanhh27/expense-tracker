import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/Colors";

const Input = ({
    label = "Input",
    children,
    containerStyle,
    labelStyle,
    minLabelWidth = "20%",
    error = false,
    helperText = "",
}) => {
    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <View style={[styles.labelContainer, { minWidth: minLabelWidth }]}>
                <Text style={[labelStyle, error ? styles.errorLabel : null]}>{label}</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={[styles.input, error ? styles.errorInputContainer : null]}>{children}</View>
                {helperText && helperText.length > 0 && <Text style={styles.helperText}>{helperText}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    labelContainer: {
        alignItems: "flex-start",
        marginRight: 16,
        paddingTop: 12,
    },

    errorLabel: {
        color: COLORS.danger,
        fontWeight: "bold",
    },

    inputContainer: {
        flex: 1,
        gap: 2,
    },

    input: {
        alignItems: "stretch",
        borderRadius: 8,
        elevation: 8,
    },

    helperText: {
        color: COLORS.danger,
    },

    errorInputContainer: {
        borderWidth: 2,
        borderColor: COLORS.danger,
    },
});

export default Input;
