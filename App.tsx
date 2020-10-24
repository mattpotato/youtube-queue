import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import PlaylistsScreen from "./screens/PlaylistsScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayerProvider from "./components/PlayerProvider";

const store = configureStore({
  reducer: rootReducer,
});

const Tab = createBottomTabNavigator();

const MyTabs: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            // top: Dimensions.get("screen").height - 40,
            position: "absolute",
            zIndex: 1110,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <MyTabs />
      </PlayerProvider>
    </Provider>
  );
};
export default App;
