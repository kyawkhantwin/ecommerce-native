import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loadInitialState = async () => {
  try {
    const authData = await AsyncStorage.getItem("auth");
    if (authData !== null) {
      const parsedData = JSON.parse(authData);
      return {
        user: parsedData.user || null,
        token: parsedData.token || null,
      };
    }
  } catch (error) {
    console.error("Failed to load auth data", error);
  }
  return { user: null, token: null };
};

const initialState = {
  user: null,
  token: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const loadAuthData = createAsyncThunk("auth/loadAuthData", async () => {
  const initialState = await loadInitialState();
  return initialState;
});

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("auth", JSON.stringify(value));
  } catch (e) {
    console.error("Failed to store auth data", e);
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Failed to clear auth data", e);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      storeData({ user, token });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeData();
    },
    updateAuthUser: (state, action) => {
      console.log(action.payload);
      state.user = { ...state?.user, ...action.payload };
      storeData({ user: state.user, token: state.token });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAuthData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loadAuthData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCredentials, logout, updateAuthUser } = authSlice.actions;

export default authSlice.reducer;

// Export selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
