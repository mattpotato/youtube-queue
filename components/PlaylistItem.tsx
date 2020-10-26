import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PlaylistItemProps {
  name: string;
  count: number;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ name, count }) => {
  const handleReplaceQueue = () => {
    console.log("hello");
  };
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 8,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>{name}</Text>
        <Text>{count} videos</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={handleReplaceQueue}>
          <Feather name="play" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReplaceQueue}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaylistItem;
