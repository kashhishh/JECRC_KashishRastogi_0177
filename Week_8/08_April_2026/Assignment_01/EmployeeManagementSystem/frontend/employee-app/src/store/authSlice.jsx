import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5116/api'

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API}/auth/login`, credentials)
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const registerEmployee = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API}/auth/register`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed')
  }
})

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  const res = await axios.get(`${API}/auth/users`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  return res.data
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async (id) => {
  await axios.delete(`${API}/auth/users/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  return id
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    users: [],
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.users = []
      localStorage.removeItem('token')
      localStorage.removeItem('empState')
    },
    clearError: (state) => { state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = {
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
          employeeId: action.payload.employeeId,
          employeeName: action.payload.employeeName
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerEmployee.fulfilled, (state) => { state.loading = false })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload)
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer