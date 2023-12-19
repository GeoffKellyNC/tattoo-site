import { combineReducers } from "redux";

// Imported Reducers
import { accountType } from './user/user.reducer'
import { allActiveJobs } from './jobs/jobs.reducer'
import { artistCurrentBids } from './jobs/jobs.reducer'
import { artistDetails } from './user/user.reducer'
import { appLoading } from "./app/app.reducer";
import { appNotifications } from "./notifications/notify.reducer";
import { clientCurrentBids } from './jobs/jobs.reducer'
import { userData } from "./user/user.reducer";
import { isAuthenticated } from "./user/user.reducer";
import { profileImages } from "./user/user.reducer";
import { userProfileDetails } from "./user/user.reducer";
import { userContactProfile } from "./user/user.reducer";
import { clientUserImages } from "./user/user.reducer";
import { viewUserDetails } from './user/user.reducer'
import { userCurrentLocation } from './user/user.reducer'
import { userJobs } from './jobs/jobs.reducer'
import { userRole } from './user/user.reducer'
import { userDataNotifications } from "./notifications/notify.reducer";
import { artistFullData } from "./user/user.reducer";
import { userCurrentCords } from "./user/user.reducer";


const rootReducer = combineReducers({
    accountType,
    allActiveJobs,
    artistCurrentBids,
    artistDetails,
    artistFullData,
    appLoading,
    appNotifications,
    clientUserImages,
    clientCurrentBids,
    isAuthenticated,
    profileImages,
    userData,
    userProfileDetails,
    userContactProfile,
    viewUserDetails,
    userCurrentLocation,
    userDataNotifications,
    userJobs,
    userRole,
    userCurrentCords
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
