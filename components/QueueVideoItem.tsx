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
        <View style={{ flex: 1, flexDirection: "row", marginVertical: 8 }}>
          <Image
            source={{
              uri: item.snippet.thumbnails.default.url,
            }}
            style={{
              height: item.snippet.thumbnails.default.height - 50,
              width: item.snippet.thumbnails.default.width - 50,
              marginLeft: 8,
            }}
          />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text>{decodeURI(item.snippet.title)}</Text>
            <Text>{item.snippet.channelTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
