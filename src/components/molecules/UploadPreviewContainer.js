import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/core/styles/makeStyles'

// redux
import { useSelector } from 'react-redux'

// components
import UploadFilePreview from '../atoms/UploadFilePreview'
import UploadProgressComponent from '../atoms/UploadProgess'

const useStyles = makeStyles({
  container: {
    height: 250,
    overflow: 'hidden',
    overflowY: 'scroll',
    border: '1px solid #939393',
    borderRadius: 4,
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: '#F5F5F5'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#E3E3E3'
    }
  }
})

const UploadPreviewContainer = ({ files }) => {
  const classes = useStyles()
  const { uploadKey, uploadProgress } = useSelector(state => state.album)
  const containerRef = React.useRef(null)

  // scroll into view the preview file being uploaded
  React.useEffect(() => {
    if (uploadKey > 6) {
      if (containerRef) {
        containerRef.current.children[uploadKey].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [uploadKey])

  if (files.length === 0) {
    return (
      <Box height={250} display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='body2'>No files selected...</Typography>
      </Box>
    )
  }
  return (
    <Box className={classes.container} ref={containerRef}>
      {files.map((image, key) => (
        <Box key={key} position='relative'>
          <UploadFilePreview text={image.name} />
          <Divider />
          <UploadProgressComponent progress={image.isUploaded ? 100 : uploadKey === key ? uploadProgress : 0} />
        </Box>
      ))}
    </Box>
  )
}

export default UploadPreviewContainer
