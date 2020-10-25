import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import PlaylistsScreen from "./screens/PlaylistsScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayerProvider from "./components/PlayerProvider";
import { store, persistor } from "./reducers/persistReducer";
import { PersistGate } from "redux-persist/integration/react";

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
          keyboardHidesTabBar: true,
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
      <PersistGate loading={null} persistor={persistor}>
        <PlayerProvider>
          <MyTabs />
        </PlayerProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
