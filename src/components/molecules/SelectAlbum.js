import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// components
import DropdownIcon from '../atoms/DropdownIcon'

const SelectAlbum = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button size='small' onClick={handleClick}>
        <Box display='flex'>
          <Box flexGrow={1}>
            <Typography variant='subtitle2'>Select Album</Typography>
          </Box>
          <DropdownIcon inverted={Boolean(anchorEl)} />
        </Box>
      </Button>
      <Menu
        keepMounted
        elevation={1}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
        <MenuItem dense onClick={handleClose}>Travel</MenuItem>
        <MenuItem dense onClick={handleClose}>Personal</MenuItem>
        <MenuItem dense onClick={handleClose}>Food</MenuItem>
        <MenuItem dense onClick={handleClose}>Nature</MenuItem>
        <MenuItem dense onClick={handleClose}>Other</MenuItem>
      </Menu>
    </>
  )
}

export default SelectAlbum
