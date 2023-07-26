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
}) => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor, borderColor, borderWidth: borderColor ? 1 : 0, width, marginVertical },
            ]}>
            <Pressable
                onPress={onPress}
                style={[styles.pressable, { paddingHorizontal, paddingVertical, alignItems: textAlign }]}
                android_ripple={{ color: rippleColor }}>
                <Text style={styles.text}>{title}</Text>
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

    text: {
        color: "white",
    },
});

export default TextButton;
