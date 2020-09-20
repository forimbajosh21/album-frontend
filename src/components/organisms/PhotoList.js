import React from 'react'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { scroller } from 'react-scroll'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumState } from '../../store/reducers/_Album'

// components
import LoadMoreButton from '../molecules/LoadMoreButton'
import Photo from '../atoms/Photo'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingBottom: 50
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  photo: {
    height: 180,
    width: '100%',
    margin: 8,
    flex: '0 1 calc(20% - 16px)',
    borderRadius: 4
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 'max-content'
  }
}))

const PhotoList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { lists, filter, loadedAll } = useSelector(state => state.album)

  React.useEffect(() => {
    if (lists.length > 25) {
      const lastIndex = lists.length - 1
      const name = `photo-container-${lastIndex}`
      scroller.scrollTo(name, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    }
  }, [lists])

  const loadMore = async (ev) => {
    ev.preventDefault()
    const { skip, limit } = filter
    const newFilter = { skip: skip + limit, limit: limit }
    await dispatch(setAlbumState({ state: 'filter', data: newFilter }))
  }

  const renderPhoto = (index, photo) => {
    const name = `photo-container-${index}`
    return (
      <Box key={index} name={name} className={classes.photo}>
        <Photo name={photo.name} sub={photo.album} url={photo.raw} />
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {lists.map((li, index) => renderPhoto(index, li))}
      </Box>
      {!loadedAll && (
        <Box className={classes.buttonContainer}>
          <LoadMoreButton action={loadMore} />
        </Box>
      )}
    </Box>
  )
}

export default PhotoList
