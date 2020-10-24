import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playNextInQueue,
  playPreviousInQueue,
  toggleVideo,
} from "../reducers/queueReducer";
import { RootState } from "../reducers/rootReducer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

interface ContentPlayerButtonsProps {}

const ContentPlayerButtons: React.FC<ContentPlayerButtonsProps> = ({}) => {
  const { isPlayingVideo } = useSelector(
    (state: RootState) => state.queueState
  );
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        style={styles.headerActionButton}
        onPress={() => dispatch(playPreviousInQueue())}
      >
        <Ionicons name="ios-skip-backward" size={32} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerActionButton}
        onPress={() => dispatch(toggleVideo())}
      >
        {isPlayingVideo ? (
          <Ionicons name="ios-pause" size={32} />
        ) : (
          <Ionicons name="ios-play" size={32} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerActionButton}
        onPress={() => dispatch(playNextInQueue())}
      >
        <Ionicons name="ios-skip-forward" size={32} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  headerActionButton: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    minWidth: 50,
  },
});

export default ContentPlayerButtons;
