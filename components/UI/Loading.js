import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = ({ size = "large", color = "white", backgroundColor = null, text = null }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={[styles.text, { color }]}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        marginTop: 16,
    },
});

export default Loading;
