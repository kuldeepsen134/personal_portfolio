import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'
import { toast } from 'react-toastify'

const initialState = {
  userEducationListData: {},
  userEducationData: {}
}

export const createEducation = createAsyncThunk('/create/educations', async (params, { rejectWithValue }) => {
  try {
    return await instance.post(`/educations`, params)
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

export const eductionListOne = createAsyncThunk('/educations/:id', async (id, { rejectWithValue }) => {
  try {
    return await instance.get(`/educations/${id}`)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

export const updateEducation = createAsyncThunk('/update/educations', async (params) => {
  try {
    return await instance.patch(`/educations/${params.id}`, params)
  } catch (error) {
    return (error.responce)
  }
})

export const deleteEducation = createAsyncThunk('/delete/educations/:id', async (id, { rejectWithValue }) => {
  try {
    return await instance.delete(`/educations/${id}`,)
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
      .addCase(createEducation.pending, (state) => {
        state.loading = true;
        state.userEducationData = {};
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducationData = action.payload;
      })
      .addCase(createEducation.rejected, (state) => {
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
      })
      .addCase(eductionListOne.pending, (state) => {
        state.loading = true;
        state.userEducationData = {};
      })
      .addCase(eductionListOne.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducationData = action.payload;
      })
      .addCase(eductionListOne.rejected, (state) => {
        state.loading = false;
        state.userEducationData = {};
      })
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
        state.userEducationData = {};
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducationData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(updateEducation.rejected, (state) => {
        state.loading = false;
        state.userEducationData = {};
      })
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
        state.userEducationData = {};
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducationData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(deleteEducation.rejected, (state) => {
        state.loading = false;
        state.userEducationData = {};
      })
  },
});

export default userSlice.reducer