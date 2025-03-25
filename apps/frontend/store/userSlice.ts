import { Company, Review, Subscription, UserRole } from "@prisma/client";
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

interface ServiceSubscription {
  id: string;
  serviceId: string;
  subscriberId: string;
  status: "ACTIVE" | "CANCELLED" | "EXPIRED";
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface UserState {
  id: string;
  email: string;
  role: UserRole;
  profile?: Profile;
  subscription?: Subscription;
  companyDetails?: Company;
  serviceSubscriptions?: ServiceSubscription[];
  reviews?: Review[];
}

const initialState: UserState = {
  id: "",
  email: "",
  role: "USER" as UserRole,
  profile: {},
  subscription: undefined,
  serviceSubscriptions: [],
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
        role: UserRole;
        profile?: Profile;
        membership?: Subscription;
        serviceSubscriptions?: ServiceSubscription[];
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
      state.subscription = action.payload.membership;
      state.serviceSubscriptions = action.payload.serviceSubscriptions ?? [];
    },
    clearUserData: (state) => {
      state.id = "";
      state.email = "";
      state.role = "USER";
      state.profile = {};
      state.subscription = undefined;
      state.serviceSubscriptions = [];
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
