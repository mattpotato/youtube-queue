import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addToQueue, setCurrentVideoIndex } from "../reducers/queueReducer";
import { Item, Snippet } from "../types";

interface QueueVideoItemProps {
  item: Item;
  index: number;
}

export const QueueVideoItem: React.FC<QueueVideoItemProps> = React.memo(
  ({ item, index }) => {
    const dispatch = useDispatch();
    const handlePress = () => {
      dispatch(setCurrentVideoIndex(index));
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
  }
);
