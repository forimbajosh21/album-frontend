import React from 'react'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import makeStyles from '@material-ui/core/styles/makeStyles'

// redux
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  photo: {
    height: 140,
    width: '100%',
    margin: 4,
    flex: '0 1 calc(20% - 8px)',
    borderRadius: 4
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 4
  }
}))

const PhotoList = () => {
  const classes = useStyles()
  const { lists } = useSelector(state => state.album)
  return (
    <Box className={classes.container}>
      {lists.map((li, index) => <Box key={index} className={classes.photo}><CardMedia title={li.name} image={li.raw} className={classes.image} /></Box>)}
    </Box>
  )
}

export default PhotoList
