import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.config'

/**
 * Upload Photo
 * @param payloadObj FormData { album: string, documents: File }
 */
export const uploadAPI = createAsyncThunk('album/uploadAPI', async (payloadObj, { rejectWithValue }) => {
  try {
    const response = await axios.put('/photos', payloadObj)
    const { message } = response.data
    return { message }
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})

/**
 * Get Photo list
 */
export const photoListAPI = createAsyncThunk('album/photoListAPI', async (payloadObj, { rejectWithValue }) => {
  try {
    const response = await axios.post('/photos/list', payloadObj)
    const { message } = response.data
    return { message }
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})

const slice = createSlice({
  name: 'album',
  initialState: {
    types: ['Travel', 'Personal', 'Food', 'Nature', 'Other'],
    lists: [],
    filter: {
      skip: 0,
      limit: 25
    }
  },
  reducers: {
    setAlbumState: (state, action) => {
      state[action.payload.state] = action.payload.data
    }
  },
  extraReducers: {}
})

const { reducer, actions } = slice
const { setAlbumState } = actions

export { setAlbumState }
export default reducer
