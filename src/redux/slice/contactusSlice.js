import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'
import { toast } from 'react-toastify'

const initialState = {
  contactData: {},
  contactUsList: {}
}

export const createContactUs = createAsyncThunk('contact-us/create', async (params, { rejectWithValue }) => {
  try {
    return await instance.post('contact-us', params)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})



const ccontactUsSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(createContactUs.pending, (state) => {
        state.loading = true;
        state.contactData = {};
      })
      .addCase(createContactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.contactData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(createContactUs.rejected, (state) => {
        state.loading = false;
        state.contactData = {};
      });
  },
});

export default ccontactUsSlice.reducer