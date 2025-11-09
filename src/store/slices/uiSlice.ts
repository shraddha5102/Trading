import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface UiState {
  websocketConnected: boolean
  theme: 'light' | 'dark'
}

const initialState: UiState = {
  websocketConnected: false,
  theme: 'dark',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setWebsocketConnected: (state, action: PayloadAction<boolean>) => {
      state.websocketConnected = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
  },
})

export const { setWebsocketConnected, setTheme } = uiSlice.actions

export const selectWebsocketConnected = (state: RootState) =>
  state.ui.websocketConnected
export const selectTheme = (state: RootState) => state.ui.theme

export const uiReducer = uiSlice.reducer