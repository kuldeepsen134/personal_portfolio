import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'

const initialState = {
  userEducationListData: {},
  userEducationData: {}
}


export const createExperience = createAsyncThunk('/create/educations', async ({ rejectWithValue }) => {
  try {
    return await instance.post(`/educations`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

export const educationsList = createAsyncThunk('/educations/list', async ({ rejectWithValue }) => {
  try {
    return await instance.get(`/educations`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})




const userSlice = createSlice({
  name: 'resume',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
        state.userEducationData = {};
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducationData = action.payload;
      })
      .addCase(createExperience.rejected, (state) => {
        state.loading = false;
        state.userEducationData = {};
      })



      .addCase(educationsList.pending, (state) => {
        state.loading = true;
        state.userEducationListData = {};
      })
      .addCase(educationsList.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducationListData = action.payload;
      })
      .addCase(educationsList.rejected, (state) => {
        state.loading = false;
        state.userEducationListData = {};
      });
  },
});

export default userSlice.reducer