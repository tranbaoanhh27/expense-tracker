import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/Colors";

const TextButton = ({
    title = "Button",
    backgroundColor = COLORS.primary500,
    borderColor = COLORS.primary500,
    paddingHorizontal = 16,
    paddingVertical = 8,
    rippleColor = "#555555",
    width = null,
    textAlign = "center",
    marginVertical = 0,
    onPress = () => {},
    disabled = false,
}) => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor, borderColor, borderWidth: borderColor ? 1 : 0, width, marginVertical },
                disabled ? styles.disabled : null,
            ]}>
            <Pressable
                disabled={disabled}
                onPress={onPress}
                style={[styles.pressable, { paddingHorizontal, paddingVertical, alignItems: textAlign }]}
                android_ripple={{ color: rippleColor }}>
                <Text style={[styles.text, disabled ? styles.disabledText : null]}>{title}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: COLORS.primary500,
        borderWidth: 1,
        borderColor: COLORS.primary500,
    },

    pressable: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    disabled: {
        backgroundColor: COLORS.disabled,
        borderColor: COLORS.disabled,
    },

    text: {
        color: "white",
    },

    disabledText: {
        color: COLORS.onDisabled,
    },
});

export default TextButton;
