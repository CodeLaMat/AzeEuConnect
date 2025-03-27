import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Subscription, Company, Review } from "@prisma/client";

export interface ProfileState {
  firstName?: string;
  lastName?: string;
  location?: string;
  image?: string;
  phone?: string;
  nationality?: string;
  timezone?: string;
  preferredLanguage?: string;
  subscription?: Subscription;
  companyDetails?: Company;
  serviceSubscriptions?: any[];
  reviews?: Review[];
}

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

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",

  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${userId}`
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/updateprofile`,
        {
          method: "PATCH",
          body: formData,
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
