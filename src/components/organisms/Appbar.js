import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

// components
import UploadButton from '../molecules/UploadButton'
import SortMenu from '../molecules/SortMenu'

const Appbar = () => {
  return (
    <AppBar color='transparent' elevation={0}>
      <Container>
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant='h6'>Photos</Typography>
          </Box>
          <Box display='flex'>
            <UploadButton />
            <Divider flexItem orientation='vertical' variant='middle' />
            <SortMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Appbar
