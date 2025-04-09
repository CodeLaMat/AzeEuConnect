import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { ServiceState } from "@/types/types"; // Define types accordingly

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

// Fetch all service listings
export const fetchAllServices = createAsyncThunk(
  "services/fetchAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch services");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Create a new service listing
export const createService = createAsyncThunk(
  "services/createService",
  async (
    {
      title,
      description,
      category,
      price,
      serviceType,
    }: {
      title: string;
      description: string;
      category: string;
      price: number;
      serviceType: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            price,
            serviceType,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create service");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Update an existing service listing
export const updateService = createAsyncThunk(
  "services/updateService",
  async (
    {
      id,
      title,
      description,
      category,
      price,
      serviceType,
    }: {
      id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      serviceType: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            price,
            serviceType,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update service");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Delete a service listing
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id: string, { rejectWithValue }) => {
    try {
      const session = await getSession();
      const token = (session as any)?.jwtToken;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete service");
      return id; // Return the id of the deleted service
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (service) => service.id === action.payload.id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (service) => service.id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default servicesSlice.reducer;
