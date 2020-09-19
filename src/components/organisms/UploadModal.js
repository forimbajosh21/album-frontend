import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

// components
import CloseIcon from '../atoms/CloseIcon'
import DragDrop from '../molecules/DragDrop'
import SelectAlbum from '../molecules/SelectAlbum'
import UploadButton from '../molecules/UploadButton'
import UploadPreviewContainer from '../molecules/UploadPreviewContainer'

// redux
import { useDispatch } from 'react-redux'
import { uploadAPI } from '../../store/reducers/_Album'

const useStyles = makeStyles({
  scrollPaper: {
    alignItems: 'baseline',
    marginTop: 50
  },
  actionContainer: {
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16
  }
})

const UploadModal = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [upload, setUpload] = React.useState([])

  const onClick = () => {
    const formData = new FormData()
    formData.append('album', 'Personal')
    upload.forEach(element => {
      formData.append('documents', element)
    })
    dispatch(uploadAPI(formData))
  }

  return (
    <Dialog
      open fullWidth disableBackdropClick disableEscapeKeyDown maxWidth='sm'
      classes={{ scrollPaper: classes.scrollPaper }}
    >
      <Box position='absolute' right={10} top={10}>
        <IconButton size='small'>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle>
        Upload Photos
      </DialogTitle>
      <DialogContent>
        <DragDrop setUpload={setUpload} />
        <Box mb={3} />
        <UploadPreviewContainer files={upload} />
      </DialogContent>
      <DialogActions classes={{ root: classes.actionContainer }}>
        <SelectAlbum />
        <UploadButton action={onClick} />
      </DialogActions>
    </Dialog>
  )
}

export default UploadModal
