import { combineReducers } from "redux";

// Imported Reducers
import { accountType } from './user/user.reducer'
import { allActiveJobs } from './jobs/jobs.reducer'
import { appNotifications } from "./notifications/notify.reducer";
import { userData } from "./user/user.reducer";
import { isAuthenticated } from "./user/user.reducer";
import { profileImages } from "./user/user.reducer";
import { userProfileDetails } from "./user/user.reducer";
import { userContactProfile } from "./user/user.reducer";
import { clientUserImages } from "./user/user.reducer";
import { viewUserDetails } from './user/user.reducer'
import { userJobs } from './jobs/jobs.reducer'
import { userRole } from './user/user.reducer'


const rootReducer = combineReducers({
    accountType,
    allActiveJobs,
    appNotifications,
    clientUserImages,
    isAuthenticated,
    profileImages,
    userData,
    userProfileDetails,
    userContactProfile,
    viewUserDetails,
    userJobs,
    userRole
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
