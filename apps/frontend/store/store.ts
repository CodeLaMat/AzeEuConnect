// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import adminUsersReducer from "./adminUserSlice";
import rolesReducer from "./rolesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    adminUsers: adminUsersReducer,
    roles: rolesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
