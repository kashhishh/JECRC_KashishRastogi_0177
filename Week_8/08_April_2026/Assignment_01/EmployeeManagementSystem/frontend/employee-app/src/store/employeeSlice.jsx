import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5116/api'

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async () => {
  const res = await axios.get(`${API}/employees`, getHeaders())
  return res.data
})

export const addEmployee = createAsyncThunk('employees/add', async (data) => {
  const res = await axios.post(`${API}/employees`, data, getHeaders())
  return res.data
})

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, data }) => {
  const res = await axios.put(`${API}/employees/${id}`, data, getHeaders())
  return res.data
})

export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
  await axios.delete(`${API}/employees/${id}`, getHeaders())
  return id
})

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [], loading: false, error: null, selected: null },
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload },
    clearSelected: (state) => { state.selected = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.loading = true })
      .addCase(fetchEmployees.fulfilled, (state, action) => { state.loading = false; state.list = action.payload })
      .addCase(fetchEmployees.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(addEmployee.fulfilled, (state, action) => { state.list.push(action.payload) })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.list.findIndex(e => e.id === action.payload.id)
        if (idx !== -1) state.list[idx] = action.payload
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload)
      })
  },
})

export const { setSelected, clearSelected } = employeeSlice.actions
export default employeeSlice.reducer