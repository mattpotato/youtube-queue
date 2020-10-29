import { htmlUnescape } from "escape-goat";
import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideo, setCurrentVideoIndex } from "../reducers/queueReducer";
import { Item } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootState } from "../reducers/rootReducer";
interface QueueVideoItemProps {
  item: Item;
  index: number;
}

const SCREEN_WIDTH = Dimensions.get("screen").width;
export const QueueVideoItem: React.FC<QueueVideoItemProps> = React.memo(
  ({ item, index }) => {
    const { currentVideoIndex } = useSelector(
      (state: RootState) => state.queueState
    );
    const dispatch = useDispatch();
    const handlePress = () => {
      console.log("yo");
      dispatch(setCurrentVideoIndex(index));
    };

    const handleClose = () => {
      dispatch(deleteVideo(index));
    };

    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor:
            currentVideoIndex === index ? "rgba(0, 0, 0, 0.2)" : undefined,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", marginVertical: 8 }}>
          <TouchableOpacity onPress={handlePress}>
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
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress}>
            <View
              style={{
                flex: 1,
                marginLeft: 8,
                width: SCREEN_WIDTH / 2 + 20,
              }}
            >
              <Text>{htmlUnescape(item.snippet.title)}</Text>
              <Text>{htmlUnescape(item.snippet.channelTitle)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons
            name="md-close"
            size={24}
            color="black"
            style={{ margin: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
);
