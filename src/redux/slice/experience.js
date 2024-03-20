import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'
import { toast } from 'react-toastify'

const initialState = {
    loading: false,
    experienceListData: {},
    experienceData: {},
}


export const createExperience = createAsyncThunk('/create/experiences', async ({ rejectWithValue }) => {
    try {
        return await instance.post(`/experiences`,)
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
            });
    },
});

export default experienceSlice.reducer