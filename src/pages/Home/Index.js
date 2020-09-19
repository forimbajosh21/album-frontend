import React from 'react'
import Container from '@material-ui/core/Container'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { photoListAPI } from '../../store/reducers/_Album'

// components
import Appbar from '../../components/organisms/Appbar'
import UploadModal from '../../components/organisms/UploadModal'
import PhotoList from '../../components/organisms/PhotoList'

const Home = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.album)

  React.useEffect(() => {
    dispatch(photoListAPI(filter))
  }, [dispatch, filter])

  return (
    <Container>
      <Appbar />
      <Container>
        <PhotoList />
      </Container>
      <UploadModal />
    </Container>
  )
}

export default Home
