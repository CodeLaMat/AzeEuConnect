import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export interface ManagedUser {
  id: string;
  email: string;
  role: { id: string; name: string };
  lastLogin: string | null;
  accountStatus: "ACTIVE" | "SUSPENDED" | "BANNED";
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    image?: string;
    phone?: string;
    location?: string;
    nationality?: string;
    preferredLanguage?: "AZ" | "EN" | "DE" | "RU";
    timezone?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
  };
  subscription?: {
    id: string;
    plan: "BASIC" | "PRO" | "ENTERPRISE";
    paymentStatus: "ACTIVE" | "PENDING" | "CANCELLED";
    paymentMethod?: "STRIPE" | "PAYPAL" | "SEPA" | "KLARNA";
    nextBillingDate?: string;
    discountApplied: boolean;
    referralCode?: string;
  };
  companyDetails?: {
    id: string;
    businessName: string;
    businessType: "GMBH" | "UG" | "SARL" | "BV" | "LTD" | "AG";
    businessCategory: "TECH" | "FINANCE" | "RETAIL" | "MANUFACTURING" | "OTHER";
    registrationStatus: "PENDING" | "APPROVED" | "REJECTED";
    businessAddress?: string;
    vatNumber?: string;
    taxId?: string;
    companySize?:
      | "SOLE_PROPRIETOR"
      | "SMALL_BUSINESS"
      | "MEDIUM_BUSINESS"
      | "LARGE_BUSINESS";
    countryOfRegistration?: string;
    formationDate?: string;
    lastUpdated?: string;
  };
  services?: {
    id: string;
    companyFormation?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    taxAndAccounting?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    legalConsultation?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    bankingSetup?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    virtualOffice?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    trademarkRegistration?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    regulatoryCompliance?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    businessExpansion?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
  };
}

interface UserManagementState {
  users: ManagedUser[];
  selectedUser?: ManagedUser;
  loading: boolean;
  error?: string;
}

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
