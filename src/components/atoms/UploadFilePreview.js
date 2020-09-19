import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const UploadFilePreview = ({ text }) => {
  return (
    <Box style={{
      padding: '6px 8px'
    }}
    >
      <Typography variant='subtitle2'>{text}</Typography>
    </Box>
  )
}

export default UploadFilePreview
