import React from 'react'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { scroller } from 'react-scroll'
import remove from 'lodash/remove'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumState } from '../../store/reducers/_Album'

// components
import LoadMoreButton from '../molecules/LoadMoreButton'
import Photo from '../atoms/Photo'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingBottom: 80
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  photo: {
    position: 'relative',
    height: 180,
    width: '100%',
    margin: 8,
    flex: '0 1 calc(20% - 16px)',
    borderRadius: 4,
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      flex: '0 1 calc(33.3% - 16px)',
      height: 240
    },
    [theme.breakpoints.down('sm')]: {
      height: 200
    },
    [theme.breakpoints.down('xs')]: {
      flex: '0 1 calc(100% - 16px)',
      height: 280
    }
  },
  checkIcon: {
    position: 'absolute',
    top: 3,
    left: 3,
    zIndex: 2,
    '& svg': {
      color: '#FFF'
    }
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
  const { lists, filter, loadedAll, selectedDelete } = useSelector(state => state.album)

  React.useEffect(() => {
    if (lists.length > filter.limit) {
      const lastIndex = lists.length - 1
      const name = `photo-container-${lastIndex}`
      scroller.scrollTo(name, {
        duration: 800,
        delay: 100,
        smooth: 'easeInOutQuart'
      })
    }
  }, [lists, filter.limit])

  const loadMore = async (ev) => {
    ev.preventDefault()
    const { skip, limit } = filter
    const newFilter = { skip: skip + limit, limit: limit }
    await dispatch(setAlbumState({ state: 'filter', data: newFilter }))
  }

  const clickToDelete = (value) => {
    if (selectedDelete.includes(value)) {
      const x = [...selectedDelete]
      remove(x, (n) => { return n === value })
      dispatch(setAlbumState({ state: 'selectedDelete', data: x }))
    } else {
      const x = [...selectedDelete]
      x.push(value)
      dispatch(setAlbumState({ state: 'selectedDelete', data: x }))
    }
  }

  const renderPhoto = (index, photo) => {
    const name = `photo-container-${index}`
    return (
      <Box
        key={index} name={name} className={classes.photo} onClick={ev => clickToDelete(index)}
      >
        {selectedDelete.includes(index) && (
          <Box className={classes.checkIcon}>
            <CheckBoxIcon />
          </Box>
        )}
        <Photo name={photo.name} sub={photo.album} url={photo.raw} overlay={selectedDelete.length > 0 && !selectedDelete.includes(index)} />
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {lists.map((li, index) => renderPhoto(index, li))}
      </Box>
      {(lists.length !== 0 && !loadedAll) && (
        <Box className={classes.buttonContainer}>
          <LoadMoreButton action={loadMore} />
        </Box>
      )}
    </Box>
  )
}

export default PhotoList
