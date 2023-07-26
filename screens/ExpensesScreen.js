import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import AddExpenseModal from "../components/AddExpenseModal";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IoniconButton from "../components/UI/IoniconButton";
import { Entypo, Ionicons } from "@expo/vector-icons";
import AllExpensesScreen from "./AllExpensesScreen";
import RecentExpensesScreen from "./RecentExpensesScreen";
import { COLORS } from "../constants/Colors";

const Tab = createBottomTabNavigator();

const ExpensesScreen = () => {
    const [addingExpense, setAddingExpense] = useState(false);
    return (
        <>
            <AddExpenseModal visible={addingExpense} onClose={() => setAddingExpense(false)} />
            <Tab.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                    headerStyle: styles.header,
                    headerTintColor: "white",
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: "white",
                    tabBarActiveTintColor: COLORS.primary400,
                    headerRight: () => (
                        <IoniconButton
                            name="add"
                            size={25}
                            padding={5}
                            rippleColor={COLORS.primary400}
                            onPress={() => setAddingExpense(true)}
                        />
                    ),
                }}>
                <Tab.Screen
                    name="Recent Expenses"
                    component={RecentExpensesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Entypo name="back-in-time" size={size} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="All Expenses"
                    component={AllExpensesScreen}
                    options={{
                        tabBarIcon: ({ size, color }) => <Ionicons name="calendar" size={size} color={color} />,
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.dark600,
    },

    tabBar: {
        backgroundColor: COLORS.dark600,
        paddingBottom: 16,
        minHeight: deviceHeight * 0.1,
    },
});

export default ExpensesScreen;
