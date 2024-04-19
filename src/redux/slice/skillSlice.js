import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/axios'

const initialState = {
  userSkillsListData: {},
  userSkillsData: {}
}

export const createSkills = createAsyncThunk('/create/skills', async (value, { rejectWithValue }) => {
  try {
    return await instance.post(`/skills`, value)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

export const skillsList = createAsyncThunk('/skills', async ({ rejectWithValue }) => {
  try {
    return await instance.get(`/skills`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

export const skillsListOne = createAsyncThunk('/skills/:id', async (id, { rejectWithValue }) => {
  try {
    return await instance.get(`/skills/${id}`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})


export const deleteSkill = createAsyncThunk('/delete/skills/:id', async (id, { rejectWithValue }) => {
  try {
    return await instance.delete(`/skills/${id}`,)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

export const updateSkill = createAsyncThunk('/update/skills', async ({ id, formData }) => {
  try {
    return await instance.patch(`/skills/${id}`, formData)
  } catch (error) {
    return (error.responce)
  }
})


const skillSlice = createSlice({
  name: 'skills',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSkills.pending, (state) => {
        state.loading = true;
        state.userSkillsData = {};
      })
      .addCase(createSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.userSkillsData = action.payload;
      })
      .addCase(createSkills.rejected, (state) => {
        state.loading = false;
        state.userSkillsData = {};
      })
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
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.userSkillsData = {};
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.userSkillsData = action.payload;
      })
      .addCase(updateSkill.rejected, (state) => {
        state.loading = false;
        state.userSkillsData = {};
      })
  },
});

export default skillSlice.reducer