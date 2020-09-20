import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

// redux
import { useSelector } from 'react-redux'

const ConfirmModal = ({ text, ok, cancel }) => {
  const { confirmModalOpen } = useSelector(state => state.album)
  return (
    <Dialog
      open={confirmModalOpen}
      onClose={cancel}
    >
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel && cancel}>
          No
        </Button>
        <Button onClick={ok && ok} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
