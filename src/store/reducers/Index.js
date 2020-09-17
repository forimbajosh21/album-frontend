import { combineReducers } from '@reduxjs/toolkit'

import AlbumReducer from './_Album'

const rootReducer = combineReducers({
  album: AlbumReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export default rootReducer
