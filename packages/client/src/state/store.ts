import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { authApiSlice } from './auth/authApiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
