import { combineReducers } from "@reduxjs/toolkit";
import playlistReducer from "./playlistReducer";
import queueReducer from "./queueReducer";

const rootReducer = combineReducers({
  queueState: queueReducer,
  playlistState: playlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
