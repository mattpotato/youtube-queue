import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../types";

interface QueueState {
  videos: Item[];
  currentVideoIndex: number;
  isPlayingVideo: boolean;
}

const initialState: QueueState = {
  videos: [],
  currentVideoIndex: 0,
  isPlayingVideo: false,
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addToQueue: (state, action) => {
      const index = state.videos.findIndex(
        (item) => item.id.videoId === action.payload.id.videoId
      );
      if (index === -1) {
        state.videos.push(action.payload);
      }
    },
    deleteQueue: (state) => {
      state.videos = [];
    },
    playNextInQueue: (state) => {
      // increment the index
      if (state.currentVideoIndex < state.videos.length - 1) {
        state.currentVideoIndex += 1;
      }
    },
    playPreviousInQueue: (state) => {
      // decrement the index
      if (state.currentVideoIndex > 0) {
        state.currentVideoIndex -= 1;
      }
    },
    setCurrentVideoIndex: (state, action) => {
      state.currentVideoIndex = action.payload;
    },
    toggleVideo: (state) => {
      state.isPlayingVideo = !state.isPlayingVideo;
    },
  },
});

export const {
  addToQueue,
  deleteQueue,
  playNextInQueue,
  playPreviousInQueue,
  setCurrentVideoIndex,
  toggleVideo,
} = queueSlice.actions;

export default queueSlice.reducer;
