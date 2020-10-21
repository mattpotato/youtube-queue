import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addToQueue } from "../reducers/queueReducer";
import { Item, Snippet } from "../types";

interface VideoItemProps {
  item: Item;
}

export const VideoItem: React.FC<VideoItemProps> = React.memo(({ item }) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(addToQueue(item));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={{
            uri: item.snippet.thumbnails.default.url,
          }}
          style={{
            height: item.snippet.thumbnails.default.height,
            width: item.snippet.thumbnails.default.width,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text>{item.snippet.title}</Text>
          <Text>{item.snippet.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
