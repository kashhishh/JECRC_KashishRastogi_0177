import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: 'dark', loading: false, notification: null },
  reducers: {
    toggleTheme: (state) => { state.theme = state.theme === 'dark' ? 'light' : 'dark' },
    setLoading: (state, action) => { state.loading = action.payload },
    setNotification: (state, action) => { state.notification = action.payload },
    clearNotification: (state) => { state.notification = null },
  },
})

export const { toggleTheme, setLoading, setNotification, clearNotification } = uiSlice.actions
export default uiSlice.reducer