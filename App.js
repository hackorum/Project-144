import React from "react";
import HomeScreen from "./screens/HomeScreen.js";
import PopularScreen from "./screens/PopularScreen.js";
import RecommendedScreen from "./screens/RecommendedScreen.js";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { RFValue } from "react-native-responsive-fontsize";

export default function App() {
  return <AppContainer />;
}

topTabNavigator = createMaterialTopTabNavigator({
  Recommended: {
    screen: RecommendedScreen,
    navigationOptions: {
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "white",
        },
        labelStyle: {
          color: "black",
        },
        indicatorStyle: {
          backgroundColor: "black",
        },
      },
    },
  },
  Popular: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "white",
        },
        labelStyle: {
          color: "black",
        },
        indicatorStyle: {
          backgroundColor: "black",
        },
      },
    },
  },
});

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    topTabNavigator: {
      screen: topTabNavigator,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "white",
        headerTitle: "Recommended",
        headerStyle: {
          backgroundColor: "#282c34",
        },
        headerTitleStyle: {
          color: "white",
          fontWeight: "bold",
          fontSize: RFValue(18),
        },
      },
    },
  },
  { initialRouteName: "Home" }
);

const AppContainer = createAppContainer(stackNavigator);
