import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'

// redux
import { useDispatch } from 'react-redux'
import { setAlbumState } from '../../store/reducers/_Album'

// components
import UploadButton from '../molecules/UploadButton'
import SortMenu from '../molecules/SortMenu'

const LightAppBar = withStyles({
  root: {
    background: '#FFF',
    color: 'inherit'
  }
})(AppBar)

const Appbar = () => {
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(setAlbumState({ state: 'uploadModalOpen', data: true }))
  }
  return (
    <>
      <LightAppBar elevation={0}>
        <Container>
          <Toolbar>
            <Box flexGrow={1}>
              <Typography variant='h6'>Photos</Typography>
            </Box>
            <Box display='flex'>
              <UploadButton action={openModal} />
              <Divider flexItem orientation='vertical' variant='middle' />
              <SortMenu />
            </Box>
          </Toolbar>
        </Container>
      </LightAppBar>
      <Toolbar />
    </>
  )
}

export default Appbar
