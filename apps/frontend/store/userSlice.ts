import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@prisma/client";
import { UserState } from "@/types/types";

// Update this type if not yet changed:
const initialState: UserState = {
  id: "",
  email: "",
  role: "CUSTOMER",
  currentRole: "CUSTOMER",
  unpaidInvoices: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserIdentity: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        role: UserRole;
        currentRole: UserRole;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.currentRole = action.payload.currentRole;
    },
    clearUserIdentity: (state) => {
      state.id = "";
      state.email = "";
      state.role = "CUSTOMER";
      state.currentRole = "CUSTOMER";
    },
  },
});

export const { setUserIdentity, clearUserIdentity } = userSlice.actions;
export default userSlice.reducer;
