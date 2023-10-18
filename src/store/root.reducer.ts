import { combineReducers } from "redux";
import { appNotifications } from "./notifications/notify.reducer";
import { userData } from "./user/user.reducer";
import { isAuthenticated } from "./user/user.reducer";

const rootReducer = combineReducers({
    appNotifications,
    isAuthenticated,
    userData
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
