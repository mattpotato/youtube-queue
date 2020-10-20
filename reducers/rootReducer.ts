import { combineReducers } from "@reduxjs/toolkit";
import queueReducer from "./queueReducer";

const rootReducer = combineReducers({ queueState: queueReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
