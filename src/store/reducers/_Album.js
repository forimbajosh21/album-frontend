import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.config'

/**
 * Get Photo list
 */
export const photoListAPI = createAsyncThunk('album/photoListAPI', async (payloadObj, { rejectWithValue }) => {
  try {
    const response = await axios.post('/photos/list', payloadObj)
    const { message, documents } = response.data
    return { message, documents }
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})

/**
 * Upload Photo
 * @param payloadObj FormData { album: string, documents: File }
 */
export const uploadAPI = createAsyncThunk('album/uploadAPI', async (payloadObj, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.put('/photos', payloadObj, {
      onUploadProgress: (progressEvent) => {
        dispatch(setAlbumState({ state: 'uploadProgress', data: Math.round((progressEvent.loaded * 100) / progressEvent.total) }))
      }
    })
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
    filter: {
      skip: 0,
      limit: 25
    },
    lists: [], // List of Photos
    uploadModalOpen: false,
    types: ['Travel', 'Personal', 'Food', 'Nature', 'Other'],
    selectedType: '', // selected album type when uploading
    isUploading: false, // upload photo status
    uploadKey: 0, // key of the image being uploaded
    uploadProgress: 0 // progress of uploaded file
  },
  reducers: {
    setAlbumState: (state, action) => {
      state[action.payload.state] = action.payload.data
    }
  },
  extraReducers: {
    [photoListAPI.fulfilled]: (state, action) => {
      state.lists = action.payload.documents
    },
    [uploadAPI.pending]: (state) => {
      state.isUploading = true
    },
    [uploadAPI.fulfilled]: (state) => {
      state.isUploading = false
    }
  }
})

const { reducer, actions } = slice
const { setAlbumState } = actions

export { setAlbumState }
export default reducer
