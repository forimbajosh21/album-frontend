import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { uploadAPI, setAlbumState } from '../../store/reducers/_Album'

// lodash
import find from 'lodash/find'

// components
import CloseIcon from '../atoms/CloseIcon'
import DragDrop from '../molecules/DragDrop'
import SelectAlbum from '../molecules/SelectAlbum'
import UploadButton from '../molecules/UploadButton'
import UploadPreviewContainer from '../molecules/UploadPreviewContainer'
import AlertText from '../atoms/AlertText'

const useStyles = makeStyles((theme) => ({
  scrollPaper: {
    alignItems: 'baseline',
    marginTop: 50,
    [theme.breakpoints.down('xs')]: {
      marginTop: 'unset'
    }
  },
  actionContainer: {
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TransitionDefault = React.forwardRef(function Transition (props, ref) {
  return <Fade direction='up' ref={ref} {...props} />
})

const UploadModal = () => {
  const classes = useStyles()
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const dispatch = useDispatch()
  const { uploadModalOpen, selectedType, isUploading } = useSelector(state => state.album)
  const [upload, setUpload] = React.useState([])
  const [errorFileType, setErrorFileType] = React.useState(false)

  const closeModal = () => {
    dispatch(setAlbumState({ state: 'uploadModalOpen', data: false }))
  }

  /**
   * Check whether the file is already present
   * @param {Array} files
   */
  const transformData = (files) => {
    const allowedExtension = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']
    const container = []
    const fileError = Array.from(files).filter(file => !allowedExtension.includes(file.type))
    console.log(fileError)

    if (fileError.length > 0) {
      setErrorFileType(true)
      return [...upload]
    } else {
      setErrorFileType(false)
    }
    Array.from(files).forEach(file => {
      const isPresent = find(upload, { name: file.name })
      if (isPresent === undefined) {
        container.push(file)
      }
    })
    const newUpload = [...upload, ...container]
    return newUpload
  }

  const onClick = async () => {
    for (let index = 0; index < upload.length; index++) {
      if (upload[index].isUploaded !== true) {
        const formData = new FormData()
        const type = selectedType
        formData.append('album', type.toLowerCase())
        formData.append('documents', upload[index])
        dispatch(setAlbumState({ state: 'uploadKey', data: index })) // update upload key
        dispatch(setAlbumState({ state: 'uploadProgress', data: 0 })) // update upload progress
        await uploadAction(formData)
        upload[index].isUploaded = true
      }
    }
  }

  const onDrop = (ev) => {
    ev.preventDefault()
    const files = ev.dataTransfer.files
    const x = transformData(files)
    setUpload(x)
  }

  const updateUpload = (ev) => {
    // serialize files
    const files = ev.target.files
    const x = transformData(files)
    setUpload(x)
  }

  const uploadAction = async (data) => {
    await dispatch(uploadAPI(data))
  }

  const buttonUploadDisabled = () => {
    if (!selectedType) {
      return true
    }
    if (upload.length === 0) {
      return true
    }
    if (isUploading) {
      return true
    }
    return false
  }

  return (
    <Dialog
      open={uploadModalOpen} fullWidth disableBackdropClick disableEscapeKeyDown maxWidth='sm'
      fullScreen={xsDown} TransitionComponent={xsDown ? Transition : TransitionDefault}
      onDrop={onDrop} onDragOver={ev => ev.preventDefault()}
      classes={{ scrollPaper: classes.scrollPaper }}
    >
      <Box position='absolute' right={10} top={10}>
        <IconButton size='small' onClick={closeModal} disabled={isUploading}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle>
        Upload Photos
      </DialogTitle>
      <DialogContent>
        <Box position='relative'>
          <AlertText text={errorFileType ? 'Image files only.' : null} />
        </Box>
        <DragDrop setUpload={updateUpload} />
        <Box mb={3} />
        <UploadPreviewContainer files={upload} />
      </DialogContent>
      <DialogActions classes={{ root: classes.actionContainer }}>
        <SelectAlbum />
        <UploadButton action={onClick} disabled={buttonUploadDisabled()} />
      </DialogActions>
    </Dialog>
  )
}

export default UploadModal
