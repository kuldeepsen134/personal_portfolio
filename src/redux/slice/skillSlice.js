import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'

const initialState = {
  userSkillsListData: {},
  userSkillsData: {}
}

// export const createUser = createAsyncThunk('user/create', async (params, { rejectWithValue }) => {
//   try {
//     return await instance.post('users', params)
//   } catch (error) {
//     return rejectWithValue(error.responce)
//   }
// })



export const skillsList = createAsyncThunk('/skills', async ({ rejectWithValue }) => {
  try {
    return await instance.get(`/skills`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

export const skillsListOne = createAsyncThunk('/skills/:id', async (id, { rejectWithValue }) => {
  try {
    return await instance.get(`/skills/:${id}`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})




const skillSlice = createSlice({
  name: 'skills',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(skillsList.pending, (state) => {
        state.loading = true;
        state.userSkillsListData = {};
      })
      .addCase(skillsList.fulfilled, (state, action) => {
        state.loading = false;
        state.userSkillsListData = action.payload;
      })
      .addCase(skillsList.rejected, (state) => {
        state.loading = false;
        state.userSkillsListData = {};
      })











      .addCase(skillsListOne.pending, (state) => {
        state.loading = true;
        state.userSkillsData = {};
      })
      .addCase(skillsListOne.fulfilled, (state, action) => {
        state.loading = false;
        state.userSkillsData = action.payload;
      })
      .addCase(skillsListOne.rejected, (state) => {
        state.loading = false;
        state.userSkillsData = {};
      });

  },
});

export default skillSlice.reducer