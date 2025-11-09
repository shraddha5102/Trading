import { configureStore } from '@reduxjs/toolkit'
import { tokensReducer } from './slices/tokensSlice'
import { uiReducer } from './slices/uiSlice'
import { websocketMiddleware } from './middleware/websocketMiddleware'

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch