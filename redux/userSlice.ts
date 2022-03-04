import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  user: {
    username: string
    email: string
    image: string
  }
}

const initialState: User = {
  user: {
    username: '',
    email: '',
    image: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { addUserInfo } = userSlice.actions
