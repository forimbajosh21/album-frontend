import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { AnimatePresence, motion } from 'framer-motion'

const useStyles = makeStyles({
  container: {
    position: 'relative'
  },
  text: {
    fontWeight: 'bold',
    fontSize: '.90rem'
  }
})

const AlertText = ({ text }) => {
  const classes = useStyles()
  return (
    <AnimatePresence>
      {text && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ ease: 'easeInOut' }}>
          <Box className={classes.container} mb={1}>
            <Typography className={classes.text} color='error'>{text}</Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AlertText
