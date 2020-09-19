import React from 'react'
import Container from '@material-ui/core/Container'

// components
import Appbar from '../../components/organisms/Appbar'
import UploadModal from '../../components/organisms/UploadModal'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { photoListAPI } from '../../store/reducers/_Album'

const Home = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.album)
  React.useEffect(() => {
    dispatch(photoListAPI(filter))
  }, [])

  return (
    <Container>
      <Appbar />

      <UploadModal />
    </Container>
  )
}

export default Home
