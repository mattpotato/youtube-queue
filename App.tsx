import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import PlaylistsScreen from "./screens/PlaylistsScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayerProvider from "./components/PlayerProvider";
import { store, persistor } from "./reducers/persistReducer";
import { PersistGate } from "redux-persist/integration/react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MyTabs: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            position: "absolute",
            zIndex: 1110,
          },
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "blue" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Playlists"
          component={PlaylistsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="featured-play-list"
                size={24}
                color={focused ? "blue" : "black"}
              />
            ),
          }}
        />
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
