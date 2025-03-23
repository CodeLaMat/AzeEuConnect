import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  firstName?: string;
  lastName?: string;
  location?: string;
  image?: string;
  phone?: string;
  nationality?: string;
  timezone?: string;
  preferredLanguage?: string;
}

interface UserState {
  id: string | null;
  email: string;
  role: string;
  profile: Profile | null;
}

const initialState: UserState = {
  id: null,
  email: "",
  role: "USER",
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        role: string;
        profile?: Profile;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.profile = {
        firstName: action.payload.profile?.firstName || "",
        lastName: action.payload.profile?.lastName || "",
        location: action.payload.profile?.location || "",
        image: action.payload.profile?.image || "",
        phone: action.payload.profile?.phone || "",
        nationality: action.payload.profile?.nationality || "",
        timezone: action.payload.profile?.timezone || "UTC",
        preferredLanguage: action.payload.profile?.preferredLanguage || "AZ",
      };
    },
    clearUserData: (state) => {
      state.id = null;
      state.email = "";
      state.role = "";
      state.profile = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
