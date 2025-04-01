import { RolesState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchAllRoles = createAsyncThunk(
  "roles/fetchAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch roles");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchAllPermissions = createAsyncThunk(
  "permissions/fetchAllPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to fetch permissions");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create role");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchAllPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchAllPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rolesSlice.reducer;
