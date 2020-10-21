import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Dimensions } from "react-native";
import { Host } from "react-native-portalize";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import PlaylistsScreen from "./screens/PlaylistsScreen";
import HomeScreen from "./screens/HomeScreen";

const store = configureStore({
  reducer: rootReducer,
});

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Host>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Playlists" component={PlaylistsScreen} />
        </Tab.Navigator>
      </Host>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
