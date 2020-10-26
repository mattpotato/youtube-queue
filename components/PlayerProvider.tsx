import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import {
  FlatList,
  TouchableOpacity as TouchableGH,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { QueueVideoItem } from "./QueueVideoItem";
import ContentPlayerButtons from "./ContentPlayerButtons";
import Player from "./Player";
import HeaderPlayerButtons from "./HeaderPlayerButtons";
import { htmlUnescape } from "escape-goat";
import { saveToPlaylist } from "../reducers/playlistReducer";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const AnimatedView = Animated.View;

const thumbnailSizes = [50, Dimensions.get("window").width - 60];
const thumbnailTopPositions = [
  20,
  Dimensions.get("window").width / 2 - thumbnailSizes[1] / 2,
];
const thumbnailLeftPositions = [
  20,
  Dimensions.get("window").width / 2 - thumbnailSizes[1] / 2,
];
const snapPoints = [
  70,
  thumbnailSizes[1] + thumbnailTopPositions[1] + 15 + 24 + 10 + 30 + 28,
];

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const fall = useRef(new Animated.Value(1)).current;
  const { videos, currentVideoIndex, isPlayingVideo } = useSelector(
    (state: RootState) => state.queueState
  );
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const dispatch = useDispatch();

  const handleKeyboardWillShow = () => {
    setKeyboardShown(true);
    onBelowTouch(); //
  };

  const handleKeyboardDidHide = () => {
    setKeyboardShown(false);
  };

  const onSaveToPlaylist = () => {
    // generate uuid
    if (videos.length > 0) {
      dispatch(saveToPlaylist({ name: uuid(), videos: [...videos] }));
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow);
    Keyboard.addListener("keyboardDidShow", handleKeyboardWillShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", handleKeyboardWillShow);
      Keyboard.removeListener("keyboardDidShow", handleKeyboardWillShow);
      Keyboard.removeListener("keyboardDidHide", handleKeyboardDidHide);
    };
  }, []);
  const animatedThumbnailTopPosition = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: thumbnailTopPositions.slice().reverse(),
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const animatedThumbnailSize = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [thumbnailSizes[0], thumbnailSizes[1]].slice().reverse(),
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const animatedHeaderContentOpacity = Animated.interpolate(fall, {
    inputRange: [0.75, 1],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const animatedPlayerBottom = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0, 50],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const onBelowTouch = () => {
    bottomSheetRef.current!.snapTo(0);
  };

  const onHeaderPress = () => {
    setSheetOpen(true);
    Keyboard.dismiss();
    bottomSheetRef.current!.snapTo(1);
  };

  const renderContent = useCallback(() => {
    const animatedBackgroundOpacity = Animated.sub(
      1,
      animatedHeaderContentOpacity
    );
    const animatedContentOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    return (
      <AnimatedView
        style={[styles.contentContainer]}
        onTouchStart={() => console.log("yoo")}
      >
        <AnimatedView
          style={[
            styles.contentBackground,
            { opacity: animatedBackgroundOpacity },
          ]}
        />

        <AnimatedView style={{ opacity: animatedContentOpacity }}>
          <AnimatedView
            style={{
              height: Animated.add(
                Animated.sub(animatedThumbnailSize, snapPoints[0]),
                animatedThumbnailTopPosition
              ),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: -150,
            }}
          >
            <ContentPlayerButtons />
            <TouchableGH onPress={onSaveToPlaylist}>
              <Text>Save</Text>
            </TouchableGH>
          </View>
          <FlatList
            data={videos}
            renderItem={({ item, index }) => (
              <QueueVideoItem item={item} index={index} />
            )}
            keyExtractor={(item) => item.id.videoId}
            style={{
              width: Dimensions.get("screen").width - 40,
              height: 200,
              flexGrow: 0,
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0.5,
                  width: "100%",
                  backgroundColor: "#000",
                  opacity: 0.2,
                }}
              />
            )}
          />
        </AnimatedView>
      </AnimatedView>
    );
  }, [fall, videos]);

  const renderSongCover = useCallback(() => {
    const animatedSongCoverLeftPosition = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: thumbnailLeftPositions.slice().reverse(),
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    return (
      <AnimatedView
        key={"song-cover-container"}
        style={[
          styles.thumbnailContainer,
          {
            height: animatedThumbnailSize,
            width: animatedThumbnailSize,
            left: animatedSongCoverLeftPosition,
            top: animatedThumbnailTopPosition,
          },
        ]}
      >
        <Player />
      </AnimatedView>
    );
  }, [isPlayingVideo]);

  const renderHeader = useCallback(() => {
    const animatedBackgroundOpacity = Animated.sub(
      1,
      animatedHeaderContentOpacity
    );
    return [
      <TouchableOpacity key={"header-container"} onPress={onHeaderPress}>
        <AnimatedView style={styles.headerContainer}>
          <AnimatedView
            style={[
              styles.headerBackground,
              {
                opacity: animatedBackgroundOpacity,
              },
            ]}
          >
            {renderHandler()}
          </AnimatedView>
          <AnimatedView
            style={[
              styles.headerContentContainer,
              {
                opacity: animatedHeaderContentOpacity,
                backgroundColor: "#fff",
              },
            ]}
          >
            <View style={styles.headerTopBorder} />
            <Text
              style={[
                styles.videoTitleSmall,
                { width: Dimensions.get("screen").width / 2 },
              ]}
            >
              {htmlUnescape(
                videos[currentVideoIndex]?.snippet.title || "Nothing in queue"
              )}
            </Text>
            <HeaderPlayerButtons />
          </AnimatedView>
        </AnimatedView>
      </TouchableOpacity>,
      renderSongCover(),
    ];
  }, [isPlayingVideo, videos, currentVideoIndex]);

  const renderShadow = useCallback(() => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    return (
      <AnimatedView
        pointerEvents={sheetOpen ? undefined : "box-none"}
        onTouchEnd={onBelowTouch}
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    );
  }, [sheetOpen]);

  // const renderFiller = () => {
  //   const animatedFillerOpacity = Animated.interpolate(fall, {
  //     inputRange: [0, 1],
  //     outputRange: [1, 0],
  //   });
  //   return (
  //     <AnimatedView
  //       pointerEvents="none"
  //       style={[
  //         styles.fillerContainer,
  //         {
  //           opacity: animatedFillerOpacity,
  //         },
  //       ]}
  //     />
  //   );
  // };

  const renderHandler = () => {
    const animatedBar1Rotation = (outputRange: number[]) =>
      Animated.interpolate(fall, {
        inputRange: [0, 1],
        outputRange: outputRange,
        extrapolate: Animated.Extrapolate.CLAMP,
      });

    return (
      <View style={styles.handlerContainer}>
        <AnimatedView
          style={[
            styles.handlerBar,
            {
              left: -7.5,
              transform: [
                {
                  rotate: Animated.concat(
                    // @ts-ignore
                    animatedBar1Rotation([0.3, 0]),
                    "rad"
                  ),
                },
              ],
            },
          ]}
        />
        <AnimatedView
          style={[
            styles.handlerBar,
            {
              right: -7.5,
              transform: [
                {
                  rotate: Animated.concat(
                    // @ts-ignore
                    animatedBar1Rotation([-0.3, 0]),
                    "rad"
                  ),
                },
              ],
            },
          ]}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (keyboardShown) {
          console.log("yo");
          onBelowTouch();
        }
        Keyboard.dismiss();
      }}
    >
      <View style={[StyleSheet.absoluteFill]}>
        {children}
        {renderShadow()}
        <Animated.View
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFill,
            { bottom: keyboardShown ? 20 : animatedPlayerBottom, zIndex: 0 },
          ]}
        >
          <BottomSheet
            ref={bottomSheetRef}
            initialSnap={0}
            callbackNode={fall}
            snapPoints={snapPoints}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onOpenStart={() => Keyboard.dismiss()}
            onOpenEnd={() => setSheetOpen(true)}
            onCloseEnd={() => setSheetOpen(false)}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // Screen
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },

  // Content
  contentContainer: {
    alignItems: "center",
    // height: snapPoints[1] - snapPoints[0],
    height: 1000,
    paddingBottom: 40,
    overflow: "visible",
    ...StyleSheet.absoluteFillObject,
    // bottom: 120,
  },

  contentBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
  },

  // Header
  headerContainer: {
    height: snapPoints[0],
  },

  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  headerContentContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 20 + thumbnailSizes[0] + 20,
  },

  headerTopBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    opacity: 0.5,
    height: 0.25,
    backgroundColor: "#9B9B9B",
  },

  headerActionButton: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    minWidth: 50,
  },

  // Handler
  handlerContainer: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
    height: 20,
    width: 20,
  },

  handlerBar: {
    position: "absolute",
    backgroundColor: "#D1D1D6",
    top: 5,
    borderRadius: 3,
    height: 5,
    width: 20,
  },

  // Song
  thumbnailContainer: {
    position: "absolute",
    top: 10,
    left: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15.0,
  },

  videoTitleLarge: {
    marginTop: 10,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 30,
  },

  videoTitleSmall: {
    flexGrow: 1,
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 16,
  },

  songInfoText: {
    textAlign: "center",
    color: "#FE2D55",
    fontSize: 24,
    lineHeight: 28,
  },

  songCoverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#333",
  },

  // Seek Bar
  seekBarContainer: {
    height: 24,
    marginTop: -100,
    width: thumbnailSizes[1],
  },

  seekBarThumb: {
    position: "absolute",
    backgroundColor: "#8E8E93",
    top: -2,
    borderRadius: 6,
    width: 6,
    height: 6,
  },

  seekBarTrack: {
    backgroundColor: "#DDDEDD",
    height: 2,
    borderRadius: 4,
  },

  seekBarTimingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  seekBarTimingText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "500",
    color: "#8E8E93",
  },

  // Song List Item
  songListItemContainer: {
    flexDirection: "row",
  },

  songListItemCover: {
    marginLeft: 20,
    marginRight: 15,
    marginVertical: 5,
    width: thumbnailSizes[0],
    height: thumbnailSizes[0],
    borderRadius: 4,
  },

  songListItemInfoContainer: {
    flexGrow: 1,
    borderBottomColor: "#CAC9CE",
    borderBottomWidth: 0.5,
    justifyContent: "center",
  },

  songListItemSecondaryText: {
    fontSize: 12,
    color: "#8E8D92",
  },

  fillerContainer: {
    backgroundColor: "white",
    height: 70,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PlayerProvider;
