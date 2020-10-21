import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { QueueVideoItem } from "./QueueVideoItem";
import YoutubePlayer from "react-native-youtube-iframe";

interface QueueBottomSheetProps {}

export const QueueBottomSheet: React.FC<QueueBottomSheetProps> = ({}) => {
  const { videos, currentVideoIndex } = useSelector(
    (state: RootState) => state.queueState
  );
  const currentVideo = videos[currentVideoIndex];
  const modalizeRef = useRef<Modalize>(null);
  const [mt, setMt] = useState(Dimensions.get("window").height - 150);

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={100}
      alwaysOpen={mt === 0 ? Dimensions.get("screen").height : 100}
      handlePosition={"inside"}
      rootStyle={{
        height: mt === 0 ? undefined : 100,
        marginTop: mt,
      }}
      withOverlay={false}
      closeOnOverlayTap={false}
      HeaderComponent={
        <View
          style={{
            flex: 1,
            flexDirection: mt === 0 ? "column" : "row",
          }}
        >
          <YoutubePlayer
            height={mt === 0 ? 300 : 50}
            width={mt === 0 ? 400 : 100}
            videoId={currentVideo ? currentVideo.id.videoId : "YDsLKEado_o"}
            initialPlayerParams={{ start: 0 }}
          />
          <View style={{ flex: 1, flexDirection: "row", height: "100%" }}>
            <Button
              title="previous"
              onPress={() => console.log("press previous")}
            />
            <Button title="play" onPress={() => console.log("press play")} />
            <Button
              title="forward"
              onPress={() => console.log("press forward")}
            />
            <Button
              title="open"
              onPress={() => {
                if (mt == 0) {
                  setMt(Dimensions.get("window").height - 150);
                } else {
                  setMt(0);
                }
              }}
            />
          </View>
        </View>
      }
      flatListProps={{
        data: videos,
        renderItem: ({ item, index }) => {
          return <QueueVideoItem item={item} index={index} />;
        },
        keyExtractor: (item) => item.id.videoId,
      }}
    ></Modalize>
  );
};
