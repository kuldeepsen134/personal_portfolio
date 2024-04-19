import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'
import { toast } from 'react-toastify'

const initialState = {
  contactData: {},
  enquiryListData: {}
}

export const createContactUs = createAsyncThunk('contact-us/create', async (params, { rejectWithValue }) => {
  try {
    return await instance.post('contact-us', params)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})


export const enquiryList = createAsyncThunk('enquiry/list', async (params, { rejectWithValue }) => {
  try {
    return await instance.get('contact-us')
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
      })

      .addCase(enquiryList.pending, (state) => {
        state.loading = true;
        state.enquiryListData = {};
      })
      .addCase(enquiryList.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiryListData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(enquiryList.rejected, (state) => {
        state.loading = false;
        state.enquiryListData = {};
      })
  },
});

export default ccontactUsSlice.reducer