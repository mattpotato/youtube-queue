import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addToQueue } from "../reducers/queueReducer";
import { Snippet } from "../types";

interface VideoItemProps {
  itemDetails: Snippet;
}

export const VideoItem: React.FC<VideoItemProps> = ({ itemDetails }) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(addToQueue(itemDetails.title));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={{
            uri: itemDetails.thumbnails.default.url,
          }}
          style={{
            height: itemDetails.thumbnails.default.height,
            width: itemDetails.thumbnails.default.width,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text>{itemDetails.title}</Text>
          <Text>{itemDetails.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
