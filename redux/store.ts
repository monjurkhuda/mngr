import { createStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice.reducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)

type RootState = ReturnType<typeof store.getState>

export const selectUser = (state: RootState) => state.user
