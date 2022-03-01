import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CurrentUserState {
  email: String | null | undefined
}

const initialState: CurrentUserState = {
  email: '',
}

export const currentUserSlice = createSlice({
  name: 'currentuser',
  initialState,
  reducers: {
    setCurrentUserEmail: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.email = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUserEmail } = currentUserSlice.actions

export default currentUserSlice.reducer
