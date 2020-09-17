import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'album',
  initialState: {
    types: ['Travel', 'Personal', 'Food', 'Nature', 'Other']
  },
  reducers: {},
  extraReducers: {}
})

const { reducer } = slice

export default reducer
