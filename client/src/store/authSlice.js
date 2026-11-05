import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AUTH_URL = 'http://localhost:5000/api/auth/';
const USERS_URL = 'http://localhost:5000/api/users/';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(AUTH_URL + 'login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(AUTH_URL + 'register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const updateSettings = createAsyncThunk('auth/updateSettings', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(USERS_URL + 'settings', userData, config);
    if (response.data) {
      const updatedUser = { ...thunkAPI.getState().auth.user, ...response.data, token };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    }
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteAccount = createAsyncThunk('auth/deleteAccount', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(USERS_URL + 'settings', config);
    localStorage.removeItem('user');
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Duolingo-style Economy Thunks
export const fetchEconomy = createAsyncThunk('auth/fetchEconomy', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) return null;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(USERS_URL + 'economy', config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const loseHeart = createAsyncThunk('auth/loseHeart', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(USERS_URL + 'hearts/lose', {}, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const refillHeartsGems = createAsyncThunk('auth/refillHeartsGems', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(USERS_URL + 'hearts/refill-gems', {}, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const refillHeartsAd = createAsyncThunk('auth/refillHeartsAd', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(USERS_URL + 'hearts/refill-ad', {}, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const buyShopItem = createAsyncThunk('auth/buyShopItem', async (itemId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(USERS_URL + 'shop/buy', { itemId }, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const togglePro = createAsyncThunk('auth/togglePro', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(USERS_URL + 'pro/toggle', {}, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    updateUserStats: (state, action) => {
      if (state.user && action.payload) {
        state.user = {
          ...state.user,
          ...action.payload,
          token: state.user.token
        };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
  extraReducers: (builder) => {
    const handleEconomyUpdate = (state, action) => {
      if (state.user && action.payload) {
        const token = state.user.token;
        state.user = {
          ...state.user,
          ...action.payload,
          token
        };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    };

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchEconomy.fulfilled, handleEconomyUpdate)
      .addCase(loseHeart.fulfilled, handleEconomyUpdate)
      .addCase(refillHeartsGems.fulfilled, handleEconomyUpdate)
      .addCase(refillHeartsAd.fulfilled, handleEconomyUpdate)
      .addCase(buyShopItem.fulfilled, handleEconomyUpdate)
      .addCase(togglePro.fulfilled, handleEconomyUpdate);
  },
});

export const { reset, updateUserStats } = authSlice.actions;
export default authSlice.reducer;
