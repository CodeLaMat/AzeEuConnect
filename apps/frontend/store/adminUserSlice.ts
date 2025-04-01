import { UserManagementState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

const initialState: UserManagementState = {
  users: [],
  loading: false,
};

export const fetchAllManagedUsers = createAsyncThunk(
  "userManagement/fetchAllManagedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "userManagement/fetchUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateUserProfileField = createAsyncThunk(
  "userManagement/updateUserProfileField",
  async (
    {
      userId,
      fieldName,
      value,
    }: { userId: string; fieldName: string; value: any },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fieldName, value }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateSubscriptionField = createAsyncThunk(
  "userManagement/updateSubscriptionField",
  async (
    {
      userId,
      fieldName,
      value,
    }: { userId: string; fieldName: string; value: any },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/subscription`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fieldName, value }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update subscription");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateCompanyField = createAsyncThunk(
  "userManagement/updateCompanyField",
  async (
    {
      userId,
      fieldName,
      value,
    }: { userId: string; fieldName: string; value: any },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/company`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fieldName, value }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update company");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Add updateUserRole thunk here
export const updateUserRole = createAsyncThunk(
  "userManagement/updateUserRole",
  async (
    { userId, roleId }: { userId: string; roleId: string },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ roleId }),
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update user role");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllManagedUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAllManagedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllManagedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.selectedUser = undefined;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userManagementSlice.reducer;
