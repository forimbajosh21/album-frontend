import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// components
import DropdownIcon from '../atoms/DropdownIcon'

const SortMenu = () => {
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
          <Box flexGrow={1} mx={1}>
            <Typography variant='caption'>25</Typography>
          </Box>
          <DropdownIcon inverted={Boolean(anchorEl)} />
        </Box>
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
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
        <MenuItem dense onClick={handleClose}>25</MenuItem>
        <MenuItem dense onClick={handleClose}>50</MenuItem>
        <MenuItem dense onClick={handleClose}>100</MenuItem>
      </Menu>
    </>
  )
}

export default SortMenu
