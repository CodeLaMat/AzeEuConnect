import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  firstName?: string;
  lastName?: string;
  location?: string;
  image?: string;
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
  role: "",
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
      state.profile = action.payload.profile ?? null;
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
