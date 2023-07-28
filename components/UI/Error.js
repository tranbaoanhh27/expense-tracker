import { StyleSheet, Text, View } from "react-native";
import TextButton from "./TextButton";

const Error = ({
    message = "An unexpected error occurred! Try reloading the app",
    actionButtonTitle = "Okay",
    action = () => {},
    backgroundColor = null,
}) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>We're sorry...</Text>
            <Text style={styles.message}>{message}</Text>
            <TextButton title={actionButtonTitle} onPress={action} marginVertical={20} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
        fontStyle: "italic",
    },

    message: {
        marginTop: 16,
        color: "white",
        maxWidth: "70%",
        textAlign: "center",
        lineHeight: 24,
    },
});

export default Error;
