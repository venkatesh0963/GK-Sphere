import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

export const fetchLeaderboard = createAsyncThunk('data/fetchLeaderboard', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'leaderboard', config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchAchievements = createAsyncThunk('data/fetchAchievements', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'achievements', config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchProgress = createAsyncThunk('data/fetchProgress', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get('http://localhost:5000/api/progress', config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  leaderboard: [],
  achievements: [],
  progressHistory: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => { state.isLoading = true; })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload.badges;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.progressHistory = action.payload;
      });
  },
});

export default dataSlice.reducer;
