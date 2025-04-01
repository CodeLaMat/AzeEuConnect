import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@prisma/client";
import { UserState } from "@/types/types";

const initialState: UserState = {
  id: "",
  email: "",
  role: "USER",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserIdentity: (
      state,
      action: PayloadAction<{ id: string; email: string; role: UserRole }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    clearUserIdentity: (state) => {
      state.id = "";
      state.email = "";
      state.role = "USER";
    },
  },
});

export const { setUserIdentity, clearUserIdentity } = userSlice.actions;
export default userSlice.reducer;
