import { createSlice } from "@reduxjs/toolkit";

interface QueueState {
  videos: string[];
}

const initialState: QueueState = {
  videos: [],
};
const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addToQueue: (state, action) => {
      state.videos.push(action.payload);
    },
    deleteQueue: (state) => {
      state.videos = [];
    },
  },
});

export const { addToQueue } = queueSlice.actions;

export default queueSlice.reducer;
