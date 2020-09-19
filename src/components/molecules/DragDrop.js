import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  container: {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '.5px dashed #9e9e9e',
    cursor: 'pointer'
  },
  inputContainer: {
    display: 'none'
  }
})

const DragDrop = ({ setUpload }) => {
  const classes = useStyles()
  const inputRef = React.useRef(null)

  const onClick = () => {
    inputRef.current.click()
  }

  const onChange = (ev) => {
    // serialize files
    const container = []
    const files = ev.target.files
    Array.from(files).forEach(file => container.push(file))
    setUpload(container)
  }

  return (
    <>
      <Box className={classes.container} onClick={onClick}>
        <Typography variant='caption'>
          Drag 'n' Drop some files here, or click to select files
        </Typography>
      </Box>
      <Box className={classes.inputContainer}>
        <TextField onChange={onChange} type='file' inputRef={inputRef} inputProps={{ accept: 'image/png, image/jpeg, image/webp', multiple: true }} />
      </Box>
    </>
  )
}

export default DragDrop
