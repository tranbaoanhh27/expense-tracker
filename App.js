import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditExpenseScreen from "./screens/EditExpenseScreen";
import ExpensesScreen from "./screens/ExpensesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={reduxStore}>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTitleAlign: "center",
                        headerStyle: styles.header,
                        headerTintColor: "white",
                        animation: "slide_from_right",
                    }}>
                    <Stack.Screen name="Expenses" component={ExpensesScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Edit Expense" component={EditExpenseScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.dark600,
    },
});
