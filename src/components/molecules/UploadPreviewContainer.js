import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { scroller } from 'react-scroll'

// redux
import { useSelector } from 'react-redux'

// components
import UploadFilePreview from '../atoms/UploadFilePreview'

const useStyles = makeStyles((theme) => ({
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
    },
    [theme.breakpoints.down('xs')]: {
      height: '75%'
    }
  },
  progress: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#81C784',
    opacity: 0.3
  }
}))

const UploadPreviewContainer = ({ files }) => {
  const classes = useStyles()
  const { uploadKey, uploadProgress } = useSelector(state => state.album)
  const containerRef = React.useRef(null)

  // scroll into view the preview file being uploaded
  React.useEffect(() => {
    if ((uploadKey + 1) === files.length) {
      if (containerRef) {
        const name = `file-preview-${uploadKey}`
        scroller.scrollTo(name, {
          duration: 1500,
          delay: 0,
          smooth: 'easeInOutQuart',
          containerId: 'preview-container'
        })
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

  const getProgress = (currentKey, key, progress) => {
    if (currentKey < key) {
      return 100
    }
    if (currentKey === key) {
      return progress
    }
    return 0
  }

  const renderFiles = (image, index) => {
    const progress = getProgress(index, uploadKey, uploadProgress)
    return (
      <Box key={index} position='relative'>
        <UploadFilePreview text={image.name} name={index} />
        <Divider />
        <Box className={classes.progress} style={{ width: `${progress}%` }} />
      </Box>
    )
  }

  return (
    <Box className={classes.container} ref={containerRef} id='preview-container'>
      {files.map((image, index) => renderFiles(image, index))}
    </Box>
  )
}

export default UploadPreviewContainer
