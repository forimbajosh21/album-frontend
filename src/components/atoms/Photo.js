import React from 'react'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import makeStyles from '@material-ui/core/styles/makeStyles'

// animation
import { motion } from 'framer-motion'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  image: {
    height: 146,
    width: '100%',
    borderRadius: 4,
    backgroundSize: 'auto 100%',
    backgroundColor: '#E3E3E3',
    [theme.breakpoints.down('md')]: {
      height: 196
    },
    [theme.breakpoints.down('sm')]: {
      height: 166
    },
    [theme.breakpoints.down('xs')]: {
      flex: '0 1 calc(100% - 16px)',
      height: 246
    }
  },
  name: {
    fontWeight: 'bold',
    fontSize: 12
  },
  sub: {
    color: '#919191',
    fontSize: 12
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    opacity: 0.6,
    background: '#919191',
    zIndex: 1
  }
}))

const Photo = ({ name, sub, url, overlay }) => {
  const classes = useStyles()

  const randomInteger = (min, max) => {
    return (Math.random() * (1.2 - 0.1) + 0.1).toFixed(1)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: randomInteger(), ease: 'easeIn' }} className={classes.container}>
      <Box position='relative'>
        <CardMedia title={name} image={url} className={classes.image} />
        {overlay && (
          <Box className={classes.overlay} />
        )}
      </Box>
      <Typography variant='caption' align='center' display='block' className={classes.name} noWrap>{name}</Typography>
      <Typography variant='caption' align='center' display='block' className={classes.sub}>{sub}</Typography>

    </motion.div>
  )
}

export default Photo
