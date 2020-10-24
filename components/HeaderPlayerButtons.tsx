import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { playNextInQueue, toggleVideo } from "../reducers/queueReducer";
import { RootState } from "../reducers/rootReducer";

interface HeaderPlayerButtonsProps {}

const HeaderPlayerButtons: React.FC<HeaderPlayerButtonsProps> = ({}) => {
  const isPlayingVideo = useSelector(
    (state: RootState) => state.queueState.isPlayingVideo
  );
  const dispatch = useDispatch();
  return (
    <>
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
        onPress={() => {
          dispatch(playNextInQueue());
        }}
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

export default HeaderPlayerButtons;
