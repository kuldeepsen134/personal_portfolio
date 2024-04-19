import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import instance from '../axios/axios'

const initialState = {
    loading: false,
    loggedInUser: {},
    isUserLoggedIn: localStorage.getItem('token') ? true : false
}

export const login = createAsyncThunk('account/login', async (data, { rejectWithValue }) => {
    try {
        return await instance.post('login', data, { withCredentials: true })

    } catch (error) {
        return rejectWithValue(error.responce)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state,) => {
                state.loading = true
                state.isUserLoggedIn = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.isUserLoggedIn = true
                state.loggedInUser = action.payload
                toast.success(action.payload.message);
                localStorage.setItem('token', action?.payload?.token)
            })
            .addCase(login.rejected, (state,) => {
                state.loading = false
                state.isUserLoggedIn = false
            })
    }
})

export default authSlice.reducer