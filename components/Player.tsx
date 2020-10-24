import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = ({}) => {
  const { isPlayingVideo, videos, currentVideoIndex } = useSelector(
    (state: RootState) => state.queueState
  );
  return (
    <YoutubePlayer
      height={270}
      videoId={videos[currentVideoIndex]?.id.videoId || "2IBEmJHT1eY"}
      play={isPlayingVideo}
      initialPlayerParams={{ start: 0 }}
    />
  );
};

export default Player;
