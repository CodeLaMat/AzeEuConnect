import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { ProfileState } from "@/types/types";

const initialState: ProfileState = {
  firstName: "",
  lastName: "",
  location: "",
  phone: "",
  nationality: "",
  timezone: "UTC",
  preferredLanguage: "AZ",
  serviceSubscriptions: [],
};

// ✅ Fetch Profile with Bearer token
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// ✅ Update Profile with token
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/updateprofile`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      return data.profile;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const {
          profile,
          subscription,
          companyDetails,
          serviceSubscriptions,
          reviews,
        } = action.payload;

        return {
          ...state,
          ...profile,
          subscription,
          companyDetails,
          serviceSubscriptions,
          reviews,
        };
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
