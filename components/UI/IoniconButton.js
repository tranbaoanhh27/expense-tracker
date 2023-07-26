import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IoniconButton = ({
    name = "add",
    size = 16,
    padding = 8,
    color = "white",
    onPress = () => {},
    rippleColor = "#ccc",
}) => {
    return (
        <View style={[styles.container, { borderRadius: (size + 2 * padding) / 2 }]}>
            <Pressable onPress={onPress} style={{ padding }} android_ripple={{ color: rippleColor }}>
                <Ionicons name={name} size={size} color={color} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        margin: 8,
    },
});

export default IoniconButton;
