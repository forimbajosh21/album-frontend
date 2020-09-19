import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import withStyles from '@material-ui/core/styles/withStyles'

const Success = withStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    opacity: 0.3,
    backgroundColor: 'transparent'
  },
  bar: {
    backgroundColor: '#81C784'
  }
}))(LinearProgress)

const UploadProgress = ({ progress }) => {
  return (
    <Success variant='determinate' value={progress} />
  )
}

export default UploadProgress
