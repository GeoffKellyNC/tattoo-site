import { combineReducers } from "redux";
import { appNotifications } from "./notifications/notify.reducer";

const rootReducer = combineReducers({
    appNotifications,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
