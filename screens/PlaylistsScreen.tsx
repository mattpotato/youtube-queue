import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import PlaylistItem from "../components/PlaylistItem";
import { changeName } from "../reducers/playlistReducer";
import { RootState } from "../reducers/rootReducer";

const Stack = createStackNavigator();
const PlaylistsScreen = () => {
  const { name, playlists: playlistMap } = useSelector(
    (state: RootState) => state.playlistState
  );
  const getPlaylists = () => {
    const playlists = [];
    for (let key in playlistMap) {
      playlists.push({
        name: key,
        count: playlistMap[key].length,
      });
    }
    return playlists;
  };

  const dispatch = useDispatch();
  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    dispatch(changeName(e.nativeEvent.text));
  }; //
  return (
    <SafeAreaView>
      <Text>{name}</Text>
      <TextInput onSubmitEditing={handleSubmit} />
      <FlatList
        data={getPlaylists()}
        renderItem={({ item }) => (
          <PlaylistItem name={item.name} count={item.count} />
        )}
        keyExtractor={({ name }) => name}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: "#000",
              opacity: 0.2,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const PlaylistsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Playlists"
        component={PlaylistsScreen}
        options={{ title: "Playlists" }}
      />
    </Stack.Navigator>
  );
};

export default PlaylistsStack;
