import { combineReducers } from "redux";
import { appNotifications } from "./notifications/notify.reducer";
import { userData } from "./user/user.reducer";
import { isAuthenticated } from "./user/user.reducer";
import { profileImages } from "./user/user.reducer";
import { userProfileDetails } from "./user/user.reducer";
import { userContactProfile } from "./user/user.reducer";

const rootReducer = combineReducers({
    appNotifications,
    isAuthenticated,
    profileImages,
    userData,
    userProfileDetails,
    userContactProfile
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
