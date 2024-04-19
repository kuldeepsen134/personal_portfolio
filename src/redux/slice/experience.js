import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'
import { toast } from 'react-toastify'

const initialState = {
    loading: false,
    experienceListData: {},
    experienceData: {},
}

export const createExperience = createAsyncThunk('/create/experiences', async (value, { rejectWithValue }) => {
    try {
        return await instance.post(`/experiences`, value)
    } catch (error) {
        return rejectWithValue(error.responce)
    }
})

export const experienceList = createAsyncThunk('/experiences', async ({ rejectWithValue }) => {
    try {
        return await instance.get(`/experiences`,)
    } catch (error) {
        return rejectWithValue(error.responce)
    }
})

export const experienceListOne = createAsyncThunk('/experiences/:id', async (id, { rejectWithValue }) => {
    try {
        return await instance.get(`/experiences/${id}`)
    } catch (error) {
        return rejectWithValue(error.responce)
    }
})

export const updateExperience = createAsyncThunk('/update/experiences', async (params) => {
    try {
        return await instance.patch(`/experiences/${params.id}`, params)
    } catch (error) {
        return (error.responce)
    }
})

export const deleteExperience = createAsyncThunk('/delete/experiences/:id', async (id, { rejectWithValue }) => {
    try {
      return await instance.delete(`/experiences/${id}`,)
    } catch (error) {
      return rejectWithValue(error.responce)
    }
  })

const experienceSlice = createSlice({
    name: 'experience',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createExperience.pending, (state) => {
                state.loading = true;
                state.loading = false;
                state.experienceData = {};
            })
            .addCase(createExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.experienceData = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(createExperience.rejected, (state) => {
                state.loading = false;
                state.experienceData = {};
            })
            .addCase(experienceList.pending, (state) => {
                state.loading = true;
                state.experienceListData = {};
            })
            .addCase(experienceList.fulfilled, (state, action) => {
                state.loading = false;
                state.experienceListData = action.payload;
            })
            .addCase(experienceList.rejected, (state) => {
                state.loading = false;
                state.experienceListData = {};
            })
            .addCase(experienceListOne.pending, (state) => {
                state.loading = true;
                state.experienceData = {};
            })
            .addCase(experienceListOne.fulfilled, (state, action) => {
                state.loading = false;
                state.experienceData = action.payload;
            })
            .addCase(experienceListOne.rejected, (state) => {
                state.loading = false;
                state.experienceData = {};
            })
            .addCase(updateExperience.pending, (state) => {
                state.loading = true;
                state.experienceData = {};
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.experienceData = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(updateExperience.rejected, (state) => {
                state.loading = false;
                state.experienceData = {};
            })
            .addCase(deleteExperience.pending, (state) => {
                state.loading = true;
                state.experienceData = {};
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.experienceData = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(deleteExperience.rejected, (state) => {
                state.loading = false;
                state.experienceData = {};
            })
    },
});

export default experienceSlice.reducer