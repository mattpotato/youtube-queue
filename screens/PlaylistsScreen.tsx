import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";

const PlaylistsScreen = () => {
  const { videos } = useSelector((state: RootState) => state.queueState);

  return (
    <SafeAreaView>
      <Text>Playlists Screen</Text>
      <FlatList
        data={videos}
        renderItem={(item) => <Text>{item.item}</Text>}
        keyExtractor={(item) => item.id.videoId}
      />
    </SafeAreaView>
  );
};

export default PlaylistsScreen;
