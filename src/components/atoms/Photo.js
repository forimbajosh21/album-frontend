import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import makeStyles from '@material-ui/core/styles/makeStyles'

// animation
import { motion } from 'framer-motion'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%'
  },
  image: {
    height: 146,
    width: '100%',
    borderRadius: 4,
    backgroundSize: 'auto 100%',
    backgroundColor: '#E3E3E3'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 12
  },
  sub: {
    color: '#919191',
    fontSize: 12
  }
})

const Photo = ({ name, sub, url }) => {
  const classes = useStyles()

  const randomInteger = (min, max) => {
    return (Math.random() * (2 - 0.1) + 0.1).toFixed(1)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: randomInteger(), ease: 'easeIn' }} className={classes.container}>
      <CardMedia title={name} image={url} className={classes.image} />
      <Typography variant='caption' align='center' display='block' className={classes.name}>{name}</Typography>
      <Typography variant='caption' align='center' display='block' className={classes.sub}>{sub}</Typography>
    </motion.div>
  )
}

export default Photo
