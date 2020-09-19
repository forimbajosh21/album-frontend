import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

// components
import UploadFilePreview from '../atoms/UploadFilePreview'

const UploadPreviewContainer = ({ files }) => {
  if (files.length === 0) {
    return (
      <Box height={250} display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='body2'>No files selected...</Typography>
      </Box>
    )
  }
  return (
    <Box
      height={250} style={{
        overflow: 'hidden',
        overflowY: 'scroll',
        border: '1px solid #939393',
        borderRadius: 4
      }}
    >
      {files.map((image, key) => (
        <Box key={key}>
          <UploadFilePreview text={image.name} />
          {(key + 1) !== files.length && <Divider />}
        </Box>
      ))}
    </Box>
  )
}

export default UploadPreviewContainer
