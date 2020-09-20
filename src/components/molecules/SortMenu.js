import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumState } from '../../store/reducers/_Album'

// components
import DropdownIcon from '../atoms/DropdownIcon'

const SortMenu = () => {
  const dispatch = useDispatch()
  const { filter: { limit, skip } } = useSelector(state => state.album)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value) => {
    setAnchorEl(null)

    if (value) {
      dispatch(setAlbumState({ state: 'filter', data: { limit: value, skip: skip } }))
    }
  }

  return (
    <>
      <Button size='small' onClick={handleClick}>
        <Box display='flex'>
          <Box flexGrow={1} mx={1}>
            <Typography variant='caption'>{limit}</Typography>
          </Box>
          <DropdownIcon inverted={Boolean(anchorEl)} />
        </Box>
      </Button>
      <Menu
        keepMounted
        elevation={1}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem dense onClick={() => handleClose(25)} disabled={limit === 25}>25</MenuItem>
        <MenuItem dense onClick={() => handleClose(50)} disabled={limit === 50}>50</MenuItem>
        <MenuItem dense onClick={() => handleClose(100)} disabled={limit === 100}>100</MenuItem>
      </Menu>
    </>
  )
}

export default SortMenu
