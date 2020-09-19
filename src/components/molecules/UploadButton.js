import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import UploadIcon from '../atoms/UploadIcon'

const UploadButton = ({ action, disabled }) => {
  return (
    <Button size='small' onClick={action && action} disabled={disabled}>
      <Box display='flex' alignItems='center'>
        <UploadIcon />
        <Box flexGrow={1} ml={1}>
          <Typography variant='subtitle2'>Upload</Typography>
        </Box>
      </Box>

    </Button>
  )
}

export default UploadButton
