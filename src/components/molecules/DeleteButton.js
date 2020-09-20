import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'

import { AnimatePresence, motion } from 'framer-motion'

import DeleteIcon from '../atoms/DeleteIcon'

const UploadButton = ({ action, disabled }) => {
  return (
    <AnimatePresence>
      {action && (
        <>
          <motion.div style={{ display: 'inline-block' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ ease: 'easeInOut' }}>
            <Button size='small' onClick={action && action} disabled={disabled}>
              <Box display='flex' alignItems='center'>
                <DeleteIcon />
                <Hidden xsDown>
                  <Box flexGrow={1} ml={1}>
                    <Typography variant='subtitle2'>Delete</Typography>
                  </Box>
                </Hidden>
              </Box>

            </Button>
          </motion.div>
          <Divider flexItem orientation='vertical' variant='middle' />

        </>
      )}
    </AnimatePresence>
  )
}

export default UploadButton
