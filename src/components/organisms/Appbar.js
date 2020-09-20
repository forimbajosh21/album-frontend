import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import findIndex from 'lodash/findIndex'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumState, singleDeleteAPI, multipleDeleteAPI } from '../../store/reducers/_Album'

// components
import DeleteButton from '../molecules/DeleteButton'
import UploadButton from '../molecules/UploadButton'
import SortMenu from '../molecules/SortMenu'
import ConfirmDialog from '../organisms/ConfirmModal'

const LightAppBar = withStyles({
  root: {
    background: '#FFF',
    color: 'inherit'
  }
})(AppBar)

const Appbar = () => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const dispatch = useDispatch()
  const { lists, selectedDelete } = useSelector(state => state.album)

  const openModal = () => {
    dispatch(setAlbumState({ state: 'uploadModalOpen', data: true }))
  }

  const confirmOkAction = () => {
    dispatch(setAlbumState({ state: 'confirmModalOpen', data: false }))
    deleteAction()
  }

  const confirmCancelAction = () => {
    dispatch(setAlbumState({ state: 'confirmModalOpen', data: false }))
  }

  const deleteAction = () => {
    if (selectedDelete.length > 1) {
      const x = []
      selectedDelete.forEach((d, index) => {
        const y = findIndex(x, { album: lists[d].album }) // get index if present
        if (y !== -1) {
          x[y].documents = x[y].documents + ', ' + lists[d].name
        } else {
          x.push({ album: lists[d].album, documents: lists[d].name })
        }
      })
      dispatch(multipleDeleteAPI(x))
    } else {
      const x = lists[selectedDelete[0]]
      dispatch(singleDeleteAPI({ album: x.album, name: x.name }))
    }
  }

  const deleteButtonAction = () => {
    dispatch(setAlbumState({ state: 'confirmModalOpen', data: true }))
  }

  const confirmModalText = 'Are you sure you want to delete ' + selectedDelete.length + ' ' + (selectedDelete.length > 1 ? 'items?' : 'item?')

  return (
    <>
      <LightAppBar elevation={0}>
        <Container disableGutters={xsDown}>
          <Toolbar>
            <Box flexGrow={1}>
              <Typography variant='h6'>Photos</Typography>
            </Box>
            <Box display='flex'>
              <DeleteButton action={selectedDelete.length > 0 ? deleteButtonAction : null} />
              <UploadButton action={openModal} />
              <Divider flexItem orientation='vertical' variant='middle' />
              <SortMenu />
            </Box>
          </Toolbar>
        </Container>
      </LightAppBar>
      <Toolbar />
      <ConfirmDialog text={confirmModalText} ok={confirmOkAction} cancel={confirmCancelAction} />
    </>
  )
}

export default Appbar
