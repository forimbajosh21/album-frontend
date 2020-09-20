import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios.config'

/**
 * Get Photo list
 */
export const photoListAPI = createAsyncThunk('album/photoListAPI', async (payloadObj, { rejectWithValue }) => {
  try {
    const response = await axios.post('/photos/list', payloadObj)
    const { message, documents, skip } = response.data
    return { message, documents, skip }
  } catch (error) {
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
    loadedAll: false, // If all photos are already displayed or fetched
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
      if (action.payload.documents.length === 0 || action.payload.documents.length !== state.filter.limit) {
        state.loadedAll = true
      }
      if (action.payload.skip > 0) {
        state.lists = [...state.lists, ...action.payload.documents]
      } else {
        state.lists = action.payload.documents
      }
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
