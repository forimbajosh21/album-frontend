import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumState} from '../../store/reducers/_Album'

// components
import DropdownIcon from '../atoms/DropdownIcon'

const SelectAlbum = ({ disabled }) => {
  const dispatch = useDispatch()
  const { selectedType } = useSelector(state => state.album)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value) => {
    if (value) {
      dispatch(setAlbumState({ state: 'selectedType', data: value }))
    }
    setAnchorEl(null)
  }

  return (
    <>
      <Button size='small' onClick={handleClick}>
        <Box display='flex'>
          <Box flexGrow={1}>
            <Typography variant='subtitle2' style={{ minWidth: 84 }}>{selectedType || 'Select Album'}</Typography>
          </Box>
          <DropdownIcon inverted={Boolean(anchorEl)} />
        </Box>
      </Button>
      <Menu
        keepMounted
        elevation={1}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={ev => handleClose()}
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
        <MenuItem dense onClick={() => handleClose('Travel')}>Travel</MenuItem>
        <MenuItem dense onClick={() => handleClose('Personal')}>Personal</MenuItem>
        <MenuItem dense onClick={() => handleClose('Food')}>Food</MenuItem>
        <MenuItem dense onClick={() => handleClose('Nature')}>Nature</MenuItem>
        <MenuItem dense onClick={() => handleClose('Other')}>Other</MenuItem>
      </Menu>
    </>
  )
}

export default SelectAlbum
