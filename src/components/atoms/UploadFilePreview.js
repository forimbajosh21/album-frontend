import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const UploadFilePreview = ({ text, index }) => {
  const name = `file-preview-${index}`
  return (
    <Box
      style={{
        padding: '6px 8px'
      }} name={name}
    >
      <Typography variant='subtitle2'><Box fontWeight='bold'>{text}</Box></Typography>
    </Box>
  )
}

export default UploadFilePreview
